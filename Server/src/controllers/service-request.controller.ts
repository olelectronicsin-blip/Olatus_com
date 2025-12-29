import { Request, Response } from 'express';
import { ServiceRequest } from '../models/service-request.model.js';
import { InternshipApplication } from '../models/InternshipApplication.js';
import { logger } from '../utils/logger.js';

// Create Service Request
export const createServiceRequest = async (req: Request, res: Response) => {
  try {
    // Parse specifications if it's a string (from FormData)
    let specifications = req.body.specifications;
    if (typeof specifications === 'string') {
      try {
        specifications = JSON.parse(specifications);
      } catch (e) {
        specifications = {};
      }
    }

    // Get uploaded files
    const files = req.files as Express.Multer.File[];
    const filePaths = files ? files.map(file => ({
      fileUrl: `/uploads/${file.filename}`,
      uploadedAt: new Date()
    })) : [];

    const serviceRequestData = {
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      serviceType: req.body.serviceType,
      description: req.body.description || '',
      specifications: specifications || {},
      files: filePaths
    };

    const serviceRequest = new ServiceRequest(serviceRequestData);
    await serviceRequest.save();
    
    logger.info(`New service request created: ${serviceRequest._id} - ${serviceRequest.serviceType}`);
    
    res.status(201).json({
      success: true,
      message: 'Service request submitted successfully',
      data: serviceRequest,
    });
  } catch (error: any) {
    logger.error('Error creating service request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit service request',
      error: error.message,
    });
  }
};

// Get all service requests (Admin)
export const getAllServiceRequests = async (req: Request, res: Response) => {
  try {
    const { 
      serviceType, 
      status, 
      paymentStatus, 
      priority,
      page = 1, 
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    const filter: any = {};
    if (serviceType) filter.serviceType = serviceType;
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (priority) filter.priority = priority;
    
    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };
    
    const [requests, total] = await Promise.all([
      ServiceRequest.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate('userId', 'name email'),
      ServiceRequest.countDocuments(filter),
    ]);
    
    res.json({
      success: true,
      data: requests,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    logger.error('Error fetching service requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service requests',
      error: error.message,
    });
  }
};

// Get service request by ID
export const getServiceRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await ServiceRequest.findById(id).populate('userId', 'name email');
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found',
      });
    }
    
    res.json({
      success: true,
      data: request,
    });
  } catch (error: any) {
    logger.error('Error fetching service request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service request',
      error: error.message,
    });
  }
};

// Get service requests by email
export const getServiceRequestsByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const requests = await ServiceRequest.find({ email })
      .sort({ createdAt: -1 })
      .select('-orderNotes');
    
    res.json({
      success: true,
      data: requests,
      count: requests.length,
    });
  } catch (error: any) {
    logger.error('Error fetching service requests by email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service requests',
      error: error.message,
    });
  }
};

// Update service request status
export const updateServiceRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, note, addedBy } = req.body;
    
    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found',
      });
    }
    
    request.status = status;
    
    if (note) {
      request.orderNotes.push({
        note,
        addedBy: addedBy || 'admin',
        addedAt: new Date(),
      });
    }
    
    await request.save();
    
    logger.info(`Service request ${id} status updated to ${status}`);
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: request,
    });
  } catch (error: any) {
    logger.error('Error updating service request status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message,
    });
  }
};

// Update service request pricing
export const updateServiceRequestPricing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estimatedCost, quotedPrice, finalPrice } = req.body;
    
    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found',
      });
    }
    
    if (estimatedCost !== undefined) request.estimatedCost = estimatedCost;
    if (quotedPrice !== undefined) request.quotedPrice = quotedPrice;
    if (finalPrice !== undefined) request.finalPrice = finalPrice;
    
    await request.save();
    
    res.json({
      success: true,
      message: 'Pricing updated successfully',
      data: request,
    });
  } catch (error: any) {
    logger.error('Error updating service request pricing:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update pricing',
      error: error.message,
    });
  }
};

// Add note to service request
export const addServiceRequestNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { note, addedBy } = req.body;
    
    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found',
      });
    }
    
    request.orderNotes.push({
      note,
      addedBy: addedBy || 'admin',
      addedAt: new Date(),
    });
    
    await request.save();
    
    res.json({
      success: true,
      message: 'Note added successfully',
      data: request,
    });
  } catch (error: any) {
    logger.error('Error adding note to service request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: error.message,
    });
  }
};

// Delete service request
export const deleteServiceRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const request = await ServiceRequest.findByIdAndDelete(id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found',
      });
    }
    
    logger.info(`Service request deleted: ${id}`);
    
    res.json({
      success: true,
      message: 'Service request deleted successfully',
    });
  } catch (error: any) {
    logger.error('Error deleting service request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service request',
      error: error.message,
    });
  }
};

// ========== INTERNSHIP APPLICATION CONTROLLERS ==========

// Create internship application
export const createInternshipApplication = async (req: Request, res: Response) => {
  try {
    // Handle multipart file upload for resume
    const file = (req as any).file as Express.Multer.File | undefined;

    // Accept both detailed and simplified client payloads
    const body = req.body || {};
    const fullName: string | undefined = body.fullName;
    const nameParts = (fullName || '').trim().split(' ');
    const firstName = body.firstName || nameParts[0] || 'Unknown';
    const lastName = body.lastName || nameParts.slice(1).join(' ') || 'Applicant';

    // Normalize scalar fields with sensible defaults
    const email = body.email;
    const phone = body.phone || '';
    const currentLocation = body.currentLocation || body.location || 'Unknown';
    const institution = body.institution || 'Unknown';
    const degree = body.degree || body.education || 'Unknown';
    const fieldOfStudy = body.fieldOfStudy || 'Unknown';
    const graduationYear = Number(body.graduationYear) || new Date().getFullYear();
    const position = body.position || 'WEB_DEVELOPMENT';
    const preferredStartDate = body.availableFrom ? new Date(body.availableFrom) : (body.preferredStartDate ? new Date(body.preferredStartDate) : undefined);
    const duration = body.duration || undefined;
    const internshipType = body.internshipType || 'onsite';

    // Parse array-like fields possibly sent as JSON strings
    const parseArray = (v: any): string[] => {
      if (!v) return [];
      if (Array.isArray(v)) return v;
      try { const arr = JSON.parse(v); return Array.isArray(arr) ? arr : []; } catch { return String(v).split(',').map(s=>s.trim()).filter(Boolean); }
    };
    const skills = parseArray(body.skills);
    const programmingLanguages = parseArray(body.programmingLanguages);
    const tools = parseArray(body.tools);

    // Optional docs
    const resume = file ? {
      fileName: file.originalname,
      fileUrl: `/uploads/${file.filename}`,
      uploadedAt: new Date(),
    } : undefined;

    const portfolioUrl = body.portfolio || undefined;
    const portfolio = portfolioUrl ? {
      fileUrl: portfolioUrl,
      type: 'link',
      uploadedAt: new Date(),
    } : undefined;

    const coverLetter = body.coverLetter || undefined;

    const payload: any = {
      firstName,
      lastName,
      email,
      phone,
      currentLocation,
      institution,
      degree,
      fieldOfStudy,
      graduationYear,
      position,
      preferredStartDate,
      duration,
      internshipType,
      skills,
      programmingLanguages,
      tools,
      coverLetter,
      linkedinUrl: body.linkedIn || body.linkedinUrl || undefined,
      githubUrl: body.github || body.githubUrl || undefined,
      resume,
      portfolio,
    };

    // Ensure required resume fields exist; if missing, create a placeholder link-less object if not strictly required
    if (!resume) {
      // Resume is required in schema; create a minimal placeholder when not provided
      payload.resume = {
        fileName: 'not_provided.txt',
        fileUrl: '/uploads/placeholder.txt',
        uploadedAt: new Date(),
      };
    }

    const application = new InternshipApplication(payload);
    await application.save();
    
    logger.info(`New internship application: ${application._id} - ${application.position}`);
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error: any) {
    logger.error('Error creating internship application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message,
    });
  }
};

// Get all internship applications (Admin)
export const getAllInternshipApplications = async (req: Request, res: Response) => {
  try {
    const { 
      position, 
      status, 
      graduationYear,
      page = 1, 
      limit = 20,
      sortBy = 'appliedAt',
      sortOrder = 'desc'
    } = req.query;
    
    const filter: any = {};
    if (position) filter.position = position;
    if (status) filter.status = status;
    if (graduationYear) filter.graduationYear = Number(graduationYear);
    
    const skip = (Number(page) - 1) * Number(limit);
    const sort: any = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };
    
    const [applications, total] = await Promise.all([
      InternshipApplication.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      InternshipApplication.countDocuments(filter),
    ]);
    
    res.json({
      success: true,
      data: applications,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    logger.error('Error fetching internship applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message,
    });
  }
};

// Get internship application by ID
export const getInternshipApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await InternshipApplication.findById(id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }
    
    res.json({
      success: true,
      data: application,
    });
  } catch (error: any) {
    logger.error('Error fetching internship application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message,
    });
  }
};

// Update internship application status
export const updateInternshipApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, note, addedBy } = req.body;
    
    const application = await InternshipApplication.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }
    
    application.status = status;
    
    if (note) {
      application.notes.push({
        note,
        addedBy: addedBy || 'admin',
        addedAt: new Date(),
      });
    }
    
    await application.save();
    
    logger.info(`Internship application ${id} status updated to ${status}`);
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: application,
    });
  } catch (error: any) {
    logger.error('Error updating internship application status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status',
      error: error.message,
    });
  }
};

// Get internship statistics (Admin Dashboard)
export const getInternshipStatistics = async (req: Request, res: Response) => {
  try {
    const [
      totalApplications,
      byStatus,
      byPosition,
      recentApplications,
    ] = await Promise.all([
      InternshipApplication.countDocuments(),
      InternshipApplication.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      InternshipApplication.aggregate([
        { $group: { _id: '$position', count: { $sum: 1 } } },
      ]),
      InternshipApplication.find()
        .sort({ appliedAt: -1 })
        .limit(10)
        .select('firstName lastName email position status appliedAt'),
    ]);
    
    res.json({
      success: true,
      data: {
        totalApplications,
        byStatus,
        byPosition,
        recentApplications,
      },
    });
  } catch (error: any) {
    logger.error('Error fetching internship statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message,
    });
  }
};
