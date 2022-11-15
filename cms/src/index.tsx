import CMS from 'netlify-cms-app'

import { default as UniqueId } from './widgets/UniqueId'
import { default as UniqueSlug } from './widgets/UniqueSlug'

import { DEFAULT_LANGUAGE_TAG, LANGUAGE_TAGS } from '../../shared/constants'
import { COLLECTIONS } from './collections'

CMS.init({
    config: {
        load_config_file: false,
        editor: { preview: false },
        // TODO: Need to find a solution to avoid duplicating images across multiple sites.
        // Ideally we can store all images in content/static/images and copy them to tools and community when building.
        // This way, the CMS can store all images in one place, organized based on which project uses them.
        // IDEA: Maybe hide the global media library from the navigation to avoid confusion.
        media_folder: '/tools/static/images',
        backend: {
            name: 'github',
            repo: 'Greenheart/idg.tools',
            branch: 'main',
            open_authoring: true,
        },
        local_backend: {
            url: 'http://localhost:2030/api/v1',
        },
        publish_mode: 'editorial_workflow',
        i18n: {
            structure: 'single_file',
            locales: LANGUAGE_TAGS,
            default_locale: DEFAULT_LANGUAGE_TAG,
        },
        collections: COLLECTIONS,
    },
})

CMS.registerWidget(UniqueId)
CMS.registerWidget(UniqueSlug)
