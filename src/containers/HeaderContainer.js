import { connect } from 'react-redux'
import { createSelector } from 'reselect'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Header from '../components/Header'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
}

const getSelectionEntityItem = (state, props) =>
  state.entities.selections[props.params.selectionId] && state.entities.selections[props.params.selectionId].item

const getParams = (state, props) => props.params

const getTitle = createSelector(
    [ getSelectionEntityItem, getParams ],
    (selectionEntityItem, params) => {
      if (params.type) {
        return params.type
      }

      if (params.selectionId && selectionEntityItem) {
        return selectionEntityItem
      }

      return 'JobDoc'
    }
)

const mapStateToProps = (state, props) => ({
  title : getTitle(state, props)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
