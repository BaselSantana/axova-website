"use client";

import { useState } from "react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 transition"
      >
        Contact Us
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>

            {status === "sent" ? (
              <p className="text-green-600">Thanks — your message has been sent.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <textarea
                  placeholder="Your message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="border border-gray-300 rounded-md px-4 py-2"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
                {status === "error" && (
                  <p className="text-red-600 text-sm">Something went wrong — try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}