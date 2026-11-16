/**
 * Schemas for dates on historical records.
 * Historical material often has unknown or approximate dates — this is
 * modelled explicitly rather than stored as fabricated dates.
 */
import { z } from 'zod';
import { DATE_PRECISIONS } from './constants';

export const historicalDateSchema = z
  .object({
    datePrecision: z.enum(DATE_PRECISIONS),
    /** Inclusive start year, e.g. 1983. */
    yearFrom: z.number().int().min(1850).max(2100).optional(),
    /** Inclusive end year, only meaningful for RANGE precision. */
    yearTo: z.number().int().min(1850).max(2100).optional(),
  })
  .refine((d) => d.datePrecision !== 'YEAR' || d.yearFrom !== undefined, {
    message: 'A year is required when precision is YEAR',
  })
  .refine((d) => d.datePrecision !== 'RANGE' || (d.yearFrom !== undefined && d.yearTo !== undefined), {
    message: 'yearFrom and yearTo are required when precision is RANGE',
  })
  .refine(
    (d) => d.yearFrom === undefined || d.yearTo === undefined || d.yearTo >= d.yearFrom,
    { message: 'yearTo must be greater than or equal to yearFrom' },
  );
export type HistoricalDate = z.infer<typeof historicalDateSchema>;

export const slugSchema = z
  .string()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers and hyphens only');

export const emailSchema = z.string().trim().toLowerCase().email('Enter a valid email address');
