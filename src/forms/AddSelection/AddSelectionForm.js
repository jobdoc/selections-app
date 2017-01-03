import React from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import {
  SelectField,
  TextField
} from 'redux-form-material-ui'

export const AddSelectionForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field name='item' component={TextField} hintText='Item' />
    <br />
    <Field name='room' component={TextField} hintText='Room' />
  </form>
)

AddSelectionForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default AddSelectionForm
