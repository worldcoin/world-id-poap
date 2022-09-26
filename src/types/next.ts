import { NextApiRequest as BaseRequest, NextApiResponse } from 'next'

export interface NextApiRequest<
	B = unknown,
	Q extends {
		[key: string]: string | string[]
	} = {
		[key: string]: string | string[]
	}
> extends BaseRequest {
	query: Q
	body: B
}

export type { NextApiResponse }
