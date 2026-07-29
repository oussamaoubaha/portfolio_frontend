import { useQuery } from "@tanstack/react-query";
import { portfolioData } from "@/data/portfolioData";
import { Profile, Skill, Experience, Review, Project } from "@/types";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      // Use static data instead of API call
      return {
        name: portfolioData.name,
        title: portfolioData.title,
        subtitle: portfolioData.subtitle,
        email: portfolioData.email,
        location: portfolioData.location,
        hero_image: "/OUSSAMA.jpg",
        about_text: portfolioData.about.paragraphs.join("\n\n"),
      } as Profile;
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      // Use static data instead of API call
      return portfolioData.projects.items as Project[];
    },
  });
}

export function useSkillCategories() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      // Use static data instead of API call
      return portfolioData.skills.categories.map(category => ({
        name: category.name,
        icon: category.icon,
        skills: category.items.map((skillName, index) => ({
          id: index + 1,
          name: skillName,
          category: category.name,
          icon: category.icon,
          display_order: index + 1,
          level: 'intermediate' as const,
        })),
      }));
    },
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      // Use static data instead of API call
      return portfolioData.experiences.items.map(exp => ({
        id: exp.id || 1,
        role: exp.role,
        company: exp.company,
        location: exp.location,
        period: exp.period,
        type: exp.type,
        missions: exp.missions,
      } as Experience));
    },
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      // Return education data in correct format
      return portfolioData.education.items;
    },
  });
}

export function useApprovedFeedback() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      // Return empty array for reviews since we don't have static data for them
      return [] as Review[];
    },
  });
}
