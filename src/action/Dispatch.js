import { ADD_USER } from "../helper/type"
import { LOGOUT } from "../helper/type"
import { BODY } from "../helper/type"
//dispatch
export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  }
}
export const Logout = () => {
  return {
    type: LOGOUT,

  }
}
export const ContentBody = (show) => {
  return {
    type: BODY,
    payload: show,
  }
}