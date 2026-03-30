import { getProjectById } from "@/lib/services/project";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Package, Users, Building2, AlertCircle } from "lucide-react";
import { formatDate, getStatusColor } from "@/lib/utils";
import DeleteProjectButton from "./delete-button";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  if (!project) notFound();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
          </div>
          {project.clientName && (
            <p className="text-gray-500 mt-1">{project.clientName}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/projects/${project.id}/edit`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </Link>
          <DeleteProjectButton projectId={project.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.description && (
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Description</p>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            )}
            {project.phase && (
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Phase</p>
                <p className="text-sm mt-1">{project.phase}</p>
              </div>
            )}
            {project.siteAddress && (
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium">Site Address</p>
                <p className="text-sm mt-1">{project.siteAddress}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {project.startDate && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Start Date</p>
                  <p className="text-sm mt-1">{formatDate(project.startDate)}</p>
                </div>
              )}
              {project.endDate && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">End Date</p>
                  <p className="text-sm mt-1">{formatDate(project.endDate)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project._count.assets}</p>
                <p className="text-sm text-gray-500">Assets</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project._count.issues}</p>
                <p className="text-sm text-gray-500">Issues</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project.companies.length}</p>
                <p className="text-sm text-gray-500">Companies</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{project.people.length}</p>
                <p className="text-sm text-gray-500">People</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assets */}
      {project.assets.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Assets</CardTitle>
            <Link href={`/assets?projectId=${project.id}`}>
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {project.assets.slice(0, 5).map((asset) => (
                <div key={asset.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{asset.tag} — {asset.name}</p>
                    <p className="text-xs text-gray-500">
                      {asset.discipline && `${asset.discipline}`}
                      {asset.system && ` · ${asset.system}`}
                    </p>
                  </div>
                  <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
