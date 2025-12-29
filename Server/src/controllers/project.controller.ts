import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  category: z.string(),
  imageUrl: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
  client: z.string().optional(),
  duration: z.string().optional(),
  status: z.enum(['completed', 'in-progress', 'upcoming']).optional()
});

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, status, limit = '50' } = req.query;

    let query: any = {};

    if (category) query.category = category;
    if (status) query.status = status;

    const projects = await Project.find(query)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) throw new AppError('Project not found', 404);

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectData = projectSchema.parse(req.body);

    const project = await Project.create(projectData);

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const projectData = projectSchema.partial().parse(req.body);

    const project = await Project.findByIdAndUpdate(
      id,
      projectData,
      { new: true, runValidators: true }
    );

    if (!project) throw new AppError('Project not found', 404);

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) throw new AppError('Project not found', 404);

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
