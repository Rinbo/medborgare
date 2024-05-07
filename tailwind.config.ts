import { type Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    //@ts-ignore automatic type derivation not working properly
    daisyui,
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
    ],
  },
} satisfies Config;
