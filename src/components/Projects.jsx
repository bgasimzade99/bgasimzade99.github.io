import React from "react";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();

  // İstersen projeleri burada listele, ya da dışardan çek
  const projects = [
    {
      title: t("projects.project1.title"),
      description: t("projects.project1.description"),
      link: "https://github.com/yourgithub/portfolio",
    },
    {
      title: t("projects.project2.title"),
      description: t("projects.project2.description"),
      link: "https://github.com/yourgithub/todoapp",
    },
  ];

  return (
    <section id="projects" className="my-10 container mx-auto px-4">
      <h2 className="text-4xl font-bold text-purple-500 mb-8">
        {t("projects.title")}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((proj, i) => (
          <a
            key={i}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-gradient-to-tr from-purple-700 to-blue-700 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <h3 className="text-2xl font-semibold mb-2 text-white">{proj.title}</h3>
            <p className="text-gray-300">{proj.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
