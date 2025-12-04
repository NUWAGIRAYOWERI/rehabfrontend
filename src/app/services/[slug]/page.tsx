import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TrackServiceVisit from "@/components/TrackServiceVisit";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service: any) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ must await it
  const services = await getServices();
  const service = services.find((s: any) => s.slug === slug);

  if (!service) notFound();

  return (
    <>
      {/* ✅ Track service visit */}
      <TrackServiceVisit slug={slug} />

      <section className="py-12 md:py-20 bg-secondary">
        <div className="container text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-headline text-primary">
            {service.name}
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-headline mb-4">
                About the Treatment
              </h2>
              <p className="text-lg text-muted-foreground whitespace-pre-line">
                {service.long_description}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/contact">Book a Consultation</Link>
              </Button>
            </div>

            <div className="lg:col-span-2">
              {service.image_url && (
                <Card className="overflow-hidden shadow-lg">
                  <CardContent className="p-0">
                    <Image
                      src={
                        service.image_url.startsWith("http")
                          ? service.image_url
                          : `${service.image_url}`
                      }
                      alt={service.name}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
