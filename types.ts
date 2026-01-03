
export enum PricingMode {
  RETAIL = 'RETAIL',
  WHOLESALE = 'WHOLESALE'
}

export enum OrderStatus {
  RECEIVED = 'Recebido',
  PROCESSING = 'Processando',
  SHIPPED = 'Enviado',
  DELIVERED = 'Entregue',
  CANCELLED = 'Cancelado'
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface CompanySettings {
  name: string;
  cnpj: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  retailPrice: number;
  wholesalePrice: number;
  stock: number;
  unit: string;
  salesCount?: number; // Para analíticos
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  cnpj?: string;
  role: UserRole;
  lastPurchaseDate?: string;
  totalSpent?: number;
}

export interface Order {
  id: string;
  userId: string;
  userName?: string;
  businessName?: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  pricingMode: PricingMode;
}
