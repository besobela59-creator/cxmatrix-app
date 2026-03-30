import { z } from "zod";

export const createAssetSchema = z.object({
  tag: z.string().min(1, "Asset tag is required").max(50),
  name: z.string().min(1, "Asset name is required").max(200),
  description: z.string().optional(),
  discipline: z.string().optional(),
  system: z.string().optional(),
  location: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed", "failed"]).default("pending"),
  projectId: z.string().min(1, "Project is required"),
});

export const updateAssetSchema = createAssetSchema.partial();

export type CreateAssetInput = z.infer<typeof createAssetSchema>;
export type UpdateAssetInput = z.infer<typeof updateAssetSchema>;
