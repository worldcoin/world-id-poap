import { chain } from 'wagmi'

export const APP_NAME = 'dApp Starter'
export const POAP_URL_REGEX = /https?:\/\/poap.xyz\/claim\/(\w+)/i
export const CHAIN = process.env.NODE_ENV == 'production' ? chain.polygon : chain.polygonMumbai
