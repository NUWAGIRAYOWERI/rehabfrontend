"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Type
interface Testimonial {
  testimonial_id: number;
  patient_name: string;
  message: string;
  photo_url: string | null;
  rating?: number;
  status?: string;
  condition?: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ form state
  const [form, setForm] = useState({
    patient_name: "",
    message: "",
    rating: "",
    status: "approved",
  });

  const [file, setFile] = useState<File | null>(null);

  // ✅ FETCH
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("https://rehabserver.onrender.com/testimonials", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      const mapped: Testimonial[] = data.map((t: any) => ({
        testimonial_id: t.testimonial_id,
        patient_name: t.patient_name,
        message: t.message,
        photo_url: t.photo_url
          ? `https://rehabserver.onrender.com${t.photo_url}`
          : "/placeholder-user.jpg",
        rating: t.rating,
        status: t.status,
        condition: t.condition || "",
      }));

      setTestimonials(mapped);
    } catch (err: any) {
      console.error("❌ Failed to fetch testimonials:", err);
      setError("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ✅ SUBMIT (UPLOAD)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("patient_name", form.patient_name);
    formData.append("message", form.message);
    formData.append("rating", form.rating);
    formData.append("status", form.status);

    if (file) {
      formData.append("photo", file); // MUST match multer
    }

    try {
      const res = await fetch(
        "https://rehabserver.onrender.com/testimonials/add",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      console.log("✅ Uploaded:", data);

      // reset form
      setForm({
        patient_name: "",
        message: "",
        rating: "",
        status: "approved",
      });
      setFile(null);

      // refresh list
      fetchTestimonials();
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline">Testimonials</h1>
        </div>
      </section>

      {/* ✅ FORM */}
      <section className="py-10">
        <div className="container max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="border p-2"
              placeholder="Patient Name"
              value={form.patient_name}
              onChange={(e) =>
                setForm({ ...form, patient_name: e.target.value })
              }
              required
            />

            <textarea
              className="border p-2"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />

            <input
              type="number"
              className="border p-2"
              placeholder="Rating (1–5)"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              required
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button className="bg-primary text-white py-2 rounded">
              Submit Testimonial
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20">
        <div className="container">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center">No testimonials yet.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card key={t.testimonial_id}>
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 relative">
                      <Image
                        src={t.photo_url || "/placeholder-user.jpg"}
                        alt={`Patient ${t.patient_name}`}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>

                    <p className="italic">"{t.message}"</p>

                    <p className="font-bold mt-2">{t.patient_name}</p>

                    {t.rating && <p>{"⭐".repeat(t.rating)}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
