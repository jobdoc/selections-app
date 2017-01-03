import React from 'react'
import { AddSelectionForm } from 'forms/AddSelection/AddSelectionForm'
import { shallow } from 'enzyme'

describe('(Component) AddSelectionForm', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      handleSubmit : (_spies.handleSubmit = sinon.spy())
    }
    _wrapper = shallow(<AddSelectionForm {..._props} />)
  })

  it('Should render as a <form>.', () => {
    expect(_wrapper.is('form')).to.equal(true)
  })

  it('Should render exactly two Fields.', () => {
    expect(_wrapper.find('Field')).to.have.length(2)
  })

  describe('Form groups...', () => {
    let _formGroups

    beforeEach(() => {
      _formGroups = _wrapper.find('div')
    })

    it('Should have two groups', () => {
      expect(_formGroups).to.have.length(2)
    })

    it('Each group should have bootstrap classes', () => {
      _formGroups.forEach(node => {
        expect(node.hasClass('form-group')).to.be.true
      })
    })

    it('Each group should have one label', () => {
      _formGroups.forEach(node => {
        expect(node.find('label')).to.have.length(1)
      })
    })

    it('Each group should have one redux Field', () => {
      _formGroups.forEach(node => {
        expect(node.find('Field')).to.have.length(1)
      })
    })
  })

  describe('A form...', () => {
    let _form

    beforeEach(() => {
      _form = _wrapper.find('form')
    })

    it('Should call `onSubmit` when submitted', () => {
      _spies.handleSubmit.should.have.not.been.called

      _form.simulate('submit')

      _spies.handleSubmit.should.have.been.called
    })
  })

  describe('A submit button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Add selection')
    })

    it('has bootstrap classes', () => {
      expect(_button.hasClass('btn btn-default')).to.be.true
    })
  })
})
