import React from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import {
  SelectField,
  TextField
} from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'

export const EditSelectionInfoForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <Field name='status' component={SelectField} hintText='Update status'>
      <MenuItem value='outstanding' primaryText='Outstanding' />
      <MenuItem value='choice offered' primaryText='Choices offered' />
      <MenuItem value='selection made' primaryText='Selection made' />
      <MenuItem value='ordered' primaryText='Ordered' />
    </Field>
    <br />
    <Field name='description' component={TextField} hintText='Update description' />
    <br />
    <FlatButton type='submit' label='Save' primary />
    <FlatButton label='Cancel' />
  </form>
)

EditSelectionInfoForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default EditSelectionInfoForm
