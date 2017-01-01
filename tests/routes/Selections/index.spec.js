import SelectionsRoute from 'routes/Selections'

describe('(Route) Selections', () => {
  let _route

  beforeEach(() => {
    _route = SelectionsRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `selections/:attribute/:type`', () => {
    expect(_route.path).to.equal('selections/:attribute/:type')
  })
})
