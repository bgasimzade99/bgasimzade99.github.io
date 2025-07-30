import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-20 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">{t("about.title")}</h2>
      <p className="text-gray-300 text-lg leading-relaxed">{t("about.description")}</p>
    </section>
  );
}
