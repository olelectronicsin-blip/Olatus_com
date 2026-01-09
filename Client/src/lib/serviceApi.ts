import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for service requests
export enum ServiceType {
  PCB_FABRICATION = 'PCB_FABRICATION',
  PCB_ASSEMBLY = 'PCB_ASSEMBLY',
  PCB_DESIGN = 'PCB_DESIGN',
  THREE_D_PRINTING = 'THREE_D_PRINTING',
  WEB_DEVELOPMENT = 'WEB_DEVELOPMENT',
  EMBEDDED_SOFTWARE = 'EMBEDDED_SOFTWARE',
  LAB_SETUP = 'LAB_SETUP',
  PRODUCT_DEVELOPMENT = 'PRODUCT_DEVELOPMENT',
}

export interface ServiceRequestData {
  customerName: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  description?: string;
  specifications?: Record<string, unknown>;
  files?: File[];
}

export interface InternshipApplicationData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  education: string;
  skills: string[];
  experience?: string;
  resume?: File;
  coverLetter?: string;
  portfolio?: string;
  linkedIn?: string;
  github?: string;
  availableFrom?: Date;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  subject?: string;
}

// Contact Form Submission
export const submitContactForm = async (data: ContactData) => {
  try {
    // Transform data to match backend schema
    const transformedData = {
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      subject: data.service || data.subject || 'General Inquiry',
      message: data.message
    };

    const response = await apiClient.post('/contact', transformedData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to submit contact form';
      throw new Error(errorMsg);
    }
    throw error;
  }
};

// Service Request Submission
export const submitServiceRequest = async (data: ServiceRequestData) => {
  try {
    // If files are included, use FormData
    if (data.files && data.files.length > 0) {
      const formData = new FormData();
      formData.append('customerName', data.customerName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('serviceType', data.serviceType);

      if (data.description) {
        formData.append('description', data.description);
      }

      if (data.specifications) {
        formData.append('specifications', JSON.stringify(data.specifications));
      }

      // Append all files
      data.files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await axios.post(`${API_BASE_URL}/service-requests`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // No files, use regular JSON request
      const response = await apiClient.post('/service-requests', {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        description: data.description,
        specifications: data.specifications,
      });
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to submit service request');
    }
    throw error;
  }
};

// Internship Application Submission
export const submitInternshipApplication = async (data: InternshipApplicationData) => {
  try {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position', data.position);
    formData.append('education', data.education);
    formData.append('skills', JSON.stringify(data.skills));

    if (data.experience) {
      formData.append('experience', data.experience);
    }

    if (data.resume) {
      formData.append('resume', data.resume);
    }

    if (data.coverLetter) {
      formData.append('coverLetter', data.coverLetter);
    }

    if (data.portfolio) {
      formData.append('portfolio', data.portfolio);
    }

    if (data.linkedIn) {
      formData.append('linkedIn', data.linkedIn);
    }

    if (data.github) {
      formData.append('github', data.github);
    }

    if (data.availableFrom) {
      formData.append('availableFrom', data.availableFrom.toISOString());
    }

    const response = await axios.post(`${API_BASE_URL}/internship-applications`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to submit internship application');
    }
    throw error;
  }
};

// Get Service Requests by Email
export const getServiceRequestsByEmail = async (email: string) => {
  try {
    const response = await apiClient.get(`/service-requests/email/${email}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch service requests');
    }
    throw error;
  }
};

export default {
  submitContactForm,
  submitServiceRequest,
  submitInternshipApplication,
  getServiceRequestsByEmail,
};
