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
          {Object.keys(this.props.selections).map(key => {
            const tile = this.props.selections[key]
            return (
              <Link to={`/selection/${tile.id}`} key={`selection-${tile.id}`}>
                <GridTile
                  title={tile.product}
                  subtitle={tile.name}
                  rows={2}
                >
                  <img
                    className='selections__tile-image'
                    src='http://res.cloudinary.com/jobdoc/image/upload/c_fit,w_200,h_400/industrial-kitchen-faucets_y7sdei.jpg' // eslint-disable-line max-len
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
  selections     : React.PropTypes.shape({
    name: React.PropTypes.string,
    product: React.PropTypes.string
  }),
  addSelection   : React.PropTypes.func.isRequired,
  loadSelections : React.PropTypes.func.isRequired
}

export default Selections
