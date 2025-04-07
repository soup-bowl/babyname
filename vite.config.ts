import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
			manifest: {
				short_name: "Baby Names",
				name: "baby Name Generator",
				icons: [
					{
						src: "favicon.ico",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "logo-mask-192.png",
						type: "image/png",
						sizes: "192x192",
					},
					{
						src: "logo-mask-512.png",
						type: "image/png",
						sizes: "512x512",
					},
				],
				start_url: ".",
				display: "standalone",
				theme_color: "#000000",
				background_color: "#a8fbff",
			},
		}),
	],
	base: "",
	server: {
		host: true,
		port: 3000,
	},
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
