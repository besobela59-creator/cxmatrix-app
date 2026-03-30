import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { username: "Admin" },
    update: {},
    create: {
      username: "Admin",
      password: hashedPassword,
      name: "Administrator",
      role: "admin",
    },
  });
  console.log("✅ Admin user created:", admin.username);

  // Create sample company
  const company = await prisma.company.upsert({
    where: { id: "seed-company-1" },
    update: {},
    create: {
      id: "seed-company-1",
      name: "Pratus Engineering",
      address: "123 Main St, Toronto, ON",
      phone: "416-555-0100",
      email: "info@pratus.ca",
    },
  });
  console.log("✅ Company created:", company.name);

  // Create sample project
  const project = await prisma.project.upsert({
    where: { id: "seed-project-1" },
    update: {},
    create: {
      id: "seed-project-1",
      name: "Wardlaw Data Hall",
      description: "Commissioning of data hall mechanical and electrical systems",
      status: "active",
      phase: "Construction",
      clientName: "Wardlaw Properties",
      siteAddress: "456 Bay St, Toronto, ON",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-12-31"),
    },
  });
  console.log("✅ Project created:", project.name);

  // Associate company with project
  await prisma.projectCompany.upsert({
    where: {
      projectId_companyId: {
        projectId: project.id,
        companyId: company.id,
      },
    },
    update: {},
    create: {
      projectId: project.id,
      companyId: company.id,
      role: "Commissioning Agent",
    },
  });

  // Create sample assets
  const assets = [
    {
      id: "seed-asset-1",
      tag: "ATS-1",
      name: "Automatic Transfer Switch 1",
      discipline: "Electrical",
      system: "Power Distribution",
      location: "Electrical Room 1",
      status: "pending",
      projectId: project.id,
    },
    {
      id: "seed-asset-2",
      tag: "AHU-1",
      name: "Air Handling Unit 1",
      discipline: "Mechanical",
      system: "HVAC",
      location: "Mechanical Room 1",
      status: "in-progress",
      projectId: project.id,
    },
  ];

  for (const asset of assets) {
    await prisma.asset.upsert({
      where: { id: asset.id },
      update: {},
      create: asset,
    });
    console.log("✅ Asset created:", asset.tag);
  }

  // Create checklist template
  await prisma.checklistTemplate.upsert({
    where: { id: "seed-template-1" },
    update: {},
    create: {
      id: "seed-template-1",
      name: "ATS Pre-Functional Checklist",
      description: "Standard pre-functional checklist for automatic transfer switches",
      discipline: "Electrical",
      lines: [
        { id: "line-1", description: "Verify equipment nameplate matches submittal", type: "pass-fail" },
        { id: "line-2", description: "Inspect for physical damage", type: "pass-fail" },
        { id: "line-3", description: "Verify wiring connections are tight", type: "pass-fail" },
        { id: "line-4", description: "Record normal source voltage", type: "text" },
        { id: "line-5", description: "Record emergency source voltage", type: "text" },
      ],
    },
  });
  console.log("✅ Checklist template created");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
