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

const fetchSelection = (id) => ({
  [CALL_API]: {
    types: [FETCH_SELECTION_REQUEST, FETCH_SELECTION_SUCCESS, FETCH_SELECTION_FAILURE],
    endpoint: `getSelection?id=${id}`,
    schema: Schemas.SELECTION
  }
})

export const loadSelection = (id) => (dispatch) => {
  return dispatch(fetchSelection(id))
}

export const actions = {
  loadSelection
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SELECTION_REQUEST]: (state, action) => ({
    isFetching: true,
    ...state
  }),
  [FETCH_SELECTION_FAILURE]: (state, action) => ({
    error: action.error,
    isFetching: false,
    ...state
  }),
  [FETCH_SELECTION_SUCCESS]: (state, action) => ({
    isFetching: false,
    ...state
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function selectionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
