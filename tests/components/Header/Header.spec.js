import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'
import AppBar from 'material-ui/AppBar'

describe('(Component) Header', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      title: 'plumbing'
    }
    _wrapper = shallow(<Header {..._props} />)
  })

  it('Renders the app bar', () => {
    const appBar = _wrapper.find(AppBar)
    expect(appBar).to.exist
    expect(appBar.props().title).to.equal(`${_props.title.charAt(0).toUpperCase()}${_props.title.slice(1)}`)
    expect(appBar.props().iconClassNameRight).to.match(/muidocs-icon-navigation-more-vert/)
  })
})
