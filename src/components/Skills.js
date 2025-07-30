import React from "react";
import { useTranslation } from "react-i18next";

const skills = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 95 },
  { name: "TailwindCSS", level: 85 },
  { name: "TypeScript", level: 70 },
  { name: "React Native", level: 95 },
  { name: "Python", level: 85 },
  { name: "Java", level: 70 },
];

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section className="py-20 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-10">{t("skills.title")}</h2>
      <div className="space-y-6">
        {skills.map(({ name, level }, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span>{name}</span>
              <span>{level}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded h-4">
              <div
                className="bg-pink-600 h-4 rounded"
                style={{ width: `${level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
