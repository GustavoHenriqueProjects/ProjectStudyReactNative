export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface MeResponseAddress {
  address?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  country?: string;
}

export interface MeResponseCompany {
  name?: string;
  department?: string;
  title?: string;
}

export interface MeResponseHair {
  color?: string;
  type?: string;
}

export interface MeResponse {
  id?: number;
  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email?: string;
  birthDate?: string;
  image?: string;
  role?: string;
  username?: string;
  phone?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  university?: string;
  address?: MeResponseAddress;
  company?: MeResponseCompany;
  hair?: MeResponseHair;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  tags: string[];
  brand: string;
  images: string[];
  thumbnail: string;
}
