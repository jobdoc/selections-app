import React from 'react'
import { Link } from 'react-router'
import { GridList, GridTile } from 'material-ui/GridList'
import './Selections.scss'
import Rebase from 're-base'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'

const base = Rebase.createClass({
  apiKey: 'AIzaSyB6H6xujHgnFp7fW5zdGeRoQWFOwoRkr-s',
  authDomain: 'jobdoc-151914.firebaseapp.com',
  databaseURL: 'https://jobdoc-151914.firebaseio.com/',
  storageBucket: 'jobdoc-151914.appspot.com'
}, 'jobdoc')

export class Selections extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selections: []
    }
  }

  componentWillMount () {
    this.ref = base.syncState('selections', {
      context: this,
      state: 'selections',
      asArray: true
    })
  }

  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  render () {
    return (
      <div className='selections__container'>
        {this.state.selections.map(selection => {
          return (
            <Link className='list-link' to={`/selection/${selection.key}`} key={`selection-${selection.key}`}>
              <Card>
                <CardTitle
                  title={selection.item}
                  subtitle={selection.room}
                />
              </Card>
            </Link>
          )
        })}
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
  loadSelections : React.PropTypes.func.isRequired
}

export default Selections
