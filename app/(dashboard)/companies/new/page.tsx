import CompanyForm from "@/components/forms/company-form";

export default function NewCompanyPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Company</h1>
        <p className="text-gray-500 mt-1">Add a new company to your directory</p>
      </div>
      <CompanyForm />
    </div>
  );
}
