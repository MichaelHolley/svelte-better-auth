import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';

export async function requireAuth() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		redirect(307, '/');
	}

	return locals.user;
}
