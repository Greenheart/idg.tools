import CMS from 'netlify-cms-app'

import { default as UniqueId } from './widgets/UniqueId'
import { default as UniqueSlug } from './widgets/UniqueSlug'

import { DEFAULT_LOCALE_IDENTIFIER, LOCALE_IDENTIFIERS } from '../../shared/constants'
import { COLLECTIONS } from './collections'

// IDEA: Maybe replace the Netlify CMS logo with IDG logo, which would be very nice

CMS.init({
    config: {
        load_config_file: false,
        editor: { preview: false },
        media_folder: '/tools/static/images',
        backend: {
            name: 'github',
            /**
             * TODO: investigate if we can use open authoring to let anyone edit and open PRs with their GitHub account
             * This requires us to add two more config fields, but is much better UX than making us into gatekeepers for who can edit or not.
             * We shouldn't have to be the gatekeepers for quick updates or edits, but rather for publishing the changes.
             *
             // auth_type: 'pkce', // this is a client side auth
             // app_id: '<string from GitHub / GitLab app config>'
             */
            repo: 'Greenheart/idg.tools',
            branch: 'main',
            base_url: 'https://idg-cms-oauth.vercel.app',
        },
        local_backend: {
            url: 'http://localhost:2030/api/v1',
        },
        publish_mode: 'simple',
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
