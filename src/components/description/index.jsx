import React from 'react'
import style from './index.styl'

export default ({text}) => (
    <div className={style.description} title={text}>
        {text}
    </div>
)
