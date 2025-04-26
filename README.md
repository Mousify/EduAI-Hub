# AI Tutoring & Classroom Hub

A free-tier, AI-powered platform that connects students (grades 5–12) with on-demand homework help, personalized practice, and multimodal tutoring tools, while giving teachers an integrated classroom management and content-generation suite.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account (for payment processing)
- OpenAI API key

### Environment Setup

1. Clone this repository
2. Copy `.env.local.example` to `.env.local`
3. Fill in your environment variables:
   - Supabase credentials
   - Stripe API keys
   - OpenAI API key
   - Application URL

### Supabase Setup

1. Create a new Supabase project
2. Follow the instructions in `supabase/SETUP.md` to set up your database schema
3. Alternatively, run the setup script:

\`\`\`bash
npm install
npx ts-node scripts/setup-supabase.ts
\`\`\`

### Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Student Dashboard with AI tutoring sessions, practice problems, and progress tracking
- Teacher Dashboard with classroom management, student monitoring, and assessment creation
- AI-powered tutoring with support for text, image, voice, and file inputs
- Subscription plans with token-based usage tracking
- Real-time notifications and analytics

## Tech Stack

- Next.js (App Router)
- Supabase (Auth, Database, Storage)
- OpenAI API
- Stripe for payments
- Tailwind CSS with shadcn/ui components

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - Reusable React components
- `/lib` - Utility functions and services
- `/public` - Static assets
- `/supabase` - Supabase setup files and migrations
