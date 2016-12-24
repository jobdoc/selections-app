import React from 'react'
import { Sidebar } from 'components/Sidebar/Sidebar'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import ContentInbox from 'material-ui/svg-icons/content/inbox'

describe('(Component) Sidebar', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Sidebar />)
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
          <ListItem primaryText='Inbox' leftIcon={<ContentInbox />} />
        </IndexLink>
      )).to.be.true
    })

    const categories = [
      'Appliances',
      'Cabinetry',
      'Doors',
      'Flooring',
      'Lighting & Electrical',
      'Paint',
      'Plumbing',
      'Specialty Items',
      'Tile',
      'Trim',
      'Windows'
    ]

    categories.forEach((category) => {
      it(`Should render a Link to ${category} route`, () => {
        expect(_wrapper.contains(
          <Link className='list-link' to='/selections'>
            <ListItem primaryText={category} />
          </Link>
        )).to.be.true
      })
    })
  })
})
