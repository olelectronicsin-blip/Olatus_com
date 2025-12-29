import mongoose, { Document, Schema } from 'mongoose';

// Service Request Types
export type ServiceType = 
  | 'PCB_FABRICATION' 
  | 'PCB_ASSEMBLY' 
  | 'PCB_DESIGN'
  | '3D_PRINTING'
  | 'WEB_DEVELOPMENT'
  | 'EMBEDDED_SOFTWARE'
  | 'LAB_SETUP'
  | 'PRODUCT_DEVELOPMENT';

export type OrderStatus = 
  | 'pending'           // Initial submission
  | 'under_review'      // Team reviewing the request
  | 'quote_sent'        // Quote/estimate sent to customer
  | 'payment_pending'   // Waiting for payment
  | 'in_progress'       // Work in progress
  | 'quality_check'     // QC phase
  | 'completed'         // Order completed
  | 'delivered'         // Delivered to customer
  | 'cancelled';        // Cancelled

// Base interface for all service requests
export interface IServiceRequest extends Document {
  userId?: mongoose.Types.ObjectId;
  serviceType: ServiceType;
  status: OrderStatus;
  
  // Customer Information
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  
  // Order Details
  projectName?: string;
  description: string;
  specifications: any; // Flexible object for service-specific details
  
  // File Management
  files: {
    fileName: string;
    fileUrl: string;
    fileType: string;
    uploadedAt: Date;
  }[];
  
  // Pricing & Timeline
  estimatedCost?: number;
  quotedPrice?: number;
  finalPrice?: number;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  
  // Order Tracking
  orderNotes: {
    note: string;
    addedBy: string; // 'customer' | 'admin'
    addedAt: Date;
  }[];
  
  // Payment
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
  
  // Metadata
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string; // Admin/team member assigned
  
  createdAt: Date;
  updatedAt: Date;
}

const serviceRequestSchema = new Schema<IServiceRequest>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    serviceType: {
      type: String,
      enum: [
        'PCB_FABRICATION',
        'PCB_ASSEMBLY',
        'PCB_DESIGN',
        '3D_PRINTING',
        'WEB_DEVELOPMENT',
        'EMBEDDED_SOFTWARE',
        'LAB_SETUP',
        'PRODUCT_DEVELOPMENT'
      ],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'under_review',
        'quote_sent',
        'payment_pending',
        'in_progress',
        'quality_check',
        'completed',
        'delivered',
        'cancelled'
      ],
      default: 'pending',
      index: true,
    },
    
    // Customer Information
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    
    // Order Details
    projectName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: Schema.Types.Mixed,
      default: {},
    },
    
    // File Management
    files: [{
      fileName: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    
    // Pricing & Timeline
    estimatedCost: {
      type: Number,
    },
    quotedPrice: {
      type: Number,
    },
    finalPrice: {
      type: Number,
    },
    estimatedDeliveryDate: {
      type: Date,
    },
    actualDeliveryDate: {
      type: Date,
    },
    
    // Order Tracking
    orderNotes: [{
      note: {
        type: String,
        required: true,
      },
      addedBy: {
        type: String,
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    
    // Payment
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'partial', 'paid', 'refunded'],
      default: 'unpaid',
    },
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    
    // Metadata
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    assignedTo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
serviceRequestSchema.index({ serviceType: 1, status: 1 });
serviceRequestSchema.index({ email: 1, createdAt: -1 });
serviceRequestSchema.index({ status: 1, priority: -1 });
serviceRequestSchema.index({ createdAt: -1 });
serviceRequestSchema.index({ paymentStatus: 1 });

// Virtual for order age in days
serviceRequestSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
});

export const ServiceRequest = mongoose.model<IServiceRequest>('ServiceRequest', serviceRequestSchema);
