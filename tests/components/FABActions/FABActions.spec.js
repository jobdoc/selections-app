import React from 'react'
import { FABActions } from 'components/FABActions/FABActions'
import { shallow } from 'enzyme'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AddSelectionForm from 'forms/AddSelection/AddSelectionFormContainer'
import { bindActionCreators } from 'redux'

describe('(Component) FABActions', () => {
  let _wrapper, _props, _spies

  beforeEach(() => {
    _spies = {}
    _props = {
      ...bindActionCreators({
        addSelection   : (_spies.addSelection = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<FABActions {..._props} />)
  })

  it('Initializes state with dialogs closed', () => {
    expect(_wrapper.state()).to.deep.equal({
      addSelectionDialogOpen: false
    })
  })

  describe('Dialog...', () => {
    let _dialog
    beforeEach(() => {
      _dialog = _wrapper.find(Dialog)
    })

    it('Renders with correct props', () => {
      expect(_dialog.props().title).to.equal('Add a selection')
      expect(_dialog.props().modal).to.be.false
      expect(_dialog.props().open).to.equal(_wrapper.state().addSelectionDialogOpen)
      expect(_dialog.props().onRequestClose).to.be.a.function
    })

    it('Has two buttons', () => {
      expect(_dialog.props().actions).to.have.length(2)
    })

    it('Contains `AddSelectionForm`', () => {
      const form = _dialog.props().children
      expect(form.type).to.equal(AddSelectionForm)
      expect(form.props.onSubmit).to.equal(_props.addSelection)
    })
  })

  describe('FAB actions...', () => {
    let _button
    beforeEach(() => {
      _button = _wrapper.find(FloatingActionButton)
    })

    it('Has a container with class `fab-actions__add-button`', () => {
      expect(_button.parent().hasClass('fab-actions__add-button')).to.be.true
    })

    it('Sets modal state on click', () => {
      _button.simulate('click')
      expect(_wrapper.state('addSelectionDialogOpen')).to.be.true
    })

    it('Contains a plus sign', () => {
      expect(_button.props().children.type).to.equal(ContentAdd)
    })
  })
})
