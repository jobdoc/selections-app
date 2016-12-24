import React from 'react'
import { EditSelectionInfoForm } from 'routes/Selection/components/EditSelectionInfoForm'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import {
  SelectField,
  TextField
} from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'

describe('(Component) EditSelectionInfoForm', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      handleSubmit : (_spies.handleSubmit = sinon.spy()),
      onCancel : (_spies.onCancel = sinon.spy())
    }
    _wrapper = shallow(<EditSelectionInfoForm {..._props} />)
  })

  it('Should render as a <form>.', () => {
    expect(_wrapper.is('form')).to.be.true
    expect(_wrapper.props().onSubmit).to.be.a('function')
  })

  it('Should render exactly two Fields.', () => {
    expect(_wrapper.find('Field')).to.have.length(2)
  })

  it('Should render exactly two <br />s.', () => {
    expect(_wrapper.find('br')).to.have.length(2)
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

  describe('A select field...', () => {
    let _field
    let _menuItems
    beforeEach(() => {
      _field = _wrapper.find(Field).first()
      _menuItems = _field.find(MenuItem)
    })

    it('Should render a field', () => {
      expect(_field.props().name).to.equal('status')
      expect(_field.props().hintText).to.equal('Update status')
      expect(_field.props().component).to.equal(SelectField)
    })

    it('Should render four menu items.', () => {
      expect(_field.find(MenuItem)).to.have.length(4)
    })

    const options = [
      'outstanding',
      'options offered',
      'selection made',
      'ordered'
    ]
    options.forEach((option, idx) => {
      it(`Should render a ${option} option`, () => {
        expect(_menuItems.at(idx).props().value).to.equal(option)
        expect(_menuItems.at(idx).props().primaryText).to.equal(option.charAt(0).toUpperCase() + option.slice(1))
      })
    })
  })

  describe('A description field...', () => {
    let _field

    beforeEach(() => {
      _field = _wrapper.find(Field).filterWhere(a => a.props().name === 'description')
    })

    it('has name `hintText`', () => {
      expect(_field.props().hintText).to.equal('Update description')
    })

    it('has component TextField', () => {
      expect(_field.props().component).to.equal(TextField)
    })
  })

  describe('A submit button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find(FlatButton).filterWhere(a => a.props().label === 'Save')
    })

    it('has props', () => {
      expect(_button.props().type).to.equal('submit')
      expect(_button.props().primary).to.be.true
    })
  })

  describe('A cancel button...', () => {
    let _button

    beforeEach(() => {
      _button = _wrapper.find(FlatButton).filterWhere(a => a.props().label === 'Cancel')
    })

    it('Should call `onCancel` when clicked', () => {
      _spies.onCancel.should.have.not.been.called

      _button.simulate('click')

      _spies.onCancel.should.have.been.called
    })
  })
})
