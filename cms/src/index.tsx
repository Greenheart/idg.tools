import CMS from 'netlify-cms-app'
import { CmsMediaLibrary } from 'netlify-cms-core'

import { default as UniqueId } from './widgets/UniqueId'
import { default as UniqueSlug } from './widgets/UniqueSlug'

import { DEFAULT_LANGUAGE_TAG, LANGUAGE_TAGS } from '../../shared/constants'
import { COLLECTIONS } from './collections'

// HACK: https://github.com/netlify/netlify-cms/issues/1702#issuecomment-619564904
CMS.registerMediaLibrary({
    name: 'disabled',
    init: () => ({ show: () => undefined, enableStandalone: () => false }),
} as CmsMediaLibrary)

CMS.init({
    config: {
        load_config_file: false,
        editor: { preview: false },
        media_library: { name: 'disabled' },
        // media_folder: '/tools/static/images',
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
