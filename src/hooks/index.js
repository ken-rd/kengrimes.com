import * as cookie from 'cookie';

/** @type {App.Session} */
const emptySession = {
	access_token: '',
	token_type: '',
	user: {
		id: '',
		aud: '',
		app_metadata: {},
		user_metadata: {},
		created_at: ''
	}
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	if (cookies['sb-session']) event.locals.session = JSON.parse(cookies['sb-session']);
	return await resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
	return locals.session || emptySession;
}
