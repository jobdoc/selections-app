import React from 'react'
import AppBar from 'material-ui/AppBar'
import './Header.scss'

export const Header = ({ title }) => (
  <AppBar
    title={`${title.charAt(0).toUpperCase()}${title.slice(1)}` || 'JobDoc'}
    iconClassNameRight='muidocs-icon-navigation-more-vert'
  />
)

Header.propTypes = {
  title         : React.PropTypes.string.isRequired
}

export default Header
