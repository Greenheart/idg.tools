/*
Welcome to the auth file! Here we have put a config to do basic auth in Keystone.

`createAuth` is an implementation for an email-password login out of the box.
`statelessSessions` is a base implementation of session logic.

For more on auth, check out: https://keystonejs.com/docs/apis/auth#authentication-api
*/

import { createAuth } from '@keystone-6/auth'

// See https://keystonejs.com/docs/apis/session#session-api for the session docs
import { statelessSessions } from '@keystone-6/core/session'

let sessionSecret = process.env.SESSION_SECRET

// Here is a best practice! It's fine to not have provided a session secret in dev,
// however it should always be there in production.
if (!sessionSecret) {
    if (process.env.NODE_ENV === 'production') {
        throw new Error(
            'The SESSION_SECRET environment variable must be set in production',
        )
    } else {
        sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --'
    }
}

export enum UserRole {
    EDITOR = 'editor',
    REVIEWER = 'reviewer',
    ADMIN = 'admin',
}

const ORDERED_ROLES = [UserRole.EDITOR, UserRole.REVIEWER, UserRole.ADMIN]

export type Session = {
    data: {
        id: string
        role: UserRole
    }
}

type AuthGuard = ({ session }: { session: Session }) => boolean

export const isAdmin: AuthGuard = ({ session }) =>
    session?.data.role === UserRole.ADMIN

export const hasPermission: (minimumRole: UserRole) => AuthGuard =
    (minimumRole) =>
    ({ session }) => {
        if (!session?.data?.role) return false
        return (
            ORDERED_ROLES.indexOf(session?.data?.role) >=
            ORDERED_ROLES.indexOf(minimumRole)
        )
    }

// Here we define how auth relates to our schemas.
// What we are saying here is that we want to use the list `User`, and to log in
// we will need their email and password.
const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    sessionData: 'id role',
    secretField: 'password',
    initFirstItem: {
        // If there are no items in the database, keystone will ask you to create
        // a new user, filling in these fields.
        fields: ['name', 'email', 'password'],
        itemData: {
            role: UserRole.ADMIN,
        },
    },
})

// This defines how long people will remain logged in for.
// This will get refreshed when they log back in.
const sessionMaxAge = 60 * 60 * 24 * 30 * 3 // 90 days

// This defines how sessions should work. For more details, check out: https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
    maxAge: sessionMaxAge,
    secret: sessionSecret,
})

export { withAuth, session }
