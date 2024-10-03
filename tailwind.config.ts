import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",  // Cập nhật đường dẫn
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",  // Cập nhật đường dẫn
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // Cập nhật đường dẫn
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        checkVarPrimary: '#14317F',
        checkVarSecondary: '#2962FF',
      }
    },
  },
  plugins: [nextui()],
};
export default config;
