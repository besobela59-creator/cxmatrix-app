"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function PersonActions({ personId }: { personId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this contact?")) return;
    setLoading(true);
    try {
      await fetch(`/api/people/${personId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Link href={`/people/${personId}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="w-4 h-4" />
        </Button>
      </Link>
      <Button variant="ghost" size="icon" onClick={handleDelete} disabled={loading}>
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
}
