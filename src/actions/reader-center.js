export const actionType = {
    // CHANGE_BASE_INFO: "CHANGE_BASE_INFO",
    // CHANGE_USER_INFO: "CHANGE_USER_INFO",
    // CHANGE_MY_BORROW: "CHANGE_MY_BORROW",
    CHANGE_CONFIG: 'CHANGE_CONFIG'
}

// export const changeBaseInfo = (config) => ({
//     type: actionType.CHANGE_BASE_INFO,
//     payload: config
// })
//
// export const changeUserInfo = (config) => ({
//     type: actionType.CHANGE_USER_INFO,
//     payload: config
// })
//
// export const changeMyBorrow = (config) => ({
//     type: actionType.CHANGE_MY_BORROW,
//     payload: config
// })

export const changeConfig = config => ({
    type: actionType.CHANGE_CONFIG,
    payload: config
})
