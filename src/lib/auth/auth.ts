import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { MONGODB_USERNAME, MONGODB_PASSWORD, APP_DB } from '$env/static/private';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

const client = new MongoClient(`mongodb://localhost:27017/${APP_DB}`, {
	authSource: 'admin',
	auth: {
		username: MONGODB_USERNAME,
		password: MONGODB_PASSWORD
	}
});
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		client
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
