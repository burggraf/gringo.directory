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
create table if not exists public.persons (
        id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        firstname     TEXT,
        middlename    TEXT,
        lastname      TEXT,
        nickname      TEXT,
        company       TEXT,
        photourl      TEXT NULL,
        dob           DATE NULL,
        anniversary   DATE NULL,  
        notes         TEXT NULL,
        created_at    TIMESTAMP DEFAULT NOW(),
        updated_at    TIMESTAMP DEFAULT NOW(),
        created_by    UUID REFERENCES auth.users,
        metadata      JSONB NULL,
        xtra          JSONB NULL
      );
      
      
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
