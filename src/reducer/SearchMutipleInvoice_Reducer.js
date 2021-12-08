
import { ADD_USER } from "../helper/type"
import { LOGOUT } from "../helper/type"
import { BODY } from "../helper/type"

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user , show: true}
    : { isLoggedIn: false, user: null , show: true};

export default (state = initialState, action) => {
    switch (action.type) {

        case ADD_USER:
            return {
                ...state, isLoggedIn: true, user: JSON.parse(action.payload)
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case BODY:
            return {
                ...state,
                show :  action.payload
            };
        default:
            return state
    }
}