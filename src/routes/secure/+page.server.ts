import { requireAuth } from '$lib/auth/auth-validation';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const user = await requireAuth();
	return { success: true, message: `User was authenticated - ${user!.id}` };
};
