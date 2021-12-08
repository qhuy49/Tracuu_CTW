import { combineReducers } from "redux"
import SearchMutipleInvoice_Reducer from "./SearchMutipleInvoice_Reducer"

const allReducers = combineReducers({
  user: SearchMutipleInvoice_Reducer,
})

export default allReducers