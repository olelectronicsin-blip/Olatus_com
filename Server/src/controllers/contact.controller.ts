import { Request, Response, NextFunction } from 'express';
import { Contact } from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';
import { sendEmail } from '../utils/email.js';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10)
});

export const submitContactForm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contactData = contactSchema.parse(req.body);

    // Save to database
    const contact = await Contact.create({ ...contactData, status: 'new' });

    // Send email notification
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL!,
        subject: `New Contact Form: ${contactData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${contactData.company || 'N/A'}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message}</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, limit = 100 } = req.query;

    let query = Contact.find();

    if (status) query = query.where('status').equals(status);

    const contacts = await query.limit(Number(limit)).sort({ createdAt: -1 });

    res.json({ success: true, data: contacts });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) throw new AppError('Contact not found', 404);

    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) throw new AppError('Contact not found', 404);

    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) throw new AppError('Contact not found', 404);

    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};
