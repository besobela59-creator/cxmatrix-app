import { getCompanies } from "@/lib/services/company";
import PersonForm from "@/components/forms/person-form";

export default async function NewPersonPage() {
  const companies = await getCompanies();
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New Contact</h1>
        <p className="text-gray-500 mt-1">Add a new person to your directory</p>
      </div>
      <PersonForm companies={companies} />
    </div>
  );
}
