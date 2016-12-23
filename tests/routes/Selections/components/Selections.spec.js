import React from 'react'
import { bindActionCreators } from 'redux'
import { Selections } from 'routes/Selections/components/Selections'
import { shallow } from 'enzyme'

describe.skip('(Component) Selections', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      selections : {},
      ...bindActionCreators({
        addSelection   : (_spies.addSelection = sinon.spy()),
        loadSelections : (_spies.loadSelections = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Selections {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render with an <h1> that includes page title.', () => {
    expect(_wrapper.find('h1').text()).to.match(/Selections/)
  })
})
