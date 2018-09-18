const initialState = {
  user: {},
  wpr: null
}

const GET_USER_DATA = 'GET_USER_DATA'
const GET_WPR = 'GET_WPR'

export function getUserData(data){
    return{
        type: GET_USER_DATA,
        payload: data
    }
}

export function getWpr(wpr){
    return{
        type: GET_WPR,
        payload: wpr
    }
}
export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_USER_DATA: {
            return Object.assign({}, state, {user: action.payload})
        }
        case GET_WPR: {
            return Object.assign({}, state, {wpr: action.payload})
        }
        
        default:
        return state
    }
}