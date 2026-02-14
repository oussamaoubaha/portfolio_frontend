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
    cv_url?: string;
    social_links?: {
        linkedin?: string;
        github?: string;
        facebook?: string;
        instagram?: string;
        whatsapp?: string;
    };
}

export interface Project {
    id?: number;
    title: string;
    description: string;
    image_url?: string;
    project_url?: string;
    technologies?: string[];
    order?: number;
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
    guest_email?: string;
    role?: string;
    content: string;
    rating: number;
    is_active: boolean;
    is_published: boolean;
    created_at: string;
}
