import { getProjects } from "@/lib/services/project";
import { getCompanies } from "@/lib/services/company";
import { getPeople } from "@/lib/services/person";
import { getAssets } from "@/lib/services/asset";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Building2, Users, Package } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [projects, companies, people, assets] = await Promise.all([
    getProjects(),
    getCompanies(),
    getPeople(),
    getAssets(),
  ]);

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FolderOpen,
      href: "/projects",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Companies",
      value: companies.length,
      icon: Building2,
      href: "/companies",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "People",
      value: people.length,
      icon: Users,
      href: "/people",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Assets",
      value: assets.length,
      icon: Package,
      href: "/assets",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const activeProjects = projects.filter((p) => p.status === "active");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your commissioning projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon, href, color, bg }) => (
          <Link key={title} href={href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                  </div>
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Active Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Active Projects</CardTitle>
          <Link href="/projects" className="text-sm text-blue-600 hover:underline">
            View all →
          </Link>
        </CardHeader>
        <CardContent>
          {activeProjects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No active projects.{" "}
              <Link href="/projects" className="text-blue-600 hover:underline">
                Create one
              </Link>
            </p>
          ) : (
            <div className="divide-y">
              {activeProjects.slice(0, 5).map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="py-3 flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">
                        {project.clientName && `${project.clientName} · `}
                        {project.phase || "No phase set"}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{project._count.assets} assets</p>
                      <p>{project._count.issues} issues</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
