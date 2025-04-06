# TaskFlow - Task Management Application

A comprehensive task management application built with Next.js and Tailwind CSS that helps you organize, prioritize, and track your tasks efficiently.

## Features

- **Kanban Boards**: Visualize your workflow with customizable Kanban boards
- **Task Tracking**: Set deadlines and track progress with ease
- **Intuitive Interface**: Simple and clean design that's easy to use for everyone
- **Persistent Storage**: Store your tasks in Supabase for reliable data persistence

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Static type checking for JavaScript
- **Radix UI**: Unstyled, accessible components for building high-quality web interfaces
- **Supabase**: Open source Firebase alternative for database, authentication, and storage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (free tier available)

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the queries from `supabase/schema.sql` to set up your database schema
3. Get your Supabase URL and anon key from the Settings > API section
4. Update the `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `/app`: Main application code with page components and routing
- `/components`: Reusable UI components
- `/lib`: Utility functions and shared logic
- `/types`: TypeScript type definitions
- `/public`: Static assets
- `/supabase`: Supabase related files including schemas

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- UI components built with [shadcn/ui](https://ui.shadcn.com/) 