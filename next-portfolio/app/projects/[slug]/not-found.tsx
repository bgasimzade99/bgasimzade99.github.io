import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
      <p className="text-white/65 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-400/90 font-medium transition-colors"
      >
        ← Back to projects
      </Link>
    </main>
  );
}
