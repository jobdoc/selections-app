import { reduxForm } from 'redux-form'

import AddSelectionForm from '../components/AddSelectionForm'

export default reduxForm({ form: 'addSelection' })(AddSelectionForm)
