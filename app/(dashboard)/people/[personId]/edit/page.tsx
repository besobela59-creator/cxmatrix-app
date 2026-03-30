import { getPersonById } from "@/lib/services/person";
import { getCompanies } from "@/lib/services/company";
import { notFound } from "next/navigation";
import PersonForm from "@/components/forms/person-form";

export default async function EditPersonPage({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const { personId } = await params;
  const [person, companies] = await Promise.all([
    getPersonById(personId),
    getCompanies(),
  ]);
  if (!person) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Contact</h1>
        <p className="text-gray-500 mt-1">Update contact details</p>
      </div>
      <PersonForm person={person} companies={companies} />
    </div>
  );
}
