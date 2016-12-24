import {
  ADD_SELECTION,
  POST_SELECTION_REQUEST,
  POST_SELECTION_FAILURE,
  POST_SELECTION_SUCCESS,
  FETCH_SELECTIONS_REQUEST,
  FETCH_SELECTIONS_FAILURE,
  FETCH_SELECTIONS_SUCCESS,
  addSelection,
  loadSelections,
  default as selectionsReducer
} from 'routes/Selections/modules/selections'

import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  API_ROOT,
  default as api
} from 'middleware/api'

const middlewares = [thunk, api]
const mockStore = configureMockStore(middlewares)

describe('(Redux Module) Selections', () => {
  const selection = {
    item: 'Door knob downstairs',
    product: 'Fancy one from the cool store'
  }
  const selectionId = '1234'

  it('Should export a constant ADD_SELECTION.', () => {
    expect(ADD_SELECTION).to.equal('ADD_SELECTION')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(selectionsReducer).to.be.a('function')
    })

    it('Should initialize with a state of {} (Object).', () => {
      expect(selectionsReducer(undefined, {})).to.deep.equal({})
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: '@@@@@@@' })
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: ADD_SELECTION, payload: selection })
      expect(state).to.deep.equal({
        justAdded: selection
      })
      state = selectionsReducer(state, { type: '@@@@@@@' })
      expect(state).to.deep.equal({
        justAdded: selection
      })
    })
  })

  describe('(Action Creator) loadSelections', () => {
    afterEach(() => fetchMock.restore())

    it('Should be exported as a function.', () => {
      expect(loadSelections).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(loadSelections()).to.be.a('function')
    })

    it('Should create "FETCH_SELECTIONS_SUCCESS" when fetching selections has been done.', () => {
      const selectionWithId = {
        ...selection,
        id: selectionId
      }

      fetchMock.get(`${API_ROOT}getSelections`, { body: [ selectionWithId ] })

      const expectedActions = [
        { type: FETCH_SELECTIONS_REQUEST },
        {
          type: FETCH_SELECTIONS_SUCCESS,
          response: {
            entities: {
              selections: {
                [selectionId]: selectionWithId
              }
            },
            result: [
              selectionId
            ],
            nextPageUrl: null
          }
        }
      ]
      const store = mockStore({ selections: {} })

      return store.dispatch(loadSelections())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })

    it('Should create "FETCH_SELECTIONS_FAILURE" when fetching selections has failed.', () => {
      fetchMock.get(`${API_ROOT}getSelections`, 500)

      const expectedActions = [
        { type: FETCH_SELECTIONS_REQUEST },
        {
          type: FETCH_SELECTIONS_FAILURE,
          error: 'JSON Parse error: Unexpected EOF'
        }
      ]
      const store = mockStore({ selections: {} })

      return store.dispatch(loadSelections())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('(Action Creator) addSelection', () => {
    afterEach(() => fetchMock.restore())

    it('Should be exported as a function.', () => {
      expect(addSelection).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(addSelection()).to.be.a('function')
    })

    it('Should create "POST_SELECTION_SUCCESS" when adding selection has been done.', () => {
      const selectionWithId = {
        ...selection,
        id: selectionId
      }

      fetchMock.post(`${API_ROOT}addSelection`, { body: selectionWithId })

      const expectedActions = [
        {
          type: ADD_SELECTION,
          payload: selection
        },
        { type: POST_SELECTION_REQUEST },
        {
          type: POST_SELECTION_SUCCESS,
          response: {
            entities: {
              selections: {
                [selectionId]: selectionWithId
              }
            },
            result: selectionId,
            nextPageUrl: null
          }
        }
      ]
      const store = mockStore({ selections: {} })

      return store.dispatch(addSelection(selection))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })

    it('Should create "FETCH_SELECTIONS_FAILURE" when fetching selections has failed.', () => {
      fetchMock.post(`${API_ROOT}addSelection`, 500)

      const expectedActions = [
        {
          type: ADD_SELECTION,
          payload: selection
        },
        { type: POST_SELECTION_REQUEST },
        {
          type: POST_SELECTION_FAILURE,
          error: 'JSON Parse error: Unexpected EOF'
        }
      ]
      const store = mockStore({ selections: {} })

      return store.dispatch(addSelection(selection))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('(Action Handler) ADD_SELECTION', () => {
    it('Should update the state\'s justAdded property with the action payload.', () => {
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: ADD_SELECTION, payload: selection })
      expect(state).to.deep.equal({ justAdded: selection })
      state = selectionsReducer(state, { type: ADD_SELECTION, payload: selection })
      expect(state).to.deep.equal({ justAdded: selection })
    })
  })

  describe('(Action Handler) FETCH_SELECTIONS_REQUEST', () => {
    it('Should update the state\'s isFetching property to `true`.', () => {
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: FETCH_SELECTIONS_REQUEST })
      expect(state).to.deep.equal({ isFetching: true })
    })
  })

  describe('(Action Handler) FETCH_SELECTIONS_SUCCESS', () => {
    it('Should update the state\'s isFetching property to `false`.', () => {
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: FETCH_SELECTIONS_SUCCESS })
      expect(state).to.deep.equal({ isFetching: false })
    })
  })

  describe('(Action Handler) FETCH_SELECTIONS_FAILURE', () => {
    it('Should update the state\'s isFetching property to `false` and the error property to error payload.', () => {
      const error = 'Something terrible happened'
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: FETCH_SELECTIONS_FAILURE, error })
      expect(state).to.deep.equal({
        isFetching: false,
        error
      })
    })
  })

  describe('(Action Handler) POST_SELECTION_REQUEST', () => {
    it('Should update the state\'s isPosting property to `true`.', () => {
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: POST_SELECTION_REQUEST })
      expect(state).to.deep.equal({ isPosting: true })
    })
  })

  describe('(Action Handler) POST_SELECTION_SUCCESS', () => {
    it('Should update the state\'s isPosting property to `false`.', () => {
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: POST_SELECTION_SUCCESS })
      expect(state).to.deep.equal({ isPosting: false })
    })
  })

  describe('(Action Handler) POST_SELECTION_FAILURE', () => {
    it('Should update the state\'s isPosting property to `false` and the error property to error payload.', () => {
      const error = 'Something terrible happened'
      let state = selectionsReducer(undefined, {})
      expect(state).to.deep.equal({})
      state = selectionsReducer(state, { type: POST_SELECTION_FAILURE, error })
      expect(state).to.deep.equal({
        isPosting: false,
        error
      })
    })
  })
})
