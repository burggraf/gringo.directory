export interface Phone {
  type: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  xtra?: object;
}
export interface Email {
  type: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  xtra?: object;
}
export interface Url {
  type: string;
  url: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  xtra?: object;
}
export interface Address {
  type: string;
  name?: string; // location name
  address?: string;
  address2?: string;
  city?: string;
  province?: string;
  postalcode?: string;
  country?: string;
  pluscode?: string;
  latitude?: number | null;
  longitude?: number | null;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  xtra?: object;
}
export interface Relation {
  type: string;
  name?: string;
  personid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  xtra?: object;
}
export interface SocialProfile {
  type: string;
  url: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  xtra?: object;
}
export interface InstantMessage {
  type: string;
  handle: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  xtra?: object;
}
export interface Metadata {
  key: string;
  value: string;
}
export interface Permissions {
  admin: string[];
  read: string[];
  create: string[];
  update: string[];
  delete: string[];
}
