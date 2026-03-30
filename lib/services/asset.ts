import { prisma } from "@/lib/prisma";
import {
  createAssetSchema,
  updateAssetSchema,
  CreateAssetInput,
  UpdateAssetInput,
} from "@/lib/validations/asset";

export async function getAssets(projectId?: string) {
  return prisma.asset.findMany({
    where: projectId ? { projectId } : undefined,
    orderBy: { tag: "asc" },
    include: { project: { select: { id: true, name: true } } },
  });
}

export async function getAssetById(id: string) {
  return prisma.asset.findUnique({
    where: { id },
    include: { project: true, checklists: true, testRecords: true, issues: true },
  });
}

export async function createAsset(data: CreateAssetInput) {
  const validated = createAssetSchema.parse(data);
  return prisma.asset.create({ data: validated });
}

export async function updateAsset(id: string, data: UpdateAssetInput) {
  const validated = updateAssetSchema.parse(data);
  return prisma.asset.update({ where: { id }, data: validated });
}

export async function deleteAsset(id: string) {
  return prisma.asset.delete({ where: { id } });
}
