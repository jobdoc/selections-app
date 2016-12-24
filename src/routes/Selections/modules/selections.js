import { CALL_API, Schemas } from 'middleware/api'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_SELECTION = 'ADD_SELECTION'

export const POST_SELECTION_REQUEST = 'POST_SELECTION_REQUEST'
export const POST_SELECTION_FAILURE = 'POST_SELECTION_FAILURE'
export const POST_SELECTION_SUCCESS = 'POST_SELECTION_SUCCESS'

export const FETCH_SELECTIONS_REQUEST = 'FETCH_SELECTIONS_REQUEST'
export const FETCH_SELECTIONS_FAILURE = 'FETCH_SELECTIONS_FAILURE'
export const FETCH_SELECTIONS_SUCCESS = 'FETCH_SELECTIONS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

const postSelection = (selection) => ({
  [CALL_API]: {
    types: [POST_SELECTION_REQUEST, POST_SELECTION_SUCCESS, POST_SELECTION_FAILURE],
    endpoint: 'addSelection',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selection)
    },
    schema: Schemas.SELECTION
  }
})

export const addSelection = (selection) => (dispatch) => {
  dispatch({
    type    : ADD_SELECTION,
    payload : selection
  })
  return dispatch(postSelection(selection))
}

const fetchSelections = () => ({
  [CALL_API]: {
    types: [FETCH_SELECTIONS_REQUEST, FETCH_SELECTIONS_SUCCESS, FETCH_SELECTIONS_FAILURE],
    endpoint: 'getSelections',
    schema: Schemas.SELECTION_ARRAY
  }
})

export const loadSelections = () => (dispatch) => {
  return dispatch(fetchSelections())
}

export const actions = {
  addSelection,
  loadSelections
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_SELECTION]: (state, action) => ({
    justAdded: action.payload,
    ...state
  }),
  [POST_SELECTION_REQUEST]: (state, action) => ({
    isPosting: true,
    ...state
  }),
  [POST_SELECTION_FAILURE]: (state, action) => ({
    error: action.error,
    isPosting: false,
    ...state
  }),
  [POST_SELECTION_SUCCESS]: (state, action) => ({
    isPosting: false,
    ...state
  }),
  [FETCH_SELECTIONS_REQUEST]: (state, action) => ({
    isFetching: true,
    ...state
  }),
  [FETCH_SELECTIONS_FAILURE]: (state, action) => ({
    error: action.error,
    isFetching: false,
    ...state
  }),
  [FETCH_SELECTIONS_SUCCESS]: (state, action) => ({
    isFetching: false,
    ...state
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function selectionsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
