import React from 'react'
import { bindActionCreators } from 'redux'
import { Selections } from 'routes/Selections/components/Selections'
import { shallow } from 'enzyme'
import { GridList, GridTile } from 'material-ui/GridList'
import Subheader from 'material-ui/Subheader'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import AddSelectionForm from 'routes/Selections/containers/AddSelectionFormContainer'
import { Link } from 'react-router'

describe('(Component) Selections', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      selections : [
        {
          id: 1,
          item: 'Main sink',
          description: 'Large sink in kitchen',
          image_url: 'http://placehold.it/'
        },
        {
          id: 2,
          item: 'Fun gun',
          description: 'the funniest',
          image_url: 'http://placehold.it/'
        }
      ],
      ...bindActionCreators({
        addSelection   : (_spies.addSelection = sinon.spy()),
        loadSelections : (_spies.loadSelections = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Selections {..._props} />)
  })

  it('Should call loadSelections() once mounted.', () => {
    _spies.loadSelections.should.have.been.called
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.be.true
  })

  it('Should contain AddSelectionForm.', () => {
    const form = _wrapper.find(AddSelectionForm)
    expect(form).to.exist
    expect(form.props().onSubmit).to.be.a('function')
  })

  describe('A grid list...', () => {
    let _gridList
    beforeEach(() => {
      _gridList = _wrapper.find(GridList)
    })

    it('Should have three columns.', () => {
      expect(_gridList.props().cols).to.equal(3)
    })

    it('Should have one Subheader.', () => {
      expect(_gridList.find(Subheader)).to.have.length(1)
    })

    it('Should have a tile for each selection', () => {
      const tiles = _gridList.find(Link)
      expect(tiles).to.have.length(_props.selections.length)
    })

    describe('A grid tile...', () => {
      let _gridTiles
      beforeEach(() => {
        _gridTiles = _gridList.find(Link)
      })

      it('Should render a Link to each selection.', () => {
        _gridTiles.forEach((gridTile, idx) => {
          expect(gridTile.props().to).to.equal(`/selection/${_props.selections[idx].id}`)
          expect(gridTile.key()).to.equal(`selection-${_props.selections[idx].id}`)
        })
      })

      it('Should render a GridTile with an image for each selection.', () => {
        _gridTiles.forEach((gridTile, idx) => {
          const component = gridTile.find(GridTile)
          expect(component).to.exist
          expect(component.props().title).to.equal(_props.selections[idx].item)
          expect(component.props().subtitle).to.equal(_props.selections[idx].description)
          expect(component.props().rows).to.equal(2)

          const image = component.find('img')
          expect(image.hasClass('selections__tile-image')).to.be.true
          expect(image.props().src).to.equal(_props.selections[idx].image_url)
        })
      })
    })
  })

  describe('An action button...', () => {
    let _actionButtonContainer
    beforeEach(() => {
      _actionButtonContainer = _wrapper.find('.selections__add-button')
    })

    it('Should render as a <div>.', () => {
      expect(_actionButtonContainer.is('div')).to.be.true
    })

    it('Should contain FloatingActionButton.', () => {
      expect(_actionButtonContainer.contains(
        <FloatingActionButton>
          <ContentAdd />
        </FloatingActionButton>
      )).to.be.true
    })
  })
})
