import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { Contact } from '../models/Contact.js';
import { ServiceRequest } from '../models/service-request.model.js';
import { InternshipApplication } from '../models/InternshipApplication.js';
import { Analytics } from '../models/Analytics.js';
import { AppError } from '../middleware/errorHandler.js';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get counts from various collections
    const [usersCount, projectsCount, contactsCount, recentContacts] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Contact.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Get analytics for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const analyticsData = await Analytics.find({
      createdAt: { $gte: thirtyDaysAgo }
    });

    const pageViews = analyticsData.filter(d => d.eventType === 'pageview').length;
    const uniqueVisitors = new Set(analyticsData.map(d => d.visitorId)).size;

    res.json({
      success: true,
      data: {
        users: usersCount,
        projects: projectsCount,
        contacts: contactsCount,
        pageViews,
        uniqueVisitors,
        recentContacts
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      throw new AppError('Invalid role', 400);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) throw new AppError('User not found', 404);

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) throw new AppError('User not found', 404);

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getInbox = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const type = (req.query.type as string | undefined)?.toLowerCase();

    const fetchContacts = async () => {
      const docs = await Contact.find().sort({ createdAt: -1 }).limit(limit);
      return docs.map((d) => ({
        id: d._id,
        type: 'contact' as const,
        name: d.name,
        email: d.email,
        subject: d.subject,
        message: d.message,
        status: d.status,
        createdAt: d.createdAt,
      }));
    };

    const fetchServiceRequests = async () => {
      const docs = await ServiceRequest.find().sort({ createdAt: -1 }).limit(limit);
      return docs.map((d) => ({
        id: d._id,
        type: 'service' as const,
        name: d.customerName,
        email: d.email,
        subject: d.projectName || d.serviceType,
        message: d.description,
        status: d.status,
        createdAt: d.createdAt,
      }));
    };

    const fetchInternships = async () => {
      const docs = await InternshipApplication.find().sort({ createdAt: -1 }).limit(limit);
      return docs.map((d) => {
        const isTraining = d.position === 'TRAINING_INQUIRY';
        return {
          id: d._id,
          type: (isTraining ? 'training' : 'internship') as 'internship' | 'training', // Cast to any if needed to avoid TS error in strict setup, but here we just return objects
          name: `${d.firstName} ${d.lastName}`.trim(),
          email: d.email,
          subject: isTraining ? d.degree : d.position, // Use degree (Program Name) for training
          message: d.coverLetter || '',
          status: d.status,
          createdAt: d.createdAt,
        };
      });
    };

    let items: any[] = [];
    if (type === 'contact') {
      items = await fetchContacts();
    } else if (type === 'service') {
      items = await fetchServiceRequests();
    } else if (type === 'internship') {
      items = await fetchInternships();
    } else {
      const [contacts, services, internships] = await Promise.all([
        fetchContacts(),
        fetchServiceRequests(),
        fetchInternships(),
      ]);
      items = [...contacts, ...services, ...internships]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
    }

    const [contactsCount, servicesCount, internshipsCount] = await Promise.all([
      Contact.countDocuments(),
      ServiceRequest.countDocuments(),
      InternshipApplication.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        items,
        counts: {
          contacts: contactsCount,
          serviceRequests: servicesCount,
          internships: internshipsCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
