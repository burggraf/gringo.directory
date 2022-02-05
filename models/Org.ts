import { Address, Email, InstantMessage, Phone, SocialProfile, Url } from './Models';

export interface Org {
    id: string;
    name: string;
    photourl?: string;
    logourl?: string;
    notes?: string;
    email?: Email[];
    phone?: Phone[];
    url?: Url[];
    address?: Address[];
    socialprofile?: SocialProfile[];
    instantmessage?: InstantMessage[];
    created_at?: string;
    updated_at?: string;
    created_by?: string;
    metadata?: object;
    xtra?: object;
}

// export interface OrgPermissionBlock {
//     orgid: string;
//     permissions: PermissionsBlock[];
// }
// export interface PermissionsBlock {
//     uid: string;
//     permissions: Permissions;
// }
// export interface Permissions {
//     uid?: string;
//     displayName?: string;
//     email?: string;
//     admin?: boolean;
//     read?: boolean;
//     write?: boolean;
// }
