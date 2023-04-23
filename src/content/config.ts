import { z, defineCollection } from 'astro:content';

const protocolCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  'protocol': protocolCollection,
};