import { reduxForm } from 'redux-form'

import EditSelectionInfoForm from './EditSelectionInfoForm'

export default reduxForm({ form: 'editSelectionInfo' })(EditSelectionInfoForm)
