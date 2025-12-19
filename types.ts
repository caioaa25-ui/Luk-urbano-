
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type UserRole = 'client' | 'partner' | 'admin';

export type ViewState = 
  | 'home' 
  | 'catalog' 
  | 'login' 
  | 'register' 
  | 'client-dashboard' 
  | 'partner-dashboard' 
  | 'admin-dashboard' 
  | 'checkout' 
  | 'success';

export interface BankDetails {
  pixKey: string;
  bankName: string;
  accountType: 'corrente' | 'poupanca';
  document: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  type: UserRole;
  balance?: number;
  pendingBalance?: number;
  commissionRate?: number;
  bankDetails?: BankDetails;
}

export interface PayoutRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  pixKey: string;
}
