import { sveltekit } from '@sveltejs/kit/vite';
import WindiCSS from 'vite-plugin-windicss';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(),WindiCSS()],
	server: {
		port: 3000
	}
};

export default config;
