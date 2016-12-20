import {
  default as createStore
} from 'store/createStore'

describe('(Store) createStore', () => {
  let store

  before(() => {
    store = createStore()
  })

  it('should have an empty asyncReducers object', () => {
    expect(store.asyncReducers).to.be.an('object')
    expect(store.asyncReducers).to.be.empty
  })

  describe('(Location)', () => {
    it('store should be initialized with Location state', () => {
      const location = {
        pathname : '/echo'
      }
      store.dispatch({
        type    : 'LOCATION_CHANGE',
        payload : location
      })
      expect(store.getState().location).to.deep.equal(location)
    })
  })

  describe('(Form)', () => {
    it('store should be initialized with Form state', () => {
      const name = 'aForm'
      const payload = {
        name: 'aField',
        type: 'Field'
      }
      store.dispatch({
        type: '@@redux-form/REGISTER_FIELD',
        meta: {
          form: name
        },
        payload
      })
      const form = {
        [name]: {
          registeredFields: [
            payload
          ]
        }
      }
      expect(store.getState().form).to.deep.equal(form)
    })
  })
})
