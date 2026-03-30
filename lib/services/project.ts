import { prisma } from "@/lib/prisma";
import {
  createProjectSchema,
  updateProjectSchema,
  CreateProjectInput,
  UpdateProjectInput,
} from "@/lib/validations/project";

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { assets: true, issues: true },
      },
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      assets: true,
      issues: true,
      companies: { include: { company: true } },
      people: { include: { person: { include: { company: true } } } },
      _count: { select: { assets: true, issues: true } },
    },
  });
}

export async function createProject(data: CreateProjectInput) {
  const validated = createProjectSchema.parse(data);
  return prisma.project.create({ data: validated });
}

export async function updateProject(id: string, data: UpdateProjectInput) {
  const validated = updateProjectSchema.parse(data);
  return prisma.project.update({ where: { id }, data: validated });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({ where: { id } });
}
