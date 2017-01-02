import React from 'react'
import { Link } from 'react-router'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AddSelectionForm from '../containers/AddSelectionFormContainer'
import './Selections.scss'

export class Selections extends React.Component {
  componentWillMount () {
    this.props.loadSelections()
  }

  render () {
    return (
      <div>
        <AddSelectionForm onSubmit={this.props.addSelection} />
        <GridList
          cols={3}
        >
          <Subheader>Kitchen</Subheader>
          {this.props.selections.map(selection => {
            return (
              <Link to={`/selection/${selection.id}`} key={`selection-${selection.id}`}>
                <GridTile
                  title={selection.item}
                  subtitle={selection.description}
                  rows={2}
                >
                  <img
                    className='selections__tile-image'
                    src={selection.image_url}
                  />
                </GridTile>
              </Link>
            )
          })}
        </GridList>
        <div className='selections__add-button'>
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

Selections.propTypes = {
  params         : React.PropTypes.shape({
    fetchBy      : React.PropTypes.string,
    type         : React.PropTypes.string
  }),
  selections     : React.PropTypes.arrayOf(React.PropTypes.shape({
    item         : React.PropTypes.string,
    description  : React.PropTypes.string
  })),
  addSelection   : React.PropTypes.func.isRequired,
  loadSelections : React.PropTypes.func.isRequired
}

export default Selections
