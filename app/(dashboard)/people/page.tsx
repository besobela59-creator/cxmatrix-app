import { getPeople } from "@/lib/services/person";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Users, Mail, Phone, Building2 } from "lucide-react";
import PersonActions from "./person-actions";

export default async function PeoplePage() {
  const people = await getPeople();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">People</h1>
          <p className="text-gray-500 mt-1">{people.length} total contacts</p>
        </div>
        <Link href="/people/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Contact
          </Button>
        </Link>
      </div>

      {people.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No contacts yet</h3>
            <p className="text-gray-500 mt-1 mb-4">Add people to manage your contacts</p>
            <Link href="/people/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Contact
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {people.map((person) => (
            <Card key={person.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {person.firstName} {person.lastName}
                    </h3>
                    {person.role && (
                      <p className="text-sm text-gray-500 mt-0.5">{person.role}</p>
                    )}
                    <div className="mt-2 space-y-1">
                      {person.company && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{person.company.name}</span>
                        </div>
                      )}
                      {person.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{person.email}</span>
                        </div>
                      )}
                      {person.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{person.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <PersonActions personId={person.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
