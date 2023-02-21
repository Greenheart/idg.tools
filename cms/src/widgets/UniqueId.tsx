import React, { FC, RefObject } from 'react'
import cuid from 'cuid'
import { CmsWidgetControlProps, CmsWidgetParam } from 'netlify-cms-core'

const BRUTAL_CSS_HACK = `[title='Add Component'] {
    display: none;
}`

const isPageWithArticleFormatting = () => {
    return ['/collections/stories'].some((path) => window.location.hash.includes(path))
}

const UniqueId: FC<CmsWidgetControlProps<string>> = React.forwardRef(
    ({ value = '', forID, classNameWrapper, onChange }, ref) => {
        if (!value) {
            value = cuid()
            onChange(value)
        }
        return (
            <>
                <input
                    type="text"
                    className={classNameWrapper}
                    style={{
                        color: '#cdcdcd',
                    }}
                    value={value}
                    id={forID}
                    ref={ref as RefObject<HTMLInputElement>}
                    disabled
                />
                {!isPageWithArticleFormatting() && (
                    <style dangerouslySetInnerHTML={{ __html: BRUTAL_CSS_HACK }} />
                )}
            </>
        )
    },
)

const Widget = {
    name: 'uniqueId',
    controlComponent: UniqueId,
} as unknown as CmsWidgetParam<string>

export default Widget
