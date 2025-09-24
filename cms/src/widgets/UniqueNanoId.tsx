import React, { FC, RefObject } from 'react'
import { CmsWidgetControlProps, CmsWidgetParam } from 'netlify-cms-core'
import { customAlphabet } from 'nanoid'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 3)

const UniqueNanoId: FC<CmsWidgetControlProps<string>> = React.forwardRef(
    ({ value = '', forID, classNameWrapper, onChange }, ref) => {
        if (!value) {
            value = nanoid()
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
    name: 'uniqueNanoId',
    controlComponent: UniqueNanoId,
} as unknown as CmsWidgetParam<string>

export default Widget
