import { requireAuth } from '$lib/auth/auth-validation';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const user = requireAuth();
	return { success: true, message: `User was authenticated - ${user!.id}` };
};
