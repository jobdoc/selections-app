import React from 'react'
import { IndexLink, Link } from 'react-router'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import './Sidebar.scss'

import ContentInbox from 'material-ui/svg-icons/content/inbox'

export const Sidebar = () => (
  <div>
    <List>
      <IndexLink className='list-link' to='/'>
        <ListItem primaryText='Inbox' leftIcon={<ContentInbox />} />
      </IndexLink>
    </List>
    <Divider />
    <List>
      <Subheader>Categories</Subheader>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Appliances' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Cabinetry' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Doors' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Flooring' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Lighting & Electrical' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Paint' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Plumbing' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Specialty Items' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Tile' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Trim' />
      </Link>
      <Link className='list-link' to='/selections'>
        <ListItem primaryText='Windows' />
      </Link>
    </List>
    <Divider />
    <List>
      <Subheader>Rooms</Subheader>
      <ListItem primaryText='Master bathroom' />
      <ListItem primaryText='Kitchen' />
    </List>
  </div>
)

export default Sidebar
