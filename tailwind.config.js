/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(15rem, 1fr))"
      },
      fontFamily: {
        lobster: ['var(--font-lobster)'],
        roboto: ['var(--font-roboto)']
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#134e4a",
          "primary-focus": "#042f2e",
          "primary-content": "#ffffff",
          "base-200": "#ffffff",
          "base-100": "#f3f4f6"
          
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "primary": "#0f766e",
          "primary-focus": "#134e4a",
          "base-content": "#ffffff"
        },
      }, 
    ],
  
  }
}
