import { dev } from '$app/environment'

export const STORIES_ABOUT_LINK =
    'https://docs.google.com/document/d/1mGEZieTas2jCWiFz6hYPijh_cgj6RrlkBqDEb36yCf0/edit'

export const TAGLINE = 'Inner Development Goals Community - Change starts within'
export const DEFAULT_DESCRIPTION =
    'Welcome to join this emerging network of IDG Hubs who are practicing inner development to achieve sustainable development.'

export const BASE_URL = dev ? 'http://localhost:5173' : 'https://idg.community'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/images/idg-og-logo.jpg`
export const DEFAULT_OG_IMAGE_SQUARE = `${BASE_URL}/images/idg-og-logo-square.jpg`
