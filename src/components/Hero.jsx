import React from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="text-center py-24 max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {t("hero.title")}
      </h1>
      <p className="text-xl text-gray-300 mb-8">{t("hero.subtitle")}</p>
      <a
        href="#contact"
        className="inline-block px-8 py-3 bg-pink-600 rounded-full text-white font-semibold hover:bg-pink-700 transition"
      >
        {t("hero.cta")}
      </a>
    </section>
  );
}
