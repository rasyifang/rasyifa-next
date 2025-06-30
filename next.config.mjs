/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
5. File Konfigurasi postcss.config.jsFile konfigurasi tambahan untuk CSS.Nama File: postcss.config.jsKonten:module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
