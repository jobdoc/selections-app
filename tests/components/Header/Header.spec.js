import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'
import AppBar from 'material-ui/AppBar'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header />)
  })

  it('Renders the app bar', () => {
    const appBar = _wrapper.find(AppBar)
    expect(appBar).to.exist
    expect(appBar.props().title).to.match(/JobDoc/)
    expect(appBar.props().iconClassNameRight).to.match(/muidocs-icon-navigation-more-vert/)
  })
})
