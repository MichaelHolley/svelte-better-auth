import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { success: true, message: 'This is an anonymous page accessible to all users.' };
};
