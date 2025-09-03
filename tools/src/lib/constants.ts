import { dev } from '$app/environment'

export const SUGGEST_NEW_TOOL_LINK =
    'https://docs.google.com/forms/d/e/1FAIpQLSdgaN8dI0-YUj5Y6_q8kKsL6aGH5RQL-qBisa9jp0gSJ7HUFg/viewform'
export const FEEDBACK_FORM_LINK =
    'https://docs.google.com/forms/d/e/1FAIpQLSeANPY1OFrQMRFHDhcYjiJ9s-kSRt8dHH5IWFhFTXkU-PH6Bw/viewform'

export const TAGLINE = 'IDG.tools - Inner Development Toolkit - Change starts within'
export const DEFAULT_DESCRIPTION =
    'IDG.tools is the open source toolkit from the Inner Development Goals (IDGs) non-profit initiative. Explore a growing library of methods, exercises and workshops to help people and organisations reach the UN Sustainable Development Goals (SDGs) through inner development.'

export const BASE_URL = dev ? 'http://localhost:5173' : 'https://idg.tools'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/images/idg-og-logo.jpg`
export const DEFAULT_OG_IMAGE_SQUARE = `${BASE_URL}/images/idg-og-logo-square.jpg`
