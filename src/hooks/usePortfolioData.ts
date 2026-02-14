import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Profile, Skill, Experience, Review, Project } from "@/types";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get<Profile>("/profile");
      return data;
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get<Project[]>("/projects");
      return data;
    },
  });
}

export function useSkillCategories() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await api.get<Skill[]>("/skills");

      // Group skills by category
      const categoriesMap: Record<string, { name: string; icon: string; skills: Skill[] }> = {};

      data.forEach((skill) => {
        const cat = skill.category || "Other";
        if (!categoriesMap[cat]) {
          categoriesMap[cat] = {
            name: cat,
            icon: skill.icon || "code",
            skills: [],
          };
        }
        categoriesMap[cat].skills.push(skill);
      });

      return Object.values(categoriesMap);
    },
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data } = await api.get<Experience[]>("/experiences");
      // Filter out Education entries
      return data.filter(e => e.type !== 'Education' && e.type !== 'Formation');
    },
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data } = await api.get<Experience[]>("/experiences");
      // Filter for Education and map to expected format
      return data
        .filter(e => e.type === 'Education' || e.type === 'Formation')
        .map(e => ({
          ...e,
          degree: e.role,
          school: e.company,
        }));
    },
  });
}

export function useApprovedFeedback() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await api.get<Review[]>("/reviews");
      return data;
    },
  });
}
