import CMS from '@staticcms/core'
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
            repo: 'Greenheart/idg.tools',
            branch: 'main',
        },
        local_backend: {
            url: 'http://localhost:2030/api/v1',
        },
        // TODO: find out what to do aboout publishing mode.
        // publish_mode: 'simple',
        i18n: {
            // @ts-expect-error This enum is not possible to import - maybe report issue or find a solution
            structure: 'multiple_folders',
            locales: LOCALE_IDENTIFIERS,
            defaultLocale: DEFAULT_LOCALE_IDENTIFIER,
        },
        collections: COLLECTIONS,
    },
})

CMS.registerWidget(UniqueId)
CMS.registerWidget(UniqueSlug)
