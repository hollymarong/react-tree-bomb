import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'Bomb',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Bomb = require('./containers/index').default
      const reducer = require('./reducers/index').default

      /*  Add the reducer to the store on key 'Bomb'  */
      injectReducer(store, { key: 'Bomb', reducer })

      /*  Return getComponent   */
      cb(null, Bomb)

    /* Webpack named bundle   */
    }, 'Bomb')
  }
})
