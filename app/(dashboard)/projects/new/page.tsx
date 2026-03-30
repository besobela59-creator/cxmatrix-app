import ProjectForm from "@/components/forms/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Project</h1>
        <p className="text-gray-500 mt-1">Create a new commissioning project</p>
      </div>
      <ProjectForm />
    </div>
  );
}
