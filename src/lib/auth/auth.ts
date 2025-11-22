import { getRequestEvent } from '$app/server';
import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import Database from 'better-sqlite3';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
	database: new Database('db.sqlite'),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true
	},
	socialProviders: {
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
