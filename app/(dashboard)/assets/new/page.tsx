import { getProjects } from "@/lib/services/project";
import AssetForm from "@/components/forms/asset-form";

export default async function NewAssetPage() {
  const projects = await getProjects();
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Asset</h1>
        <p className="text-gray-500 mt-1">Add a new asset to a project</p>
      </div>
      <AssetForm projects={projects} />
    </div>
  );
}
