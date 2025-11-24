import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
    {
      question: "What should I bring to my first appointment?",
      answer: "Please bring any previous medical documents, X rays or CT scans and a patient card for former patients."
    },
    {
      question: "How long will each session last?",
      answer: "Typically, a session lasts between 40 to 60 minutes, depending on your specific condition and treatment plan."
    },
    {
      question: "Do you accept my insurance?",
      answer: "We currectly do not accept insurance, we allow cash and mobile money payments."
    },
    {
      question: "What if I need to cancel or reschedule an appointment?",
      answer: "We understand that life happens. We kindly request at least 24 hours' notice for any cancellations or rescheduling. This allows us to offer the time slot to another patient in need. A fee may be charged for late cancellations or no-shows."
    },
    {
      question: "How is my progress measured?",
      answer: "We use standard outcome measures and functional assessment to measure progress"
    }
];

export default function PatientResourcesPage() {
  return (
    <>
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-headline">Patient Resources</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-foreground/80">
            Information to help you prepare for your visit and answer common questions.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-headline text-primary mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
