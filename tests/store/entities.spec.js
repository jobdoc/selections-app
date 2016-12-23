import {
  default as entitiesReducer
} from 'store/entities'

describe('(Internal Module) Entities', () => {
  describe('(Reducer)', () => {
    const initialState = {
      comments: {},
      users: {},
      selections: {},
      products: {}
    }
    it('Should be a function.', () => {
      expect(entitiesReducer).to.be.a('function')
    })

    it('Should initialize state with a child of each entity.', () => {
      expect(entitiesReducer(undefined, {})).to.deep.equal(initialState)
    })

    it('Should return the previous state if an action does not contain response with entities.', () => {
      let state = entitiesReducer(undefined, {})
      expect(state).to.deep.equal(initialState)
      state = entitiesReducer(state, { type: '@@@@@@@', response: null })
      expect(state).to.deep.equal(initialState)

      const productEntities = {
        someId: {
          someProperty: 'attr'
        }
      }
      const entitiesState = {
        products: productEntities,
        selections: {},
        users: {},
        comments: {}
      }
      const actionWithEntities = {
        type: '@@@@@@@',
        response: {
          entities: {
            products: productEntities
          }
        }
      }
      state = entitiesReducer(state, actionWithEntities)
      expect(state).to.deep.equal(entitiesState)
      state = entitiesReducer(state, { type: '@@@@@@@', response: null })
      expect(state).to.deep.equal(entitiesState)
    })
  })
})
