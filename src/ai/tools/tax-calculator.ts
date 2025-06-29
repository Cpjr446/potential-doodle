'use server';
/**
 * @fileOverview A tool to calculate estimated US income taxes.
 *
 * - taxCalculatorTool - A Genkit tool for tax estimation.
 * - calculateTaxes - A wrapper function to call the tax calculation prompt.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TaxCalculatorOutputSchema = z.object({
  grossAnnualIncome: z.number().describe("The gross annual income provided."),
  estimatedFederalTaxes: z.number().describe("The estimated federal taxes for the year."),
  estimatedStateTaxes: z.number().describe("The estimated state taxes for the year. Assume an average US state tax rate if not specified."),
  totalEstimatedTaxes: z.number().describe("The total sum of federal and state taxes."),
  netAnnualIncome: z.number().describe("The net income after all estimated taxes."),
  netMonthlyIncome: z.number().describe("The net monthly income after taxes."),
});

const taxCalculatorPrompt = ai.definePrompt({
    name: 'taxCalculatorPrompt',
    model: 'googleai/gemini-1.5-flash',
    input: { schema: z.object({ annualSalary: z.number() }) },
    output: { schema: TaxCalculatorOutputSchema },
    prompt: `You are a tax calculation expert. Based on the provided annual salary of {{{annualSalary}}} USD, calculate the estimated US income taxes for a single filer.
    
    Use current US federal tax brackets. For state taxes, use an average rate of 5% as a reasonable estimate.
    
    Provide a breakdown of the estimated federal taxes, state taxes, total taxes, net annual income, and net monthly income.
    
    Return the result ONLY in the requested JSON format.`,
});

export const taxCalculatorTool = ai.defineTool(
  {
    name: 'taxCalculatorTool',
    description: 'Calculates estimated US federal and state income taxes for a single filer given an annual salary. Use this to determine net income from a gross salary.',
    inputSchema: z.object({
      annualSalary: z.number().describe('The gross annual salary in USD.'),
    }),
    outputSchema: TaxCalculatorOutputSchema,
  },
  async ({ annualSalary }) => {
    const { output } = await taxCalculatorPrompt({ annualSalary });
    return output!;
  }
);

export async function calculateTaxes(annualSalary: number) {
    const { output } = await taxCalculatorPrompt({ annualSalary });
    return output!;
}
