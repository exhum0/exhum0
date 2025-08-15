// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});

   import { defineConfig } from 'astro/config';
   import mdx from '@astrojs/mdx';

   export default defineConfig({
     integrations: [mdx()]
   });