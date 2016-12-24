import SelectionRoute from 'routes/Selection'

describe('(Route) Selection', () => {
  let _route

  beforeEach(() => {
    _route = SelectionRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `selection/:selectionId`', () => {
    expect(_route.path).to.equal('selection/:selectionId')
  })
})
