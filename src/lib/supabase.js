import { browser, server } from '$app/env';
import { createClient } from '@supabase/supabase-js';
import cookie from 'js-cookie';

/** @type {import('@supabase/supabase-js').SupabaseClientOptions} */
const supabaseOpts = {};

/** @type {import('js-cookie').CookieAttributes} */
const cookieOpts = {
	sameSite: 'strict'
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
		console.log('restored session', restoredSession);
	}

    return restoredSession
}

export const restoredSession = browser ? restoreSession() : null

/** @param {App.Session} session */
export function loadClient(session) {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY,
		supabaseOpts
	);
	if (session.access_token !== '') supabase.auth.setAuth(session.access_token);

    /** @type {App.SessionUpdateCallback} */
    let authCallback = _ => {};

	if (browser) {

		supabase.auth.onAuthStateChange(
			/** Store a copy of the sb-session in a cookie, for SSR
			 * @param {import('@supabase/supabase-js').AuthChangeEvent} event
			 * @param {import('@supabase/supabase-js').Session | null} authSession
			 */
			(event, authSession) => {
				console.log('auth state changed', event, authSession);
				if (authSession) authCallback(authSession);
				if (event === 'SIGNED_OUT') cookie.remove('sb-session');
				else cookie.set('sb-session', JSON.stringify(authSession), cookieOpts);
			}
		);
	}

    /** @param {App.SessionUpdateCallback} callback */
	function onSessionUpdate(callback) {
        authCallback = callback        
    }

    return { supabase, onSessionUpdate };
}
