import { getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';
import { auth } from './auth';

export async function requireAuth() {
	const { locals, request } = getRequestEvent();

	const headers = request.headers;

	if (!locals.user) {
		await auth.api.signOut({ headers });
		error(401, { message: 'Unauthorized' });
	}

	return locals.user;
}
