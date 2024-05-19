export interface RegisterInputUser {
    user: {
        email: string;
        name: string;
        password: string;
        admission?: string;
    },
    career?: string
}