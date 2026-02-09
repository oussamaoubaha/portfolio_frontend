export interface Profile {
    id?: number;
    name: string;
    title: string;
    subtitle: string;
    description: string;
    email: string;
    location: string;
    hero_image?: string;
    about_text?: string;
}

export interface Skill {
    id?: number;
    name: string;
    category: string;
    icon?: string;
    level: number;
}

export interface Experience {
    id?: number;
    role: string;
    company: string;
    location?: string;
    period?: string;
    type?: string;
    description?: string;
    missions?: string[];
}

export interface Review {
    id?: number;
    author: string;
    role?: string;
    content: string;
    rating: number;
    is_active: boolean;
}
