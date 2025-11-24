"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// Define the shape of each testimonial item
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

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("http://localhost:5000/testimonials", {
          cache: "no-store", // ensure fresh data each time
        });
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        // Map DB fields safely
        const mapped: Testimonial[] = data.map((t: any) => ({
          testimonial_id: t.testimonial_id,
          patient_name: t.patient_name,
          message: t.message,
          photo_url: t.photo_url
            ? `http://localhost:5000${t.photo_url}` // prepend backend URL
            : "/placeholder-user.jpg", // fallback image
          rating: t.rating,
          status: t.status,
          condition: t.condition || "",
        }));

        setTestimonials(mapped);
      } catch (err: any) {
        console.error("❌ Failed to fetch testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline">Testimonials</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-foreground/80">
            Real stories from those we've helped on their journey to recovery.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 md:py-20">
        <div className="container">
          {loading ? (
            <p className="text-center text-lg text-muted-foreground">
              Loading testimonials...
            </p>
          ) : error ? (
            <p className="text-center text-lg text-red-600">{error}</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center text-lg text-muted-foreground">
              No testimonials available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <Card
                  key={t.testimonial_id}
                  className="flex flex-col overflow-hidden shadow-lg transform transition-transform duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                    {t.photo_url && (
                      <div className="w-24 h-24 mb-4 relative">
                        <Image
                          src={t.photo_url}
                          alt={`Patient ${t.patient_name}`}
                          fill
                          className="rounded-full object-cover"
                          sizes="100px"
                        />
                      </div>
                    )}
                    <blockquote className="text-lg font-accent italic text-foreground mb-4 flex-grow">
                      "{t.message}"
                    </blockquote>
                    <div>
                      <p className="font-bold text-primary">
                        {t.patient_name}
                      </p>
                      {t.condition && (
                        <p className="text-sm text-muted-foreground">
                          {t.condition}
                        </p>
                      )}
                      {t.rating && (
                        <p className="text-yellow-500 text-sm mt-1">
                          {"⭐".repeat(t.rating)}
                        </p>
                      )}
                    </div>
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
