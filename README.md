# Clerk + Prisma + NeonDB Authentication Starter

A production-ready full-stack authentication starter built with **Next.js 15**, **Clerk**, **Prisma**, and **NeonDB**. This project demonstrates seamless integration of modern authentication with database persistence and webhook-based user synchronization.

## 📋 Description

This starter kit provides a complete authentication solution that combines Clerk's powerful authentication system with Prisma ORM and NeonDB (PostgreSQL). When users sign up through Clerk, their information is automatically synchronized to your database via secure webhooks, enabling you to build user-specific features and manage user data effectively.

The application includes role-based routing middleware that intelligently redirects users to appropriate dashboards based on their roles (admin/user), making it perfect for building SaaS applications, multi-tenant systems, or any application requiring user management.

## ✨ Features

### 🔐 Authentication & Authorization
- **Complete Auth Flow** - Sign-up, sign-in, sign-out with Clerk
- **Role-Based Access Control** - Middleware routes users based on roles (admin/user)
- **Protected Routes** - Automatic route protection with configurable public routes
- **User Management** - Built-in user profile with Clerk's UserButton component
- **Session Management** - Secure session handling across the application

### 🗄️ Database & ORM
- **Prisma ORM** - Type-safe database queries with auto-generated TypeScript types
- **NeonDB Integration** - Serverless PostgreSQL optimized for modern apps
- **User Model** - Complete schema with subscription tracking and email management
- **Todo Model** - Example relational model demonstrating user associations
- **Custom Output Path** - Prisma client generated in app directory for easy imports

### 🔔 Webhook Integration
- **Clerk Webhooks** - Automatic user synchronization on sign-up events
- **Svix Verification** - Secure webhook signature verification
- **User Creation Handler** - Automatically creates database records when users register
- **Error Handling** - Robust error handling for webhook failures

### 🎨 Modern Tech Stack
- **Next.js 15** - Latest App Router with Turbopack for fast development
- **TypeScript** - Full type safety across the entire application
- **TailwindCSS v4** - Modern utility-first CSS framework
- **React 19** - Latest React features and optimizations
- **ESLint** - Code quality and consistency enforcement

### 🚀 Developer Experience
- **Hot Reload** - Lightning-fast development with Turbopack
- **Type Safety** - End-to-end TypeScript support
- **Prisma Studio** - Visual database editor
- **Environment Variables** - Secure configuration management
- **Git Ready** - Proper .gitignore with .env.example template

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15.5.4 |
| **Authentication** | Clerk |
| **Database** | NeonDB (PostgreSQL) |
| **ORM** | Prisma |
| **Styling** | TailwindCSS v4 |
| **Language** | TypeScript |
| **Webhook Handling** | Svix |
| **Runtime** | Node.js / Bun |

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   └── webhook/
│   │       └── register/
│   │           └── route.ts       # Clerk webhook handler
│   ├── generated/
│   │   └── prisma/                # Generated Prisma client
│   ├── layout.tsx                 # Root layout with Clerk provider
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── lib/
│   └── prisma.ts                  # Prisma client singleton
├── prisma/
│   └── schema.prisma              # Database schema
├── middleware.ts                  # Auth & role-based routing
├── .env.example                   # Environment variables template
└── package.json                   # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun**
- **Clerk Account** - [Sign up at clerk.com](https://clerk.com)
- **NeonDB Account** - [Sign up at neon.tech](https://neon.tech)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd clerk-prisma-tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Copy the example env file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   
   Required variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk Dashboard
   - `CLERK_SECRET_KEY` - From Clerk Dashboard
   - `DATABASE_URL` - Your NeonDB connection string
   - `WEBHOOK_SECRET` - From Clerk Webhooks (see step 5)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Configure Clerk Webhooks**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Navigate to **Webhooks** section
   - Click **Add Endpoint**
   - Add endpoint URL: `https://your-domain.com/api/webhook/register`
   - Subscribe to the `user.created` event
   - Copy the **Signing Secret** and add it to `.env` as `WEBHOOK_SECRET`

6. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)



## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma migrate dev` | Create and apply migrations |

## 🌐 Environment Variables

See `.env.example` for the complete list. Key variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Webhook
WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL="postgresql://..."
```

