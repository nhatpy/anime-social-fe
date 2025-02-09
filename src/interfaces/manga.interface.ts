export interface User {
    id: string;
    email: string;
    fullName: string;
    password: string;
    avatar: string;
    wallet: number;
    role: string;
    isVerified: boolean;
    isWarning: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Author {
    id: string;
    user: User;
    follow: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Manga {
    id: string;
    author: Author;
    categories: Category[];
    chapters: Chapter[];
    follow: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface FollowList { 
    id: string;
    user: User;
    mangas: Manga[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Chapter {
    id: string;
    manga: Manga;
    name: string;
    content: string[];
    lastRead: boolean;
    lastReadAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    user: User;
    chapter: Chapter;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Notification {
    id: string;
    user: User;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentBill {
    id: string;
    user: User;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}