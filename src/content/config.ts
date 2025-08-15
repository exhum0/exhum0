import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    image: z.string().optional(),
    lang: z.enum(["ru", "eng"]), // чтобы пост знал свой язык
  }),
});

export const collections = {
  blog,
};
