import { NextApiHandler } from 'next'
import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

const sessionOptions: IronSessionOptions = {
	password: process.env.APP_KEY,
	ttl: 3600 * 24 * 30, // 1 month
	cookieName: 'wid_poap_session',
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
}

export const withSession = (handler: NextApiHandler) => withIronSessionApiRoute(handler, sessionOptions)
