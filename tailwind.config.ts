import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			fontFamily: {
				inter: ["var(--inter)"],
				lobster: ["var(--lobster)"],
				great_vibes: ["var(--great_vibes)", "cursive"],
				heading: ["var(--heading_font)"],
				script: ["var(--style_script)"],
			},

			animation: {
				text: "text 5s ease infinite",
			},

			keyframes: {
				text: {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/container-queries")],
};
export default config;
