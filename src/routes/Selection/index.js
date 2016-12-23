import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'selection/:selectionId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Selection = require('./containers/SelectionContainer').default
      const reducer = require('./modules/selection').default

      /*  Add the reducer to the store on key 'selection'  */
      injectReducer(store, { key: 'selection', reducer })

      /*  Return getComponent   */
      cb(null, Selection)

    /* Webpack named bundle   */
    }, 'selection')
  }
})
