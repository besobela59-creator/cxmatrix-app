import { prisma } from "@/lib/prisma";
import {
  createCompanySchema,
  updateCompanySchema,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "@/lib/validations/company";

export async function getCompanies() {
  return prisma.company.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { people: true, projects: true } } },
  });
}

export async function getCompanyById(id: string) {
  return prisma.company.findUnique({
    where: { id },
    include: { people: true, projects: { include: { project: true } } },
  });
}

export async function createCompany(data: CreateCompanyInput) {
  const validated = createCompanySchema.parse(data);
  // Convert empty email to null
  if (validated.email === "") validated.email = undefined;
  return prisma.company.create({ data: validated });
}

export async function updateCompany(id: string, data: UpdateCompanyInput) {
  const validated = updateCompanySchema.parse(data);
  if (validated.email === "") validated.email = undefined;
  return prisma.company.update({ where: { id }, data: validated });
}

export async function deleteCompany(id: string) {
  return prisma.company.delete({ where: { id } });
}
