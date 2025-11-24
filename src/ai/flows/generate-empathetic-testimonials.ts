'use server';

/**
 * @fileOverview Generates empathetic patient testimonials based on service or recovery data.
 *
 * - generateEmpatheticTestimonials - A function that generates patient testimonials.
 * - GenerateEmpatheticTestimonialsInput - The input type for the generateEmpatheticTestimonials function.
 * - GenerateEmpatheticTestimonialsOutput - The return type for the generateEmpatheticTestimonials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmpatheticTestimonialsInputSchema = z.object({
  service: z.string().describe('The specific service received by the patient (e.g., Lymphedema Management, Stroke & Brain Injury Therapy).'),
  recoveryData: z.string().describe('Detailed information about the patient’s recovery journey, including challenges, progress, and outcomes.'),
});
export type GenerateEmpatheticTestimonialsInput = z.infer<typeof GenerateEmpatheticTestimonialsInputSchema>;

const GenerateEmpatheticTestimonialsOutputSchema = z.object({
  testimonial: z.string().describe('An empathetic and compelling patient testimonial reflecting the recovery experience.'),
});
export type GenerateEmpatheticTestimonialsOutput = z.infer<typeof GenerateEmpatheticTestimonialsOutputSchema>;

export async function generateEmpatheticTestimonials(input: GenerateEmpatheticTestimonialsInput): Promise<GenerateEmpatheticTestimonialsOutput> {
  return generateEmpatheticTestimonialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmpatheticTestimonialsPrompt',
  input: {schema: GenerateEmpatheticTestimonialsInputSchema},
  output: {schema: GenerateEmpatheticTestimonialsOutputSchema},
  prompt: `You are a content writer specializing in creating empathetic and heartfelt patient testimonials for a rehabilitation center.

  Based on the service provided and the patient's recovery data, generate a testimonial that reflects the patient's genuine experience, emotional journey, and the positive impact of the rehabilitation center.

  Service Provided: {{{service}}}
  Recovery Data: {{{recoveryData}}}

  Testimonial:`,
});

const generateEmpatheticTestimonialsFlow = ai.defineFlow(
  {
    name: 'generateEmpatheticTestimonialsFlow',
    inputSchema: GenerateEmpatheticTestimonialsInputSchema,
    outputSchema: GenerateEmpatheticTestimonialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
