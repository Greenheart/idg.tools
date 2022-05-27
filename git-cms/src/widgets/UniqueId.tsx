import React, { FC } from 'react'
import cuid from 'cuid'
import { CmsWidgetControlProps, CmsWidgetParam } from 'netlify-cms-core'

const UniqueId: FC<CmsWidgetControlProps<string>> = ({
    value = '',
    forID,
    classNameWrapper,
}) => {
    if (!value) value = cuid()
    return (
        <input
            type="text"
            className={classNameWrapper}
            style={{
                color: '#cdcdcd',
            }}
            value={value}
            id={forID}
            disabled
        />
    )
}

const Widget = {
    name: 'uniqueId',
    controlComponent: UniqueId,
} as unknown as CmsWidgetParam<string>

export default Widget
