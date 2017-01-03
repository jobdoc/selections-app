import { reduxForm } from 'redux-form'

import AddSelectionForm from './AddSelectionForm'

export default reduxForm({ form: 'addSelection' })(AddSelectionForm)
