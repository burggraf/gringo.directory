import { 
    Email,
    Phone,
    Url,
    Address,
    Relation,
    SocialProfile,
    InstantMessage,
    Metadata,
    Permissions } from './Models';      
      
export interface Person {
    id: string;
    uid?: string;
    firstname?: string;
    middlename?: string;
    lastname?: string;
    nickname?: string;
    company?: string;
    photourl?: string;
    dob?: string;
    anniversary?: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
    created_by?: string;
    metadata?: object;
    xtra?: object;
    email?: Email[];
    phone?: Phone[];
    url?: Url[];
    address?: Address[];
    relation?: Relation[];
    socialProfile?: SocialProfile[];
    instantMessage?: InstantMessage[];
  }
