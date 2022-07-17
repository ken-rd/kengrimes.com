import { browser, server } from '$app/env';
import { createClient } from '@supabase/supabase-js';
import cookie from 'js-cookie';

/** @type {App.Session} */
export const emptySession = {
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

/** @type {import('@supabase/supabase-js').SupabaseClientOptions} */
const supabaseOpts = {};

/** @type {import('js-cookie').CookieAttributes} */
const cookieOpts = {
	sameSite: 'strict',
	secure: true
};

function restoreSession() {
	const storedSession = window.localStorage.getItem('supabase.auth.token');
	const cookieSession = cookie.get('sb-session');

	/** @type {App.Session | null} */
	const restoredSession = storedSession
		? JSON.parse(storedSession)?.currentSession
		: cookieSession
		? JSON.parse(cookieSession)
		: null;

	if (restoredSession) {
		if (!storedSession && cookieSession)
			window.localStorage.setItem(
				'supabase.auth.token',
				`{"currentSession":${cookieSession},"expiresAt":${restoredSession.expires_at}}`
			);
	}

	return restoredSession;
}

export const restoredSession = browser ? restoreSession() : null;

/** Store a copy of the sb-session in a cookie, for SSR
 * @param {import('@supabase/supabase-js').AuthChangeEvent} event
 * @param {import('@supabase/supabase-js').Session | null} session
 */
function updateSessionCookies(event, session) {
	if (event === 'SIGNED_OUT') cookie.remove('sb-session');
	else cookie.set('sb-session', JSON.stringify(session), cookieOpts);
};

/** Bind the supabase session to a writable store
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase 
 * @param {import('svelte/store').Writable<App.Session>} writable 
 */
export function bindSession(supabase, writable) {
	supabase.auth.onAuthStateChange((event, session) => {
		if (session) writable.set(session)
		else writable.set(emptySession)
		updateSessionCookies(event, session)
	})
}

/** Create a supabase client with an auth listener
 * @param {App.Session} session
 */
export function loadClient(session) {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY,
		supabaseOpts
	);
	if (server || restoredSession) supabase.auth.setAuth(session.access_token);
	supabase.auth.onAuthStateChange(updateSessionCookies)

	return supabase;
}
