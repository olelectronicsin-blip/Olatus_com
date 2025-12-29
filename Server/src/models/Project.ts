import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  technologies?: string[];
  client?: string;
  duration?: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    technologies: [
      {
        type: String,
      },
    ],
    client: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'upcoming'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ createdAt: -1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);
