import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    port: 5173, // change if you frontend needs to run on a different port than the default
  },
  plugins: [
    tailwindcss(),
    react(),
  ],
});
