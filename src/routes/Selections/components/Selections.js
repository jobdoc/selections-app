import React from 'react'
import AddSelectionFormContainer from '../containers/AddSelectionFormContainer'

export class Selections extends React.Component {
  componentWillMount () {
    this.props.loadSelections()
  }

  render () {
    return (
      <div>
        <h1>Selections</h1>
        <AddSelectionFormContainer onSubmit={this.props.addSelection} />
        <pre style={{ marginTop: '3em' }}>{JSON.stringify(this.props.selections, null, 2)}</pre>
      </div>
    )
  }
}

Selections.propTypes = {
  selections     : React.PropTypes.shape({
    name: React.PropTypes.string,
    product: React.PropTypes.string
  }),
  addSelection   : React.PropTypes.func.isRequired,
  loadSelections : React.PropTypes.func.isRequired
}

export default Selections
