import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t("contact.alert"));
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">{t("contact.title")}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          type="text"
          placeholder={t("contact.name")}
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-pink-600"
        />
        <input
          name="email"
          type="email"
          placeholder={t("contact.email")}
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-pink-600"
        />
        <textarea
          name="message"
          rows="5"
          placeholder={t("contact.message")}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-pink-600 resize-none"
        />
        <button
          type="submit"
          className="bg-pink-600 px-6 py-3 rounded text-white font-semibold hover:bg-pink-700 transition"
        >
          {t("contact.send")}
        </button>
      </form>
    </section>
  );
}
