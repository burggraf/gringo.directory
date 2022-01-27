export interface UserInvitation {
    invitationid: string;
    orgid: string;
    email: string;
    admin: boolean;
    read: boolean;
    write: boolean;
    createdAt: number;
    createdBy: string;
}