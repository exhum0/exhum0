import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tag: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
