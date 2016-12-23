import { reduxForm } from 'redux-form'

import EditSelectionInfoForm from '../components/EditSelectionInfoForm'

export default reduxForm({ form: 'editSelectionInfo' })(EditSelectionInfoForm)
