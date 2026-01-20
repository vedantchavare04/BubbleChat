**BubbleChat**

A real-time chat application built with a modern full-stack architecture that supports instant messaging, scalability, and maintainability.

**Features-**

Real-time messaging using WebSockets<br/>

Scalable monorepo architecture<br/>

Modern UI with accessible components<br/>

Typed database schema with Prisma<br/>

Reliable PostgreSQL persistence<br/>

Clean separation between frontend and backend services<br/>

**Tech Stack-**
1.Monorepo-Turborepo	Manage Next.js app and WebSocket server in a single workspace.<br/>
2.Frontend-Next.js	UI and client-side logic.<br/>
3.Realtime-chat-WebSockets	Bidirectional, low-latency communication.<br/>
4.Database ORM-	Prisma	Type-safe database access.<br/>
5.Database-PostgreSQL	Persistent data storage.<br/>
6.UI-shadcn/ui + Tailwind CSS	Consistent, accessible, modern interface.<br/>
7.NextAuth.js — Handles authentication, sessions, and OAuth providers.<br/>

**Setup Instructions**
Prerequisites

Node.js 20+

pnpm

PostgreSQL database

Installation
git clone https://github.com/your-username/bubblechat.git
cd bubblechat
pnpm install

Environment Variables

Create a .env file in packages/database/-

DATABASE_URL=(your database url)

Create Nextauth url,secret in apps/web

Run the app
pnpm turbo dev


This starts:

Next.js frontend

WebSocket server

Development database connection

**Database-**

Run migrations:

cd packages/database
npx prisma migrate dev


Generate Prisma client:

npx prisma generate

**Goals of the Project-**

Minimal latency chat<br/>

Clean architecture<br/>

Scalable backend<br/>

Developer-friendly monorepo<br/>

Modern UI patterns<br/>
