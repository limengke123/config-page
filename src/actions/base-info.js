import {axios} from '../util'


export const actionType = {
    TOGGLE_APP_SHOW: 'TOGGLE_APP_SHOW',
    FETCH_APPS_REQUEST: 'FETCH_APPS_REQUEST',
    FETCH_APPS_RECEIVE: 'FETCH_APPS_RECEIVE',
}

// export const toggleAppShow = payload => ({
//     type: actionType.TOGGLE_APP_SHOW,
//     payload: payload
// })

export const toggleAppShow = () => dispatch => {
    return axios.post('/apps', {
        apps: [
            {
                "name": "readerCenter",
                "show": true,
                "id": 1
            },
            {
                "name": "opac",
                "show": true,
                "id": 2
            },
            {
                "name": "bookDetail",
                "show": true,
                "id": 3
            },
            {
                "name": "bookRecommend",
                "show": true,
                "id": 4
            }
        ]
    })
}

const fetchAppsRequest = () => ({
    type: actionType.FETCH_APPS_REQUEST
})

const fetchAppsReceive = (data) => ({
    type: actionType.FETCH_APPS_RECEIVE,
    payload: data
})

export const fetchApps = () => dispatch => {
    dispatch(fetchAppsRequest())
    return axios.get('/apps')
        .then(resp => resp.data)
        .then(data => dispatch(fetchAppsReceive(data)))
}
