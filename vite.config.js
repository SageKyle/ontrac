import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			devOptions: { enabled: true },
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
			},
			manifest: {
				short_name: 'OnTrac',
				name: 'OnTrac Personal Manager',
				version: '1.1.0',
				icons: [
					{
						src: 'favicon.ico',
						sizes: '64x64 32x32 24x24 16x16',
						type: 'image/x-icon',
					},
					{
						src: 'android-chrome-192x192.png',
						type: 'image/png',
						sizes: '192x192',
					},
					{
						src: 'android-chrome-512x512.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'any',
					},
					{
						src: 'android-chrome-512x512.png',
						type: 'image/png',
						sizes: '512x512',
						purpose: 'maskable',
					},
				],
				start_url: '.',
				display: 'standalone',
				theme_color: '#252c53',
				background_color: '#ffffff',
			},
		}),
	],
})

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
