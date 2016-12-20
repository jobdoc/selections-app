import React from 'react'
import { Field } from 'redux-form'

export const AddSelectionForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div className='form-group'>
      <label htmlFor='name'>Description</label>
      <Field className='form-control' name='name' component='input' type='text' />
    </div>
    <div className='form-group'>
      <label htmlFor='product'>Selection</label>
      <Field className='form-control' name='product' component='input' type='text' />
    </div>
    <button type='submit' className='btn btn-default'>
      Add selection
    </button>
  </form>
)

AddSelectionForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

export default AddSelectionForm
