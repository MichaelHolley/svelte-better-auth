import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import {
	BETTER_AUTH_USERNAME,
	BETTER_AUTH_PASSWORD,
	BETTER_AUTH_DATABASE
} from '$env/static/private';

const client = new MongoClient(`mongodb://localhost:27017/${BETTER_AUTH_DATABASE}`, {
	authSource: 'admin',
	auth: {
		username: BETTER_AUTH_USERNAME,
		password: BETTER_AUTH_PASSWORD
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
	}
});
