import CMS from 'netlify-cms-app'

import { default as UniqueCuid } from './widgets/UniqueCuid'
import { default as UniqueNanoId } from './widgets/UniqueNanoId'
import { default as UniqueSlug } from './widgets/UniqueSlug'
import { COLLECTIONS } from './collections'

import {
    COLORS,
    DEFAULT_LOCALE_IDENTIFIER,
    FRAMEWORK_AVAILABLE_LOCALES,
    IDG_COLORS_RGB,
} from '../../shared/constants'

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
            // Default locale config:
            locales: FRAMEWORK_AVAILABLE_LOCALES as unknown as string[],
            default_locale: DEFAULT_LOCALE_IDENTIFIER,

            // NOTE: When editing translations, it's very useful to only enable the locales you want to edit
            // This reduces the number of entries to choose from and makes it easier to select the desired locales
            // TIP: It's also worth disabling the fields you don't need to edit from for example the `skills` and `dimensions` collections
            // ...((currentlyEditing: import('../../shared/types').Locale = 'pt-BR') => ({
            //     locales: [currentlyEditing, DEFAULT_LOCALE_IDENTIFIER],
            //     default_locale: currentlyEditing,
            // }))
        },
        collections: COLLECTIONS,
    },
})

CMS.registerWidget(UniqueCuid)
CMS.registerWidget(UniqueNanoId)
CMS.registerWidget(UniqueSlug)

// TODO: See if the logo can be customised directly by using the Decap CMS config instead
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

const collectionsWithCustomColorsRegex = /skills|dimensions$/

/**
 * Override colors for IDG Framework entries to make them easier to distinguish
 *
 * Dynamically add custom classes based on the latest IDG color constants, and known ID:s of skills and dimensions.
 *
 * By using predefined CSS selectors rather than classes, the styling is applied even across re-renders of the React CMS SPA.
 */
function initIDGColors() {
    const stylesheet = document.createElement('style')
    let cssContent = ''

    for (const [id, dimensionSlug] of Object.entries(COLORS)) {
        const color = IDG_COLORS_RGB[dimensionSlug]
        cssContent += `
a[href$='${id}'] {
  background: ${color};
  &:hover {
    background: ${color}cc;
  }
}
`
    }

    stylesheet.textContent = cssContent
    document.head.appendChild(stylesheet)
}

/**
 * Enable or disable the IDG custom colors for collection entries depending on the current page URL.
 *
 * This allows us to override colors for IDG Framework entries to make them easier to distinguish
 */
function toggleIDGColorsForCollectionEntries(url: string) {
    // By toggling a class and using CSS to customise styles rather than JS,
    // the behaviour is much more stable and the rendering performance is much better as well
    // The class survives across re-renders of the React CMS SPA, which lets us avoid re-applying styling every time React re-renders.
    document.body.classList.toggle('idg-framework', collectionsWithCustomColorsRegex.test(url))
}

async function applyCustomisations() {
    replaceLogo()
    initIDGColors()

    toggleIDGColorsForCollectionEntries(location.hash)

    window.addEventListener('hashchange', (event) => {
        toggleIDGColorsForCollectionEntries(event.newURL)
    })

    // IDEA: It would be posible to add a dropdown button to allow users to set thier preferred default locale
    // Might be useful to simplify community translations
    // To implement this, we could save the preferred defaultLocale to localStorage,
    // and then reload the CMS app to restart with the preferred default locale.
}

document.addEventListener('DOMContentLoaded', applyCustomisations)
