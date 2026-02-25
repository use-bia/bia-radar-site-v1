import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
		}),
		devtools(),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		viteStaticCopy({
			targets: [
				{
					src: "CNAME",
					dest: "./",
				},
			],
		}),
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		viteReact(),
		svgr(),
	],
	define: {
		__CONTACT_API_URL__: JSON.stringify(
			"https://script.google.com/macros/s/AKfycbzoWBo9OnhwwS6p4kidnTOWkjM7bVqeGRPmBAMS3882S3Rn2L-kK4NJ5A8hA4oMf2TJ/exec",
		),
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"phone-input": ["react-phone-number-input"],
					framework: ["react", "react-dom", "@tanstack/react-router"],
				},
			},
		},
	},
});

export default config;
