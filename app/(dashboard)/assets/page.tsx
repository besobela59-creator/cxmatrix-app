import { getAssets } from "@/lib/services/asset";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Package } from "lucide-react";
import { getStatusColor } from "@/lib/utils";
import AssetActions from "./asset-actions";

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ projectId?: string }>;
}) {
  const { projectId } = await searchParams;
  const assets = await getAssets(projectId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-500 mt-1">{assets.length} total assets</p>
        </div>
        <Link href="/assets/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Asset
          </Button>
        </Link>
      </div>

      {assets.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No assets yet</h3>
            <p className="text-gray-500 mt-1 mb-4">
              Add assets to track commissioning progress
            </p>
            <Link href="/assets/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Asset
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tag</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Discipline</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">System</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Project</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-medium text-blue-600">{asset.tag}</td>
                  <td className="px-4 py-3 font-medium">{asset.name}</td>
                  <td className="px-4 py-3 text-gray-500">{asset.discipline || "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{asset.system || "—"}</td>
                  <td className="px-4 py-3 text-gray-500">
                    <Link href={`/projects/${asset.project.id}`} className="hover:text-blue-600">
                      {asset.project.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <AssetActions assetId={asset.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
