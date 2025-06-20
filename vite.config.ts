import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  base: 'User-profile-management-app/',
  plugins: [
    tailwindcss(),
    react(), 
    svgr({
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    }),
    ]
})
