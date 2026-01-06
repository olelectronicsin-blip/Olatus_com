import mongoose, { Document, Schema } from 'mongoose';

export type InternshipPosition =
  | 'WEB_DEVELOPMENT'
  | 'EMBEDDED_SYSTEMS'
  | 'PCB_DESIGN'
  | 'PRODUCT_DESIGN'
  | '3D_DESIGN'
  | 'IOT_DEVELOPMENT'
  | 'ROBOTICS'
  | 'FULL_STACK'
  | 'FRONTEND'
  | 'BACKEND'
  | 'MECHANICAL_DESIGN'
  | 'ELECTRONICS'
  | 'AI_ML'
  | 'TRAINING_INQUIRY';

export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'interviewed'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export interface IInternshipApplication extends Document {
  // Applicant Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation: string;

  // Educational Details
  institution: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: number;
  currentYear?: string; // e.g., "2nd Year", "3rd Year"
  cgpa?: number;

  // Application Details
  position: InternshipPosition;
  preferredStartDate?: Date;
  duration?: string; // e.g., "3 months", "6 months"
  internshipType: 'remote' | 'onsite' | 'hybrid';

  // Skills & Experience
  skills: string[];
  programmingLanguages?: string[];
  tools?: string[];
  previousExperience?: string;

  // Documents
  resume: {
    fileName: string;
    fileUrl: string;
    uploadedAt: Date;
  };
  portfolio?: {
    fileName?: string;
    fileUrl: string;
    type: 'link' | 'file'; // GitHub, portfolio website, or uploaded file
    uploadedAt: Date;
  };
  coverLetter?: string;

  // Projects
  projects: {
    projectName: string;
    description: string;
    technologies: string[];
    projectUrl?: string;
    githubUrl?: string;
  }[];

  // Application Status
  status: ApplicationStatus;
  appliedAt: Date;

  // Interview & Evaluation
  interviewDate?: Date;
  interviewNotes?: string;
  technicalScore?: number;
  communicationScore?: number;
  overallRating?: number;

  // Admin Notes
  notes: {
    note: string;
    addedBy: string;
    addedAt: Date;
  }[];

  // Assignment/Task (if any)
  assignmentGiven?: {
    title: string;
    description: string;
    assignedAt: Date;
    dueDate?: Date;
    submittedAt?: Date;
    submissionUrl?: string;
    score?: number;
    feedback?: string;
  };

  // References
  references?: {
    name: string;
    designation: string;
    email: string;
    phone?: string;
    relationship: string;
  }[];

  // Social Links
  linkedinUrl?: string;
  githubUrl?: string;
  personalWebsite?: string;

  // Additional Information
  whyJoinUs?: string;
  availability?: string;
  expectedStipend?: string;

  createdAt: Date;
  updatedAt: Date;
}

const internshipApplicationSchema = new Schema<IInternshipApplication>(
  {
    // Applicant Information
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
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
      required: true,
      trim: true,
    },
    currentLocation: {
      type: String,
      required: true,
      trim: true,
    },

    // Educational Details
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    graduationYear: {
      type: Number,
      required: true,
    },
    currentYear: {
      type: String,
      trim: true,
    },
    cgpa: {
      type: Number,
      min: 0,
      max: 10,
    },

    // Application Details
    position: {
      type: String,
      enum: [
        'WEB_DEVELOPMENT',
        'EMBEDDED_SYSTEMS',
        'PCB_DESIGN',
        'PRODUCT_DESIGN',
        '3D_DESIGN',
        'IOT_DEVELOPMENT',
        'ROBOTICS',
        'FULL_STACK',
        'FRONTEND',
        'BACKEND',
        'MECHANICAL_DESIGN',
        'ELECTRONICS',
        'AI_ML',
        'TRAINING_INQUIRY'
      ],
      required: true,
      index: true,
    },
    preferredStartDate: {
      type: Date,
    },
    duration: {
      type: String,
      trim: true,
    },
    internshipType: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      default: 'onsite',
    },

    // Skills & Experience
    skills: [{
      type: String,
      trim: true,
    }],
    programmingLanguages: [{
      type: String,
      trim: true,
    }],
    tools: [{
      type: String,
      trim: true,
    }],
    previousExperience: {
      type: String,
    },

    // Documents
    resume: {
      fileName: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
    portfolio: {
      fileName: String,
      fileUrl: String,
      type: {
        type: String,
        enum: ['link', 'file'],
      },
      uploadedAt: Date,
    },
    coverLetter: {
      type: String,
    },

    // Projects
    projects: [{
      projectName: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      technologies: [{
        type: String,
        trim: true,
      }],
      projectUrl: String,
      githubUrl: String,
    }],

    // Application Status
    status: {
      type: String,
      enum: [
        'applied',
        'screening',
        'shortlisted',
        'interview_scheduled',
        'interviewed',
        'accepted',
        'rejected',
        'withdrawn'
      ],
      default: 'applied',
      index: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },

    // Interview & Evaluation
    interviewDate: Date,
    interviewNotes: String,
    technicalScore: {
      type: Number,
      min: 0,
      max: 10,
    },
    communicationScore: {
      type: Number,
      min: 0,
      max: 10,
    },
    overallRating: {
      type: Number,
      min: 0,
      max: 10,
    },

    // Admin Notes
    notes: [{
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

    // Assignment/Task
    assignmentGiven: {
      title: String,
      description: String,
      assignedAt: Date,
      dueDate: Date,
      submittedAt: Date,
      submissionUrl: String,
      score: {
        type: Number,
        min: 0,
        max: 100,
      },
      feedback: String,
    },

    // References
    references: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      designation: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },
      phone: String,
      relationship: {
        type: String,
        required: true,
        trim: true,
      },
    }],

    // Social Links
    linkedinUrl: String,
    githubUrl: String,
    personalWebsite: String,

    // Additional Information
    whyJoinUs: String,
    availability: String,
    expectedStipend: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
internshipApplicationSchema.index({ position: 1, status: 1 });
internshipApplicationSchema.index({ email: 1, appliedAt: -1 });
internshipApplicationSchema.index({ status: 1, appliedAt: -1 });
internshipApplicationSchema.index({ graduationYear: 1 });
internshipApplicationSchema.index({ createdAt: -1 });

// Virtual for full name
internshipApplicationSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for application age in days
internshipApplicationSchema.virtual('applicationAge').get(function () {
  return Math.floor((Date.now() - this.appliedAt.getTime()) / (1000 * 60 * 60 * 24));
});

export const InternshipApplication = mongoose.model<IInternshipApplication>(
  'InternshipApplication',
  internshipApplicationSchema
);
