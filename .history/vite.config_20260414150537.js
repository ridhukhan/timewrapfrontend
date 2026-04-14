import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Kalurghat APP",
        short_name: "Kalurghat",
        description: "Modern Social Media App built with React and Node.js",
        theme_color: "#0ea5e9",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/kalurghat.jpeg",
            sizes: "192x192",
            type: "image/jpeg"
          },
          {
            src: "/kalurghat.jpeg",
            sizes: "512x512",
            type: "image/jpeg"
          }
        ]
      }
    })
  ]
});