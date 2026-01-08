import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../utils/database.js';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { ServiceRequest } from '../models/service-request.model.js';
import { InternshipApplication } from '../models/InternshipApplication.js';
import { Contact } from '../models/Contact.js';

dotenv.config();

async function seedDatabase() {
  console.log('Starting database seed...');

  // Connect to database
  await connectDB();

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

  try {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@olatus.com' });

    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
    } else {
      const adminUser = await User.create({
        email: process.env.ADMIN_EMAIL || 'admin@olatus.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin'
      });
      console.log('Admin user created:', adminUser.email);
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }

  // Seed sample projects
  const projects = [
    {
      title: 'IoT Smart Home System',
      description: 'Complete smart home automation system with mobile app integration',
      category: 'Embedded Software',
      status: 'completed',
      technologies: ['C++', 'Arduino', 'React Native', 'MQTT'],
      client: 'TechHome Inc.',
      duration: '6 months',
      images: []
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment gateway integration',
      category: 'Web Development',
      status: 'completed',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      client: 'ShopEasy',
      duration: '4 months',
      images: []
    },
    {
      title: 'PCB Design for Drone Controller',
      description: 'Custom PCB design for advanced drone flight controller',
      category: 'PCB Manufacturing',
      status: 'in-progress',
      technologies: ['Altium', 'KiCAD', 'ARM Cortex'],
      client: 'DroneWorks',
      duration: '3 months',
      images: []
    }
  ];

  for (const project of projects) {
    try {
      const existingProject = await Project.findOne({ title: project.title });

      if (existingProject) {
        console.log(`Project already exists: ${project.title}`);
      } else {
        await Project.create(project);
        console.log(`Project created: ${project.title}`);
      }
    } catch (error) {
      console.error(`Error creating project ${project.title}:`, error);
    }
  }

  // Seed sample service requests
  const serviceRequests = [
    {
      serviceType: 'PCB_FABRICATION',
      status: 'in_progress',
      customerName: 'Rajesh Kumar',
      email: 'rajesh.kumar@techstartup.com',
      phone: '+91 98765 43210',
      company: 'TechStartup India',
      projectName: '4-Layer PCB for IoT Gateway',
      description: 'Need 4-layer PCB fabrication for IoT gateway device. Specs: FR4 material, HASL finish, 1.6mm thickness.',
      specifications: {
        layers: 4,
        material: 'FR4',
        thickness: '1.6mm',
        finish: 'HASL',
        quantity: 50,
        dimensions: '100mm x 80mm'
      },
      quotedPrice: 8500,
      paymentStatus: 'paid',
      priority: 'high',
      files: [],
      orderNotes: [
        { note: 'Initial quote sent', addedBy: 'admin', addedAt: new Date() }
      ]
    },
    {
      serviceType: '3D_PRINTING',
      status: 'pending',
      customerName: 'Priya Sharma',
      email: 'priya.s@example.com',
      phone: '+91 87654 32109',
      projectName: 'Robot Chassis Prototype',
      description: 'Need 3D printed robot chassis for college project. Material: PLA, Color: Black',
      specifications: {
        material: 'PLA',
        color: 'Black',
        quantity: 2,
        infill: '20%',
        layerHeight: '0.2mm'
      },
      estimatedCost: 1200,
      paymentStatus: 'unpaid',
      priority: 'medium',
      files: [],
      orderNotes: []
    },
    {
      serviceType: 'WEB_DEVELOPMENT',
      status: 'quote_sent',
      customerName: 'Amit Patel',
      email: 'amit@businessco.in',
      phone: '+91 76543 21098',
      company: 'BusinessCo',
      projectName: 'E-commerce Website',
      description: 'Need a complete e-commerce website with payment gateway, admin panel, and mobile responsive design.',
      specifications: {
        pages: ['Home', 'Products', 'Cart', 'Checkout', 'Admin Dashboard'],
        features: ['Payment Gateway', 'Inventory Management', 'User Authentication', 'Order Tracking'],
        timeline: '2 months'
      },
      quotedPrice: 85000,
      paymentStatus: 'unpaid',
      priority: 'medium',
      files: [],
      orderNotes: [
        { note: 'Initial consultation completed', addedBy: 'admin', addedAt: new Date() },
        { note: 'Quote sent to client', addedBy: 'admin', addedAt: new Date() }
      ]
    }
  ];

  for (const request of serviceRequests) {
    try {
      const existing = await ServiceRequest.findOne({
        email: request.email,
        projectName: request.projectName
      });

      if (existing) {
        console.log(`Service request already exists: ${request.projectName}`);
      } else {
        await ServiceRequest.create(request);
        console.log(`Service request created: ${request.projectName}`);
      }
    } catch (error) {
      console.error(`Error creating service request:`, error);
    }
  }

  // Seed sample internship applications
  const internshipApplications = [
    {
      firstName: 'Ankit',
      lastName: 'Verma',
      email: 'ankit.verma@student.edu',
      phone: '+91 98765 12345',
      currentLocation: 'Bangalore, Karnataka',
      institution: 'IIT Delhi',
      degree: 'B.Tech',
      fieldOfStudy: 'Computer Science',
      graduationYear: 2025,
      currentYear: '3rd Year',
      cgpa: 8.5,
      position: 'WEB_DEVELOPMENT',
      preferredStartDate: new Date('2025-06-01'),
      duration: '3 months',
      internshipType: 'onsite',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript'],
      programmingLanguages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
      tools: ['Git', 'VS Code', 'Docker', 'Postman'],
      resume: {
        fileName: 'ankit_verma_resume.pdf',
        fileUrl: '/uploads/resumes/ankit_verma_resume.pdf',
        uploadedAt: new Date()
      },
      portfolio: {
        fileUrl: 'https://github.com/ankitverma',
        type: 'link',
        uploadedAt: new Date()
      },
      projects: [
        {
          projectName: 'E-Learning Platform',
          description: 'Built a full-stack e-learning platform with video streaming',
          technologies: ['React', 'Node.js', 'PostgreSQL'],
          githubUrl: 'https://github.com/ankitverma/elearning'
        }
      ],
      status: 'shortlisted',
      appliedAt: new Date(),
      githubUrl: 'https://github.com/ankitverma',
      linkedinUrl: 'https://linkedin.com/in/ankitverma',
      notes: [
        { note: 'Strong portfolio, good GitHub activity', addedBy: 'admin', addedAt: new Date() }
      ]
    },
    {
      firstName: 'Sneha',
      lastName: 'Reddy',
      email: 'sneha.reddy@college.edu',
      phone: '+91 87654 32109',
      currentLocation: 'Hyderabad, Telangana',
      institution: 'NIT Warangal',
      degree: 'B.Tech',
      fieldOfStudy: 'Electronics and Communication',
      graduationYear: 2026,
      currentYear: '2nd Year',
      cgpa: 9.0,
      position: 'EMBEDDED_SYSTEMS',
      preferredStartDate: new Date('2025-05-15'),
      duration: '6 months',
      internshipType: 'hybrid',
      skills: ['C', 'C++', 'Arduino', 'Raspberry Pi', 'Python'],
      programmingLanguages: ['C', 'C++', 'Python', 'Assembly'],
      tools: ['Arduino IDE', 'Keil', 'Proteus', 'Git'],
      resume: {
        fileName: 'sneha_reddy_resume.pdf',
        fileUrl: '/uploads/resumes/sneha_reddy_resume.pdf',
        uploadedAt: new Date()
      },
      projects: [
        {
          projectName: 'Smart Agriculture System',
          description: 'IoT-based system for monitoring soil moisture and temperature',
          technologies: ['Arduino', 'ESP8266', 'MQTT', 'Firebase'],
          githubUrl: 'https://github.com/snehareddy/smart-agri'
        }
      ],
      status: 'interview_scheduled',
      appliedAt: new Date(),
      interviewDate: new Date('2025-01-15'),
      githubUrl: 'https://github.com/snehareddy',
      linkedinUrl: 'https://linkedin.com/in/snehareddy',
      notes: [
        { note: 'Excellent academic record, relevant project experience', addedBy: 'admin', addedAt: new Date() }
      ]
    }
  ];

  for (const application of internshipApplications) {
    try {
      const existing = await InternshipApplication.findOne({ email: application.email });

      if (existing) {
        console.log(`Internship application already exists: ${application.email}`);
      } else {
        await InternshipApplication.create(application);
        console.log(`Internship application created: ${application.firstName} ${application.lastName}`);
      }
    } catch (error) {
      console.error(`Error creating internship application:`, error);
    }
  }

  // Seed sample contacts
  const contacts = [
    {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      company: 'InnovateTech',
      subject: 'Partnership Inquiry',
      message: 'We are interested in partnering with Olatus for our new IoT project. Please let us know if you are available for a call.',
      status: 'new'
    },
    {
      name: 'Anita Desai',
      email: 'anita.d@designstudio.com',
      phone: '+91 98765 67890',
      subject: 'General Inquiry',
      message: 'Do you provide consultation for small scale manufacturing setups?',
      status: 'in-progress'
    },
    {
      name: 'John Smith',
      email: 'john.smith@globalcorp.com',
      company: 'GlobalCorp',
      subject: 'Product Demo Request',
      message: 'We would like to see a demo of your smart home system.',
      status: 'resolved'
    }
  ];

  for (const contact of contacts) {
    try {
      const existing = await Contact.findOne({ email: contact.email, subject: contact.subject });

      if (existing) {
        console.log(`Contact inquiry already exists: ${contact.subject}`);
      } else {
        await Contact.create(contact);
        console.log(`Contact inquiry created: ${contact.subject}`);
      }
    } catch (error) {
      console.error(`Error creating contact inquiry:`, error);
    }
  }

  console.log('Database seed completed!');
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
