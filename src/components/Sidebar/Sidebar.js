import React from 'react'
import classnames from 'classnames'
import { IndexLink, Link } from 'react-router'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import './Sidebar.scss'

import ContentInbox from 'material-ui/svg-icons/content/inbox'

export const categoriesMenu = [
  {
    path: '/selections/category/appliances',
    name: 'Appliances'
  },
  {
    path: '/selections/category/cabinetry',
    name: 'Cabinetry'
  },
  {
    path: '/selections/category/doors',
    name: 'Doors'
  },
  {
    path: '/selections/category/flooring',
    name: 'Flooring'
  },
  {
    path: '/selections/category/lighting%20and%20electrical',
    name: 'Lighting & Electrical'
  },
  {
    path: '/selections/category/paint',
    name: 'Paint'
  },
  {
    path: '/selections/category/plumbing',
    name: 'Plumbing'
  },
  {
    path: '/selections/category/specialty%20items',
    name: 'Specialty Items'
  },
  {
    path: '/selections/category/tile',
    name: 'Tile'
  },
  {
    path: '/selections/category/trim',
    name: 'Trim'
  },
  {
    path: '/selections/category/windows',
    name: 'Windows'
  }
]

export const Sidebar = ({ pathname }) => (
  <div>
    <List>
      <IndexLink className='list-link' to='/'>
        <div className={classnames({
          'sidebar--list-item__active': pathname === '/'
        })}>
          <ListItem primaryText='Inbox' leftIcon={<ContentInbox />} />
        </div>
      </IndexLink>
    </List>
    <Divider />
    <List>
      <Subheader>Categories</Subheader>
      {categoriesMenu.map(category => (
        <Link key={category.path} className='list-link' to={category.path}>
          <div className={classnames({
            'sidebar--list-item__active': pathname === category.path
          })}>
            <ListItem
              primaryText={category.name}
            />
          </div>
        </Link>
      ))}
    </List>
    <Divider />
    <List>
      <Subheader>Rooms</Subheader>
      <ListItem primaryText='Master bathroom' />
      <ListItem primaryText='Kitchen' />
    </List>
  </div>
)

Sidebar.propTypes = {
  pathname     : React.PropTypes.string
}

export default Sidebar
