import React from 'react'
import HomePage from '../containers/app-container'

export const withHomeContainer = Component => (
    <HomePage>
        <Component />
    </HomePage>
)
