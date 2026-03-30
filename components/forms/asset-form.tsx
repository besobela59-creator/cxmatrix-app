"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  id: string;
  name: string;
}

interface Asset {
  id: string;
  tag: string;
  name: string;
  description: string | null;
  discipline: string | null;
  system: string | null;
  location: string | null;
  status: string;
  projectId: string;
}

interface AssetFormProps {
  asset?: Asset;
  projects: Project[];
}

export default function AssetForm({ asset, projects }: AssetFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      tag: formData.get("tag") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string || undefined,
      discipline: formData.get("discipline") as string || undefined,
      system: formData.get("system") as string || undefined,
      location: formData.get("location") as string || undefined,
      status: formData.get("status") as string,
      projectId: formData.get("projectId") as string,
    };

    try {
      const url = asset ? `/api/assets/${asset.id}` : "/api/assets";
      const method = asset ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body.error || "Failed to save asset");
        return;
      }

      router.push("/assets");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Asset Tag *</Label>
              <Input
                id="tag"
                name="tag"
                defaultValue={asset?.tag}
                placeholder="e.g. AHU-1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" defaultValue={asset?.status || "pending"}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Asset Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={asset?.name}
              placeholder="e.g. Air Handling Unit 1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectId">Project *</Label>
            <Select id="projectId" name="projectId" defaultValue={asset?.projectId} required>
              <option value="">— Select a project —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discipline">Discipline</Label>
              <Input
                id="discipline"
                name="discipline"
                defaultValue={asset?.discipline ?? ""}
                placeholder="e.g. Mechanical"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="system">System</Label>
              <Input
                id="system"
                name="system"
                defaultValue={asset?.system ?? ""}
                placeholder="e.g. HVAC"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={asset?.location ?? ""}
              placeholder="e.g. Mechanical Room 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={asset?.description ?? ""}
              placeholder="Asset description"
              rows={3}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : asset ? "Save Changes" : "Add Asset"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
