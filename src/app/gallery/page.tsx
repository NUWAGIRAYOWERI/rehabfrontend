'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

type GalleryImage = {
  image_id: number;
  image_url: string;
  title?: string;
  category?: string;
};

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("http://localhost:5000/gallery", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setGalleryImages(res.data);
      } catch (err) {
        console.error("❌ Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading gallery...
      </div>
    );
  }

  return (
    <>
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline">Gallery</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-foreground/80">
            A glimpse into our center, our team, and our community.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {galleryImages.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">
                No images found in the gallery.
              </p>
            ) : (
              galleryImages.map((image) => (
                <Card
                  key={image.image_id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                      <Image
                        src={
                          image.image_url.startsWith("http")
                            ? image.image_url
                            : `http://localhost:5000${image.image_url}`
                        }
                        alt={image.title || "Gallery image"}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
