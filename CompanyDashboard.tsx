@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
}

@layer base {
  html {
    -webkit-tap-highlight-color: transparent;
  }
  body {
    @apply text-slate-900 transition-colors duration-300 min-h-screen;
    background-color: #f8fafc;
    background-image: 
      radial-gradient(at 40% 20%, hsla(228,100%,74%,0.4) 0px, transparent 50%),
      radial-gradient(at 80% 0%, hsla(189,100%,56%,0.4) 0px, transparent 50%),
      radial-gradient(at 0% 50%, hsla(355,100%,93%,0.4) 0px, transparent 50%);
    background-attachment: fixed;
  }
  
  .dark body {
    @apply text-slate-50;
    background-color: #0f172a;
    background-image: 
      radial-gradient(at 40% 20%, hsla(228,100%,74%,0.15) 0px, transparent 50%),
      radial-gradient(at 80% 0%, hsla(189,100%,56%,0.15) 0px, transparent 50%),
      radial-gradient(at 0% 50%, hsla(355,100%,93%,0.1) 0px, transparent 50%);
  }
}

@layer components {
  .glass {
    @apply bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/80 shadow-lg;
  }
  .glass-panel {
    @apply bg-white/50 dark:bg-slate-800/70 backdrop-blur-md border border-white/30 dark:border-slate-700/60 rounded-2xl;
  }
  .glass-input {
    @apply w-full bg-white/60 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400;
  }
  .glass-button {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95;
  }
}

/* Hide scrollbar for clean UI */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-slate-700 rounded-full;
}
