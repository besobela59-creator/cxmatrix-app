import { getProjectById } from "@/lib/services/project";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/forms/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);
  if (!project) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
        <p className="text-gray-500 mt-1">Update project details</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
