/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        'background': 'hsl(240 10% 3.9%)',
        'foreground': 'hsl(0 0% 98%)',
        'card': 'hsl(240 10% 3.9%)',
        'card-foreground': 'hsl(0 0% 98%)',
        'popover': 'hsl(240 10% 3.9%)',
        'popover-foreground': 'hsl(0 0% 98%)',
        'primary': 'hsl(0 0% 98%)',
        'primary-foreground': 'hsl(240 5.9% 10%)',
        'secondary': 'hsl(240 3.7% 15.9%)',
        'secondary-foreground': 'hsl(0 0% 98%)',
        'muted': 'hsl(240 3.7% 15.9%)',
        'muted-foreground': 'hsl(240 5% 64.9%)',
        'accent': 'hsl(240 3.7% 15.9%)',
        'accent-foreground': 'hsl(0 0% 98%)',
        'destructive': 'hsl(0 62.8% 30.6%)',
        'destructive-foreground': 'hsl(0 0% 98%)',
        'border': 'hsl(240 3.7% 15.9%)',
        'input': 'hsl(240 3.7% 15.9%)',
        'ring': 'hsl(240 4.9% 83.9%)',
        'chart-1': 'hsl(220 70% 50%)',
        'chart-2': 'hsl(160 60% 45%)',
        'chart-3': 'hsl(30 80% 55%)',
        'chart-4': 'hsl(280 65% 60%)',
        'chart-5': 'hsl(340 75% 55%)'
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: { 
        slidein200: "slidein 1s ease 200ms forwards", 
        slidein1200: "slidein 1s ease 1200ms forwards", 
        slidein2500: "slidein 1s ease 2500ms forwards", 
        slidein3500: "slidein 1s ease 3500ms forwards", 
      },
    },
  },
  plugins: [],
};
