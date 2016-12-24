import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<CoreLayout {...props} />)
}

describe('(Layout) Core', function () {
  let _component
  let _props
  let _child
  let _container

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children : _child
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as MuiThemeProvider.', function () {
    expect(_component.type).to.equal(MuiThemeProvider)
  })

  it('Should render a container.', function () {
    _container = _component.props.children
    expect(_container.type).to.equal('div')
    expect(_container.props.className).to.equal('core-layout__container')
  })

  it('Should render a header.', function () {
    const headerContainer = _container.props.children[0]
    expect(headerContainer.type).to.equal('div')
    expect(headerContainer.props.className).to.equal('core-layout__header')
    expect(headerContainer.props.children.type).to.equal(Header)
  })

  it('Should render a sidebar.', function () {
    const sidebarContainer = _container.props.children[1]
    expect(sidebarContainer.type).to.equal('div')
    expect(sidebarContainer.props.className).to.equal('core-layout__sidebar')
    expect(sidebarContainer.props.children.type).to.equal(Sidebar)
  })

  it('Should render a viewport.', function () {
    const viewport = _container.props.children[2]
    expect(viewport.type).to.equal('div')
    expect(viewport.props.className).to.equal('core-layout__viewport')
    expect(viewport.props.children.type).to.equal('h1')
  })
})
