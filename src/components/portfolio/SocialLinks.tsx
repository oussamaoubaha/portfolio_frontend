import { motion } from "framer-motion";
import { Linkedin, Github, Facebook, Instagram } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Profile } from "@/types";

interface SocialLinksProps {
    profile?: Profile | null;
}

const SocialLinks = ({ profile }: SocialLinksProps) => {
    const { social } = portfolioData;
    const dbSocial = profile?.social_links;

    const socialItems = [
        {
            name: "LinkedIn",
            icon: <Linkedin size={24} />,
            url: dbSocial?.linkedin || social.linkedin,
            color: "#0077b5",
            hoverShadow: "shadow-[0_0_20px_rgba(0,119,181,0.5)]",
        },
        {
            name: "GitHub",
            icon: <Github size={24} />,
            url: dbSocial?.github || social.github,
            color: "#333",
            hoverShadow: "shadow-[0_0_20px_rgba(51,51,51,0.5)]",
        },
        {
            name: "Facebook",
            icon: <Facebook size={24} />,
            url: dbSocial?.facebook || social.facebook,
            color: "#1877f2",
            hoverShadow: "shadow-[0_0_20px_rgba(24,119,242,0.5)]",
        },
        {
            name: "Instagram",
            icon: <Instagram size={24} />,
            url: dbSocial?.instagram || social.instagram,
            color: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            hoverShadow: "shadow-[0_0_20px_rgba(204,35,102,0.5)]",
            isGradient: true,
        },
        {
            name: "WhatsApp",
            icon: (
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 1 1 0 0 1 1 1 1 1 0 0 1-1 1A6.5 6.5 0 1 0 19 11.5a1 1 0 0 1 2 0z" />
                    <path d="M12 7v5l3 3" />
                    <path d="M17.5 19.5L21 21l-1.5-3.5a8.5 8.5 0 1 1-2-18 8.5 8.5 0 0 1 2 18" fill="none" />
                    {/* Simpler WhatsApp SVG representative */}
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.046c0 2.121.554 4.191 1.605 6.04L0 24l6.095-1.599a11.803 11.803 0 005.948 1.626h.005c6.634 0 12.044-5.41 12.049-12.048a11.771 11.771 0 00-3.584-8.324z" fill="currentColor" />
                </svg>
            ),
            url: dbSocial?.whatsapp || social.whatsapp,
            color: "#25d366",
            hoverShadow: "shadow-[0_0_20px_rgba(37,211,102,0.5)]",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-6 mt-12 py-6 px-4">
            {socialItems.map((item, index) => (
                <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 1,
                        y: [0, -10, 0]
                    }}
                    transition={{
                        opacity: { duration: 0.5, delay: index * 0.1 },
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2
                        }
                    }}
                    whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.2 }
                    }}
                    className={`group relative p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 hover:z-20 ${item.hoverShadow}`}
                    style={{}}
                >
                    <div
                        className="text-hero-foreground/70 group-hover:text-white transition-colors duration-300"
                        style={{
                            transition: "color 0.3s ease-in-out"
                        }}
                    >
                        {/* Overlay for brand color on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                            style={{
                                background: item.isGradient ? item.color : item.color,
                                opacity: 0
                            }}
                            whileHover={{ opacity: 0.2 }}
                        />

                        <div className="relative z-10 transition-colors duration-300 group-hover:text-white"
                            style={{ color: "inherit" }}>
                            {/* We wrap the icon to apply color directly on hover */}
                            <style dangerouslySetInnerHTML={{
                                __html: `
                     .group-${item.name}:hover {
                       color: ${item.isGradient ? '#fff' : item.color} !important;
                     }
                   `}} />
                            <div
                                className="transition-all duration-300"
                                style={{
                                    color: "currentColor"
                                }}
                                onMouseEnter={(e) => {
                                    if (!item.isGradient) e.currentTarget.style.color = item.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "";
                                }}
                            >
                                {item.icon}
                            </div>
                        </div>
                    </div>

                    {/* Tooltip */}
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {item.name}
                    </span>
                </motion.a>
            ))}
        </div>
    );
};

export default SocialLinks;
