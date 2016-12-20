import React from 'react'
import { bindActionCreators } from 'redux'
import { Selections } from 'routes/Selections/components/Selections'
import { shallow } from 'enzyme'

describe('(Component) Selections', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      counter : 5,
      ...bindActionCreators({
        doubleAsync : (_spies.doubleAsync = sinon.spy()),
        increment   : (_spies.increment = sinon.spy())
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

  it('Should render exactly two buttons.', () => {
    expect(_wrapper.find('button')).to.have.length(2)
  })

  describe('An increment button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Increment')
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `increment` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.increment.should.have.been.called
    })
  })

  describe('A Double (Async) button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Double (Async)')
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })

    it('Should dispatch a `doubleAsync` action when clicked', () => {
      _spies.dispatch.should.have.not.been.called

      _button.simulate('click')

      _spies.dispatch.should.have.been.called
      _spies.doubleAsync.should.have.been.called
    })
  })
})
