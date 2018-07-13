import {actionType} from "../actions/base-info"

export const baseInfo = (
    state = {
        isFetching: false,
        items: []
    },
    action
) => {
    switch (action.type) {
        case actionType.TOGGLE_APP_SHOW:
            const newState = {...state}
            const items = newState.items.map(app => {
                const {name, isShow} = action.payload
                const {name: appName} = app
                return appName === name ?
                    {
                        ...app,
                        show: isShow
                    }
                    :
                    {...app}
            })
            return {
                ...newState,
                items
            }
        case actionType.FETCH_APPS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case actionType.FETCH_APPS_RECEIVE:
            return {
                ...state,
                isFetching: false,
                items: action.payload
            }
        default:
            return state
    }
}
