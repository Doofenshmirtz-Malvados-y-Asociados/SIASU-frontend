export interface Comment {
    id: string,
    user: string,
    replyTo?: string,
    content: string,
    page: string
}