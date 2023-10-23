import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "./assets/cards/1.png",
        "./assets/cards/2.png",
        "./assets/cards/3.png",
        "./assets/cards/4.png",
        "./assets/cards/5.png",
        "./assets/cards/6.png",
        "./assets/cards/7.png",
        "./assets/cards/8.png",
        "./assets/cards/9.png",
        "./assets/cards/10.png",
        "./assets/cards/11.png",
        "./assets/cards/12.png",
        "./assets/cards/13.png",
        "./assets/cards/14.png",
        "./assets/cards/15.png",
        "./assets/cards/16.png",
        "./assets/cards/17.png",
        "./assets/cards/18.png",
        "./assets/cards/19.png",
        "./assets/cards/20.png",
        "./assets/cards/21.png",
        "./assets/cards/22.png",
        "./assets/cards/back.png",
      ], // <== you can include other assets
      manifest: {
        name: "Tarot Card App",
        short_name: "Tarot App",
        description: "An app for Tarot Card Reading",
        theme_color: "#ffffff",
        icons: [
          {
            src: "path-to-your-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "path-to-your-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*"], // Adjust accordingly for your files
      },
    }),
  ],
});
