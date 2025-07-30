import React from "react";
import { useTranslation } from "react-i18next";

const projects = [
  {
    titleKey: "projects.project1.title",
    descKey: "projects.project1.description",
    url: "https://github.com/yourusername/project1",
  },
  {
    titleKey: "projects.project2.title",
    descKey: "projects.project2.description",
    url: "https://bgasimzade99.github.io/BGAutoSales/",
  },
  // Projeleri kendine göre ekle
];

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section className="py-20 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-10">{t("projects.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(({ titleKey, descKey, url }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 p-6 rounded-lg hover:shadow-xl hover:scale-[1.03] transition transform"
          >
            <h3 className="text-2xl font-semibold mb-2">{t(titleKey)}</h3>
            <p className="text-gray-400">{t(descKey)}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
