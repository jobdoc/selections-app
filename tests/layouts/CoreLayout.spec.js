import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from 'containers/HeaderContainer'
import Sidebar from 'components/Sidebar'
import { shallow } from 'enzyme'

describe('(Layout) Core', function () {
  let _wrapper, _props, _child, _container

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children : _child,
      location: {
        pathname: '/somepath'
      },
      params: {
        routeParam: '1'
      }
    }

    _wrapper = shallow(<CoreLayout {..._props} />)
  })

  it('Should render as MuiThemeProvider.', function () {
    expect(_wrapper.type()).to.equal(MuiThemeProvider)
  })

  it('Should render a container.', function () {
    _container = _wrapper.props().children
    expect(_container.type).to.equal('div')
    expect(_container.props.className).to.equal('core-layout__container')
  })

  it('Should render a header.', function () {
    const headerContainer = _container.props.children[0]
    expect(headerContainer.type).to.equal('div')
    expect(headerContainer.props.className).to.equal('core-layout__header')
    expect(headerContainer.props.children.props.params).to.deep.equal(_props.params)
    expect(headerContainer.props.children.type).to.equal(Header)
  })

  it('Should render a sidebar.', function () {
    const sidebarContainer = _container.props.children[1]
    expect(sidebarContainer.type).to.equal('div')
    expect(sidebarContainer.props.className).to.equal('core-layout__sidebar')
    expect(sidebarContainer.props.children.type).to.equal(Sidebar)
    expect(sidebarContainer.props.children.props.pathname).to.equal(_props.location.pathname)
  })

  it('Should render a viewport.', function () {
    const viewport = _container.props.children[2]
    expect(viewport.type).to.equal('div')
    expect(viewport.props.className).to.equal('core-layout__viewport')
    expect(viewport.props.children.type).to.equal('h1')
  })
})
