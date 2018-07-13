import {actionType} from '../actions/reader-center'
export const readerCenter = (
    state = {
        baseInfoConfig: {
            showPage: ['borrow']
        },
        userInfoConfig: {
            username: 'default username by redux'
        },
        myBorrowConfig: {
            password: 'default password'
        }
    },
    action
) => {
    switch (action.type) {
        case actionType.CHANGE_CONFIG:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
