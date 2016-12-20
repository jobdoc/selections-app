import { CALL_API, Schemas } from 'middleware/api'
import omit from 'lodash/omit'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_SELECTION = 'ADD_SELECTION'

export const POST_SELECTION_REQUEST = 'POST_SELECTION_REQUEST'
export const POST_SELECTION_FAILURE = 'POST_SELECTION_FAILURE'
export const POST_SELECTION_SUCCESS = 'POST_SELECTION_SUCCESS'

export const FETCH_SELECTION_REQUEST = 'FETCH_SELECTION_REQUEST'
export const FETCH_SELECTION_FAILURE = 'FETCH_SELECTION_FAILURE'
export const FETCH_SELECTION_SUCCESS = 'FETCH_SELECTION_SUCCESS'

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
  dispatch(postSelection(selection))
  return dispatch({
    type    : ADD_SELECTION,
    payload : selection
  })
}

const fetchSelections = () => ({
  [CALL_API]: {
    types: [FETCH_SELECTION_REQUEST, FETCH_SELECTION_SUCCESS, FETCH_SELECTION_FAILURE],
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
    ...state,
    justAdded: action.payload
  }),
  [POST_SELECTION_FAILURE]: (state, action) => {
    const preadditionState = omit(state, 'justAdded')
    return {
      error: action.error,
      ...preadditionState
    }
  },
  [POST_SELECTION_SUCCESS]: (state, action) => {
    const preadditionState = omit(state, 'justAdded')
    return {
      ...action.response.entities.selections,
      ...preadditionState
    }
  },
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
