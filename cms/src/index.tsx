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
            auth_scope: 'public_repo',
            repo: 'Greenheart/idg.tools',
            branch: 'main',
            base_url: 'https://idg-cms-oauth.vercel.app',
            open_authoring: true,
            // NOTE: This might be needed for local CMS development to work properly
            // site_domain: 'cms.idg.community'
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
