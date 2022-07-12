import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
	event.locals.jwt = jwt ? JSON.parse(jwt) : null;
	return await resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
	return { 
		email: locals.jwt?.user.email
	}
}
