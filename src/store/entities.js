import merge from 'lodash/merge'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { selections: {}, products: {}, users: {}, comments: {} }
export default function entitiesReducer (state = initialState, action) {
  return action.response && action.response.entities
    ? merge({}, state, action.response.entities)
    : state
}
