import { motion } from "framer-motion";
import { ExternalLink, Github, Code2 } from "lucide-react";
import { useProjects } from "@/hooks/usePortfolioData";
import { useMemo, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const ProjectGrid = () => {
    const { data: projects, isLoading } = useProjects();
    const [filter, setFilter] = useState<"all" | "web" | "mobile" | "ia" | "data">("all");

    const filtered = useMemo(() => {
        const list = projects ?? [];
        if (filter === "all") return list;
        return list.filter((p: any) => (p.category || "web") === filter);
    }, [projects, filter]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <section id="projects" className="section-fade-top py-24">
                <div className="container mx-auto px-6">
                    <ScrollReveal direction="up" delay={0}>
                        <div className="flex items-center gap-3 mb-12">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Code2 className="text-primary" size={24} />
                            </div>
                            <h2 className="font-heading text-3xl font-bold text-foreground">
                                Mes Projets
                            </h2>
                        </div>
                    </ScrollReveal>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {[
                            { id: "all", label: "Tous" },
                            { id: "web", label: "Web" },
                            { id: "mobile", label: "Mobile" },
                            { id: "ia", label: "IA" },
                            { id: "data", label: "Data" },
                        ].map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setFilter(c.id as any)}
                                className={[
                                    "px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition",
                                    filter === c.id
                                        ? "border-primary/40 bg-primary/15 text-foreground"
                                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10",
                                ].join(" ")}
                                data-cursor="link"
                                data-magnetic
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((project: any, index) => (
                            <ScrollReveal key={project.id} direction="up" delay={index * 0.1}>
                                <div className="group relative bg-card rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 project-card"
                                     data-cursor="card">
                                    {/* Project Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <div className="flex gap-4">
                                                {project.github_url && (
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors"
                                                        data-cursor="link"
                                                    >
                                                        <Github size={20} />
                                                    </a>
                                                )}
                                                {project.project_url && (
                                                    <a
                                                        href={project.project_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors"
                                                        data-cursor="link"
                                                    >
                                                        <ExternalLink size={20} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies?.map(tech => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-primary/10 text-primary-light text-[10px] uppercase tracking-wider font-semibold rounded-full border border-primary/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectGrid;
