export interface Customer {
  id: string;
  name: string;
  type: 'hospital' | 'distributor' | 'doctor';
  contactPerson?: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: 'cardiovascular' | 'orthopedic' | 'diagnostic' | 'endo-surgery';
  description: string;
  sku: string;
  certifications: Certification[];
  price: number;
  stock: number;
  status: 'active' | 'discontinued' | 'recall';
}

export interface Certification {
  id: string;
  type: 'FDA' | 'CE' | 'ISO';
  number: string;
  issueDate: Date;
  expiryDate: Date;
  status: 'active' | 'expired' | 'pending';
}

export interface SalesOpportunity {
  id: string;
  customerId: string;
  productIds: string[];
  stage: 'lead' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  expectedCloseDate: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QualityReport {
  id: string;
  productId: string;
  type: 'NCR' | 'CAPA' | 'complaint';
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  reportedBy: string;
  reportedDate: Date;
  resolutionDate?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales' | 'regulatory' | 'support';
  department: string;
  status: 'active' | 'inactive';
}
