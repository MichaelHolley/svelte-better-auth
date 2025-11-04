import { getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';

export async function requireAuth() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		error(401, { message: 'Unauthorized' });
	}

	return locals.user;
}
