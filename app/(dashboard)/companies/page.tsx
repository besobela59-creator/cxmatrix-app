import { getCompanies } from "@/lib/services/company";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Building2, Mail, Phone } from "lucide-react";
import CompanyActions from "./company-actions";

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-500 mt-1">{companies.length} total companies</p>
        </div>
        <Link href="/companies/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Company
          </Button>
        </Link>
      </div>

      {companies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Building2 className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No companies yet</h3>
            <p className="text-gray-500 mt-1 mb-4">Add companies to manage contacts</p>
            <Link href="/companies/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Company
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{company.name}</h3>
                    <div className="mt-2 space-y-1">
                      {company.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{company.email}</span>
                        </div>
                      )}
                      {company.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{company.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 text-xs text-gray-400">
                      {company._count.people} contacts · {company._count.projects} projects
                    </div>
                  </div>
                  <CompanyActions companyId={company.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
