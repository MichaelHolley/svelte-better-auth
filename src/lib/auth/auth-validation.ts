import { getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';

export function requireAuth() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		// TODO signout and delete cookie
		error(401, { message: 'Unauthorized' });
	}

	return locals.user;
}
