'use client';

import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  // Coordinates for Gayaza-Zirobwe Road, Kampala, Uganda
  const latitude = 0.550972;
  const longitude = 32.625194;

  return (
    <>
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline">Contact Us</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-foreground/80">
            We're here to help. Reach out to us for appointments or any inquiries.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-1 space-y-8">
              <h2 className="text-3xl font-headline text-primary">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-muted-foreground">
                      Gayaza-Zirobwe Road, Kampala, Uganda
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-muted-foreground">+256 39 3001630</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-muted-foreground">kiwendarehabcentre@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 mt-1 text-primary" />
                  <div>
                    <h3 className="font-bold">Opening Hours</h3>
                    <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p className="text-muted-foreground">Sat: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-3xl font-headline text-primary mb-6">Send Us a Message</h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Interactive Google Map */}
      <section className="w-full">
        <div className="container px-0 md:px-6 pb-12 md:pb-20">
          <div className="w-full h-[400px] border-0 rounded-lg overflow-hidden relative">
            <iframe
              title="Kiwenda Rehab Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`}
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
