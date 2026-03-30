# CxMatrix - Commissioning Management Platform

A full-stack web application for managing building commissioning projects, built with **Next.js 15**, **TypeScript**, **Prisma**, and **PostgreSQL**.

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Auth**: Cookie-based sessions with JWT (jose)

## Features

- 🔐 Cookie-based authentication (username/password)
- 📊 Projects management (CRUD)
- 🏢 Companies directory (CRUD)
- 👥 People/contacts management (CRUD)
- ⚙️ Assets tracking (CRUD)
- 🛡️ Protected dashboard routes via middleware
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Clone and install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and SESSION_SECRET

# Run database migrations
npx prisma migrate dev --name init

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials

| Username | Password |
|----------|----------|
| `Admin`  | `admin123` |

## Database Schema

Models: **User**, **Project**, **Company**, **Person**, **ProjectCompany**, **ProjectPerson**, **Asset**, **Issue**, **ChecklistTemplate**, **Checklist**, **TestTemplate**, **TestRecord**, **FileRecord**

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET/POST | `/api/projects` | List/create projects |
| GET/PATCH/DELETE | `/api/projects/[id]` | Get/update/delete project |
| GET/POST | `/api/companies` | List/create companies |
| PATCH/DELETE | `/api/companies/[id]` | Update/delete company |
| GET/POST | `/api/people` | List/create people |
| PATCH/DELETE | `/api/people/[id]` | Update/delete person |
| GET/POST | `/api/assets` | List/create assets |
| PATCH/DELETE | `/api/assets/[id]` | Update/delete asset |

## Project Structure

```
app/
├── (auth)/login/          # Login page
├── (dashboard)/           # Protected dashboard layout
│   ├── dashboard/         # Overview stats
│   ├── projects/          # Project CRUD pages
│   ├── companies/         # Company CRUD pages
│   ├── people/            # People CRUD pages
│   └── assets/            # Asset CRUD pages
├── api/                   # API route handlers
└── globals.css
lib/
├── prisma.ts              # Prisma client
├── session.ts             # JWT session management
├── utils.ts               # Utility functions
├── services/              # Business logic layer
└── validations/           # Zod schemas
components/
├── ui/                    # UI components
├── layout/                # Sidebar, TopBar
└── forms/                 # CRUD forms
prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Seed data
middleware.ts              # Route protection
```

