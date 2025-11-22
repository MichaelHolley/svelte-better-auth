import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import Database from 'better-sqlite3';

export const auth = betterAuth({
	database: new Database('db.sqlite'),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
