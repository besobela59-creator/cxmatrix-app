import { getCompanyById } from "@/lib/services/company";
import { notFound } from "next/navigation";
import CompanyForm from "@/components/forms/company-form";

export default async function EditCompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const company = await getCompanyById(companyId);
  if (!company) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Company</h1>
        <p className="text-gray-500 mt-1">Update company details</p>
      </div>
      <CompanyForm company={company} />
    </div>
  );
}
