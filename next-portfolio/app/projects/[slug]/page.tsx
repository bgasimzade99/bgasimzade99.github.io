import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { profile } from '@/content/profile';

export async function generateStaticParams() {
  return profile.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = profile.projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | ${profile.fullName}`,
    description: project.shortDesc,
    openGraph: {
      title: `${project.title} | ${profile.fullName}`,
      description: project.shortDesc,
    },
  };
}

function ProjectImage({ project }: { project: (typeof profile.projects)[0] }) {
  if (project.image) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-contain"
          sizes="800px"
        />
      </div>
    );
  }
  return (
    <div
      className="w-full aspect-video rounded-xl border border-white/[0.06] opacity-80"
      style={{
        background: project.gradient ?? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-24 rounded-2xl border border-white/10 bg-white/5" />
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = profile.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="max-w-[720px] mx-auto px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/55 hover:text-teal-400 text-sm font-medium mb-10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
        >
          ← Back to projects
        </Link>

        <article>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.15] text-white mb-2">
            {project.title}
          </h1>
          <p className="text-xs text-white/45 uppercase tracking-wider mb-2">{project.role}</p>
          <p className="text-lg text-white/65 mb-8 leading-relaxed">{project.shortDesc}</p>

          <div className="mb-10">
            <ProjectImage project={project} />
          </div>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.stack.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-white/55 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.05]"
              >
                {t}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3 mb-12">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/90 hover:bg-teal-500 text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  Live Demo →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.12] bg-white/[0.03] text-white text-sm font-medium hover:border-white/[0.2] hover:bg-white/[0.05] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  GitHub →
                </a>
              )}
            </div>
          )}

          <div className="space-y-10">
            {project.problem && (
              <section>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Problem</h2>
                <p className="text-white/62 leading-[1.7]">{project.problem}</p>
              </section>
            )}

            {project.solution && (
              <section>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Solution</h2>
                <p className="text-white/62 leading-[1.7]">{project.solution}</p>
              </section>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Key Features</h2>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/62">
                      <span className="text-teal-500/90 mt-0.5 shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Challenges</h2>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/62">
                      <span className="text-teal-500/90 mt-0.5 shrink-0">▸</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.result && (
              <section>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Outcome</h2>
                <p className="text-white/62 leading-[1.7]">{project.result}</p>
              </section>
            )}

            {project.metrics && project.metrics.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Results</h2>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/65 text-sm"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-teal-400/95 hover:text-teal-400 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            >
              ← Back to projects
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
