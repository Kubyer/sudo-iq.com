import type { Handle } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const handle: Handle = async ({ event, resolve }) => {
    // Get the user ID from cookies or create a new one
    const userId = event.cookies.get('sudo_iq_user_id') || uuidv4();
    
    // If this was a new user ID, set the cookie
    if (!event.cookies.get('sudo_iq_user_id')) {
        event.cookies.set('sudo_iq_user_id', userId, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 365 // 1 year
        });
    }

    // Make userId available to all server load functions
    event.locals.userId = userId;
    return await resolve(event);
};