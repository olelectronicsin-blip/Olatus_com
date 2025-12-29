import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  eventType: string;
  page?: string;
  visitorId?: string;
  userAgent?: string;
  referrer?: string;
  ipAddress?: string;
  eventData?: any;
  createdAt: Date;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    eventType: {
      type: String,
      required: true,
      index: true,
    },
    page: {
      type: String,
    },
    visitorId: {
      type: String,
      index: true,
    },
    userAgent: {
      type: String,
    },
    referrer: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    eventData: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for analytics queries
analyticsSchema.index({ createdAt: -1 });
analyticsSchema.index({ eventType: 1, createdAt: -1 });

export const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);
