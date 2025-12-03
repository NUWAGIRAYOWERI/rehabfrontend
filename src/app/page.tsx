import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getServices, whyChooseUs, getTestimonials } from "@/lib/constants";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

// ✅ Fetch hero image from backend API
async function getHeroImage() {
  try {
    const res = await fetch("https://rehabserver.onrender.com/hero", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch hero image");
    const data = await res.json();

    // ✅ Decode base64 image data
    if (data.image) {
      const base64String = `data:image/jpeg;base64,${data.image}`;
      return base64String;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching hero image:", error);
    return null;
  }
}

export default async function Home() {
  const heroImage = await getHeroImage();

  const [services, testimonialsData] = await Promise.all([
    getServices(),
    getTestimonials(),
  ]);

  const testimonials = testimonialsData.map((t: any) => ({
    name: t.patient_name,
    quote: t.message,
    imageUrl: t.photo_url
      ? `https://rehabserver.onrender.com${t.photo_url}`
      : "/placeholder-user.jpg",
    condition: t.condition || "",
    rating: t.rating || 0,
  }));

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        {/* ✅ Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          {heroImage ? (
            <Image
              src={heroImage}
              alt="Hero background"
              fill
              className="object-cover -z-10 brightness-50"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800 -z-10 flex items-center justify-center text-white">
              <p>No hero image found</p>
            </div>
          )}

          <div className="container px-4 md:px-6 space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline tracking-tight">
              Kiwenda Rehabilitation Centre and Clinic
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
              Comprehensive health care for all ages and conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                <Link href="/contact">Book Appointment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-bold"
              >
                <Link href="#services">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ✅ About Section */}
        <section id="about" className="py-12 md:py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline mb-4 text-primary">
                Welcome to Kiwenda Rehabilitation Centre and Clinic
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                At Kiwenda, we are dedicated to providing compassionate,
                professional, and personalized care to help our patients regain
                their independence and improve their quality of life.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-2">
                    <Icons.Goal className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-primary">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    To enhance the quality of life for individuals affected by
                    physical disabilities and chronic conditions through
                    personalized rehabilitation, community outreach, and
                    professional excellence in health care.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-2">
                    <Icons.Eye className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline text-2xl text-primary">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    To be a leading rehabilitation centre in Uganda dedicated to
                    restoring strength, independence, and hope through
                    compassionate, evidence-based rehabilitation and holistic
                    care.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ✅ Services Section */}
        <section id="services" className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-primary">
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Specialized care for a wide range of conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => {
                const IconComponent = (Icons[
                  service.icon as keyof typeof Icons
                ] || Icons.HelpCircle) as LucideIcon;

                return (
                  <Card
                    key={service.slug}
                    className="flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <IconComponent className="w-10 h-10 text-primary" />
                        <CardTitle className="font-headline text-xl">
                          {service.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button
                        asChild
                        variant="link"
                        className="p-0 text-primary font-bold"
                      >
                        <Link href={`/services/${service.slug}`}>
                          Learn More →
                        </Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        {/* Why Choose Us Section (unchanged) */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-primary">
                Why Choose Us?
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Your partners in healing and recovery.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {whyChooseUs.map((reason) => {
                const Icon =
                  typeof reason.icon === "string"
                    ? Icons[reason.icon] || Icons.Star
                    : reason.icon;
                return (
                  <div
                    key={reason.title}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-headline mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section (unchanged) */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-primary">
                Patient Success Stories
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Real stories from those we've helped.
              </p>
            </div>
            {testimonials.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No testimonials available yet.
              </p>
            ) : (
              <Carousel
                opts={{ loop: true }}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent>
                  {testimonials.map((testimonial: any, index: number) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 shadow-none">
                        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                          {testimonial.imageUrl && (
                            <Image
                              src={testimonial.imageUrl}
                              alt={`Patient ${testimonial.name}`}
                              width={120}
                              height={120}
                              className="rounded-full object-cover w-24 h-24 md:w-32 md:h-32"
                            />
                          )}
                          <div className="text-center md:text-left">
                            <blockquote className="text-lg md:text-xl font-accent italic text-foreground mb-4">
                              "{testimonial.quote}"
                            </blockquote>
                            <p className="font-bold text-primary">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.condition}
                            </p>
                            {testimonial.rating > 0 && (
                              <p className="text-yellow-500 text-sm mt-2">
                                {"⭐".repeat(testimonial.rating)}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-headline mb-4">
              Start Your Recovery Journey Today
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
              Your journey to strength starts here.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
