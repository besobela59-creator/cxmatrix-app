import { getAssetById } from "@/lib/services/asset";
import { getProjects } from "@/lib/services/project";
import { notFound } from "next/navigation";
import AssetForm from "@/components/forms/asset-form";

export default async function EditAssetPage({
  params,
}: {
  params: Promise<{ assetId: string }>;
}) {
  const { assetId } = await params;
  const [asset, projects] = await Promise.all([getAssetById(assetId), getProjects()]);
  if (!asset) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Asset</h1>
        <p className="text-gray-500 mt-1">Update asset details</p>
      </div>
      <AssetForm asset={asset} projects={projects} />
    </div>
  );
}
