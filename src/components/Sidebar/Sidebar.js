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
      <ListItem primaryText='Inbox' leftIcon={<ContentInbox />} />
    </List>
    <Divider />
    <List>
      <Subheader>Categories</Subheader>
      <ListItem primaryText='Appliances' />
      <ListItem primaryText='Cabinetry' />
      <ListItem primaryText='Doors' />
      <ListItem primaryText='Flooring' />
      <ListItem primaryText='Lighting & Electrical' />
      <ListItem primaryText='Paint' />
      <ListItem primaryText='Plumbing' />
      <ListItem primaryText='Specialty Items' />
      <ListItem primaryText='Tile' />
      <ListItem primaryText='Trim' />
      <ListItem primaryText='Windows' />
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
