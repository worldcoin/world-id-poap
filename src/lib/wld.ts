import { utils } from '@worldcoin/id'
import { Poap } from '@prisma/client'

export const getActionId = (poap: Poap): string => {
	return utils.worldIDHash(`${process.env.NEXT_PUBLIC_WLD_ACTION}${poap.slug}`).digest
}
