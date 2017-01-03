import React from 'react'
import './FABActions.scss'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AddSelectionForm from 'forms/AddSelection/AddSelectionFormContainer'

export class FABActions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addSelectionDialogOpen: false
    }
  }

  render () {
    return (
      <div>
        {this.renderAddSelectionDialog()}
        <div className='fab-actions__add-button'>
          <FloatingActionButton onClick={() => this.setState({ addSelectionDialogOpen: true })}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    )
  }

  renderAddSelectionDialog = () => {
    const actions = [
      <FlatButton
        label='Cancel'
        onTouchTap={() => this.setState({ addSelectionDialogOpen: false })}
      />,
      <FlatButton
        label='Add selection'
        primary
        onTouchTap={() => this.setState({ addSelectionDialogOpen: false })}
      />
    ]

    return (
      <Dialog
        title='Add a selection'
        actions={actions}
        modal={false}
        open={this.state.addSelectionDialogOpen}
        onRequestClose={() => this.setState({ addSelectionDialogOpen: false })}
      >
        <AddSelectionForm onSubmit={this.props.addSelection} />
      </Dialog>
    )
  }

}

FABActions.propTypes = {
  addSelection       : React.PropTypes.func.isRequired
}

export default FABActions
