export interface UserItem {
    userId: string;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    realRole: string;
    jobTitle: string;
    status: '0' | '1' | '2';
    selected: boolean;
}
