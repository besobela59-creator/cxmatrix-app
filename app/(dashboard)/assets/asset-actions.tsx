"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AssetActions({ assetId }: { assetId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this asset?")) return;
    setLoading(true);
    try {
      await fetch(`/api/assets/${assetId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Link href={`/assets/${assetId}/edit`}>
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
