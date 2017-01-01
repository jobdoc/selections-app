import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'selections/:attribute/:type',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Selections = require('./containers/SelectionsContainer').default
      const reducer = require('./modules/selections').default

      /*  Add the reducer to the store on key 'selections'  */
      injectReducer(store, { key: 'selections', reducer })

      /*  Return getComponent   */
      cb(null, Selections)

    /* Webpack named bundle   */
    }, 'selections')
  }
})
