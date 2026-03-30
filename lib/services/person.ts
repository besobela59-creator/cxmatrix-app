import { prisma } from "@/lib/prisma";
import {
  createPersonSchema,
  updatePersonSchema,
  CreatePersonInput,
  UpdatePersonInput,
} from "@/lib/validations/person";

export async function getPeople() {
  return prisma.person.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
    include: { company: { select: { id: true, name: true } } },
  });
}

export async function getPersonById(id: string) {
  return prisma.person.findUnique({
    where: { id },
    include: {
      company: true,
      projects: { include: { project: true } },
    },
  });
}

export async function createPerson(data: CreatePersonInput) {
  const validated = createPersonSchema.parse(data);
  if (validated.email === "") validated.email = undefined;
  if (validated.companyId === "") validated.companyId = undefined;
  return prisma.person.create({ data: validated });
}

export async function updatePerson(id: string, data: UpdatePersonInput) {
  const validated = updatePersonSchema.parse(data);
  if (validated.email === "") validated.email = undefined;
  if (validated.companyId === "") validated.companyId = undefined;
  return prisma.person.update({ where: { id }, data: validated });
}

export async function deletePerson(id: string) {
  return prisma.person.delete({ where: { id } });
}
