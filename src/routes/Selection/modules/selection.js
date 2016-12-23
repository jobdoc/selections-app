import { CALL_API, Schemas } from 'middleware/api'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_SELECTION_REQUEST = 'FETCH_SELECTION_REQUEST'
export const FETCH_SELECTION_FAILURE = 'FETCH_SELECTION_FAILURE'
export const FETCH_SELECTION_SUCCESS = 'FETCH_SELECTION_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

const fetchSelection = () => ({
  [CALL_API]: {
    types: [FETCH_SELECTION_REQUEST, FETCH_SELECTION_SUCCESS, FETCH_SELECTION_FAILURE],
    endpoint: 'getSelections',
    schema: Schemas.SELECTION_ARRAY
  }
})

export const loadSelection = () => (dispatch) => {
  return dispatch(fetchSelection())
}

export const actions = {
  loadSelection
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SELECTION_FAILURE]: (state, action) => ({
    error: action.error,
    ...state
  }),
  [FETCH_SELECTION_SUCCESS]: (state, action) => action.response.entities.selections
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function selectionsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
