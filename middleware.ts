import { auth } from '@/auth';
import { DEFAULT_PAGE_REDIRECT, HOME_PAGE, PRIVATE_ROUTES } from './lib/constants/route';
import { NextResponse } from 'next/server';

export default auth((request) => {
    const isAuth = !!request.auth;
    const { pathname } = request.nextUrl;

    const isPrivateRoute = PRIVATE_ROUTES.includes(pathname);

    if (isPrivateRoute && !isAuth) {
        return NextResponse.redirect(new URL(HOME_PAGE, request.url));
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
