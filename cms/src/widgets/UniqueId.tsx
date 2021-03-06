import React, { FC, RefObject } from 'react'
import cuid from 'cuid'
import { CmsWidgetControlProps, CmsWidgetParam } from 'netlify-cms-core'

const UniqueId: FC<CmsWidgetControlProps<string>> = React.forwardRef(
    ({ value = '', forID, classNameWrapper, onChange }, ref) => {
        if (!value) {
            value = cuid()
            onChange(value)
        }
        return (
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
        )
    },
)

const Widget = {
    name: 'uniqueId',
    controlComponent: UniqueId,
} as unknown as CmsWidgetParam<string>

export default Widget
