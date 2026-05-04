import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

interface Project {
  id: number;
  title: string;
  category: string;
  image_url: string;
  technologies: string[];
  github_url?: string;
  project_url?: string;
  description: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, { project: Project }>(({ project }, ref) => {
  const displayCategory = project.category === 'ia' ? 'AI & ML' : project.category === 'web' ? 'Web Dev' : project.category;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="h-full w-full">
        <img
          src={project.image_url || '/placeholder.svg'}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                {displayCategory}
              </p>
              <h3 className="mb-3 font-display text-2xl font-bold text-white">
                {project.title}
              </h3>
            </div>
            <div className="flex gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Code source Github du projet ${project.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <Github size={20} />
                </a>
              )}
              {project.project_url && (
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visiter le site en ligne du projet ${project.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-110"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="mb-6 line-clamp-2 text-sm text-foreground/70">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* View Case Study Button (Mobile only or always visible on top) */}
        <div className="absolute top-6 right-6 lg:hidden">
          <div className="rounded-full bg-background/50 p-2 backdrop-blur-md">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  // Extract unique categories from portfolioData and format them
  const rawCategories = Array.from(new Set(portfolioData.projects.items.map(p => p.category)));
  const displayCategories = rawCategories.map(c => c === 'ia' ? 'AI & ML' : c === 'web' ? 'Web Dev' : c);
  const categories = ['All', ...displayCategories];

  const mapFilterToCategory = (f: string) => {
    if (f === 'AI & ML') return 'ia';
    if (f === 'Web Dev') return 'web';
    return f;
  };

  const filteredProjects = filter === 'All'
    ? portfolioData.projects.items
    : portfolioData.projects.items.filter(p => p.category === mapFilterToCategory(filter));

  const titleParts = portfolioData.projects.title.split(' ');
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(' ');

  return (
    <section id="projects" className="py-32">
      <div className="container px-6">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl font-bold text-white md:text-6xl"
            >
              {titleFirst} <span className="text-gradient">{titleRest || 'Réalisés'}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-muted-foreground"
            >
              Une immersion dans mes travaux récents, alliant design intuitif et architectures robustes.
            </motion.p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${filter === cat
                    ? 'bg-primary text-white'
                    : 'border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project as unknown as Project} />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com/oussama-oubaha"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-5 font-bold transition-all hover:bg-white/10"
          >
            Voir plus sur GitHub
            <Github size={20} className="transition-transform group-hover:rotate-12" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
