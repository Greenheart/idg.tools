import CMS from 'netlify-cms-app'

import { default as UniqueId } from './widgets/UniqueId'
import { default as UniqueSlug } from './widgets/UniqueSlug'

import { DEFAULT_LOCALE_IDENTIFIER, LOCALE_IDENTIFIERS } from '../../shared/constants'
import { COLLECTIONS } from './collections'

CMS.init({
    config: {
        load_config_file: false,
        editor: { preview: false },
        media_folder: '/tools/static/images',
        backend: {
            name: 'github',
            auth_scope: 'public_repo',
            repo: 'Greenheart/idg.tools',
            branch: 'main',
            base_url: 'https://idg-cms-oauth.vercel.app',
            open_authoring: true,
        },
        local_backend: {
            url: 'http://localhost:2030/api/v1',
        },
        publish_mode: 'editorial_workflow',
        i18n: {
            structure: 'multiple_folders',
            locales: LOCALE_IDENTIFIERS,
            default_locale: DEFAULT_LOCALE_IDENTIFIER,
        },
        collections: COLLECTIONS,
    },
})

CMS.registerWidget(UniqueId)
CMS.registerWidget(UniqueSlug)

const replaceLogo = () => {
    const styles = document.querySelector('#idg-overrides') as HTMLStyleElement
    if (styles) {
        // Since we don't know how long the React app takes to load and initialize,
        // we run an interval during page load to show the IDG logo and login button as soon as possible
        const interval = window.setInterval(() => {
            const container = document.querySelector('section > span') as HTMLSpanElement
            if (container) {
                window.clearInterval(interval)
                // Remove default logo
                container.firstElementChild!.remove()

                container.style.display = 'flex'
                container.style.alignItems = 'center'
                const img = document.createElement('img')
                img.src = '/IDG-logo.svg'
                img.onload = () => {
                    // Show the IDG logo and the login button at the same moment
                    styles!.sheet!.deleteRule(0)
                }
                container.prepend(img)
            }
        }, 30)
    }
}

document.addEventListener('DOMContentLoaded', replaceLogo)
