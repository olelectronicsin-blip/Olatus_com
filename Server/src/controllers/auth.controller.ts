import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: 'user'
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Get user
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      data: {
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new AppError('Token is required', 400);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({ success: true, data: { token: newToken } });
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
};

export const logout = async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' });
};
