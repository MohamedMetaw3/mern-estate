import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        ws: true,
        secure: false,
        headers: {
          "Access-Control-Allow-Origin": "*",

          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
          "Access-Control-Allow-Credentials": "true",
          
        },


        
      },
    },
  },
  plugins: [react()],
  
});
