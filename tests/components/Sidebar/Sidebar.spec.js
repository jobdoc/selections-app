import React from 'react'
import { Sidebar, categoriesMenu } from 'components/Sidebar/Sidebar'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import ContentInbox from 'material-ui/svg-icons/content/inbox'

describe('(Component) Sidebar', () => {
  let _wrapper, _props

  beforeEach(() => {
    _props = {
      pathname: '/'
    }
    _wrapper = shallow(<Sidebar {..._props} />)
  })

  it('Renders three lists', () => {
    const lists = _wrapper.find(List)
    expect(lists).to.have.length(3)
  })

  it('Renders two dividers', () => {
    const dividers = _wrapper.find(Divider)
    expect(dividers).to.have.length(2)
  })

  it('Renders two subheaders', () => {
    const subheaders = _wrapper.find(Subheader)
    expect(subheaders).to.have.length(2)
  })

  describe('Navigation links...', () => {
    it('Should render a Link to Inbox route', () => {
      expect(_wrapper.contains(
        <IndexLink className='list-link' to='/'>
          <div className='sidebar--list-item__active'>
            <ListItem primaryText='Inbox' leftIcon={<ContentInbox />} />
          </div>
        </IndexLink>
      )).to.be.true
    })

    categoriesMenu.forEach((category) => {
      it(`Should render a Link to ${category.name} route`, () => {
        expect(_wrapper.contains(
          <Link key={category.path} className='list-link' to={category.path}>
            <div className=''>
              <ListItem
                primaryText={category.name}
              />
            </div>
          </Link>
        )).to.be.true
      })
    })

    it('Should highlight the current route', () => {
      _wrapper.setProps({
        pathname: '/selections/category/plumbing'
      })
      const menuItem = _wrapper.findWhere(node => node.key() === '/selections/category/plumbing')
      expect(menuItem.props().children.props.className).to.equal('sidebar--list-item__active')
    })
  })
})
