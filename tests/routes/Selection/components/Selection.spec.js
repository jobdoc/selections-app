import React from 'react'
import { bindActionCreators } from 'redux'
import { Selection } from 'routes/Selection/components/Selection'
import { shallow } from 'enzyme'
import zip from 'lodash/zip'
import EditSelectionInfoForm from 'forms/EditSelectionInfo/EditSelectionInfoFormContainer'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { Tabs, Tab } from 'material-ui/Tabs'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'

describe('(Component) Selection', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      params: {
        selectionId: 'someId'
      },
      selection: {
        name: 'Faucet',
        location: 'Kitchen',
        description: 'This faucet is for the kitchen island.',
        status: 'options offered',
        allowance: 300
      },
      options: [
        {
          id: '23kj32kj2k',
          image_url: 'https://www.rohlhome.com/Images/i21126.JPG',
          url: 'https://www.rohlhome.com/Kitchen/Product_Detail.aspx?ProductID=U.4272-21652&Collection=1619&SubCollection=1652&ConnectionString=%22Product.Perrin%20^%20Rowe$S$$P$$C$0%22', // eslint-disable-line max-len
          manufacturer: 'Perrin & Rowe',
          model: 'Contemporary bridge kitchen faucet with sidespray',
          item_code: 'FMHK11024WH',
          description: `
            Cutout: min. 1 1/8" , max. 1 3/8"
            Deck mounted only, unions included
            Hot and cold mix at the sidespray
            Insulated brass sidespray
            8" centers, offset unions not available, cannot use U.6793 unions
            Patented diverter system
            Ceramic disc control cartridge
            16 1/2" spout height, 9" reach swivel spout
            Brass construction
            1.8 GPM
            1 3/4" max. installation depth on deck
          `
        },
        {
          id: '2kj3kj99dsk',
          image_url: 'http://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2F2New&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is{PAWEB%2Fzab35855_rgb}', // eslint-disable-line max-len
          url: 'http://www.us.kohler.com/us/baross-touchless-kitchen-faucet/productDetail/kitchen-sink-faucets/1280604.htm;jsessionid=A858D57DDCAF454CBA986C3FDEE36454.kohler-prod2-ecom2?skuId=1280602&brandId=1117946', // eslint-disable-line max-len
          manufacturer: 'Kohler',
          model: 'Barossa',
          item_code: 'K-R78035-SD-VS',
          description: 'With a state-of-the-art sensor conveniently located underneath the spout, the Barossa faucet with Response® touchless technology works with your hand’s natural position in the sink while helping prevent the spread of germs and reducing soap and water stains. Barossa\'s hidden sensor maintains the integrity of the easy-to-clean design, and simple installation makes for a quick and beautiful update to the busiest room in your home.' // eslint-disable-line max-len
        }
      ],
      comments: [
        {
          text: 'Love these options.',
          user: {
            name: 'Mel',
            avatar_url: 'https://avatars0.githubusercontent.com/u/1718791?v=3&s=460'
          }
        },
        {
          text: 'Thanks took a while',
          user: {
            name: 'James',
            avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
          }
        }
      ],
      commentUsers: [
        {
          name: 'Mel',
          avatar_url: 'https://avatars0.githubusercontent.com/u/1718791?v=3&s=460'
        },
        {
          name: 'James',
          avatar_url: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
        }
      ],
      ...bindActionCreators({
        loadSelection : (_spies.loadSelection = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Selection {..._props} />)
  })

  it('Should call loadSelection() once mounted.', () => {
    _spies.loadSelection.should.have.been.called
  })

  it('Should initialize with state.', () => {
    expect(_wrapper.state()).to.deep.equal({ expanded: false })
  })

  it('Should handle expand change.', () => {
    _wrapper.instance()._handleExpandChange(true)
    expect(_wrapper.state('expanded')).to.be.true
    _wrapper.instance()._handleExpandChange(false)
    expect(_wrapper.state('expanded')).to.be.false
  })

  it('Should handle selection info form cancel.', () => {
    _wrapper.setState({ expanded: true })
    _wrapper.instance()._handleSelectionInfoFormCancel()
    expect(_wrapper.state('expanded')).to.be.false
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.be.true
    expect(_wrapper.hasClass('selection__container')).to.be.true
  })

  it('Should render three cards.', () => {
    expect(_wrapper.find(Card)).to.have.length(3)
  })

  describe('Infomation card...', () => {
    let _card
    beforeEach(() => {
      _card = _wrapper.find(Card).first()
    })

    it('has `expanded` prop', () => {
      expect(_card.props().expanded).to.equal(_wrapper.state('expanded'))
    })

    it('has `onExpandChange` prop.', () => {
      expect(_card.props().onExpandChange).to.equal(_wrapper.instance()._handleExpandChange)
    })

    it('Should render a CardTitle.', () => {
      const cardTitle = _card.find(CardTitle)
      expect(cardTitle).to.exist
      expect(cardTitle.props().title).to.equal(_props.selection.item)
      expect(cardTitle.props().subtitle).to.equal(_props.selection.room)
      expect(cardTitle.props().actAsExpander).to.be.true
      expect(cardTitle.props().showExpandableButton).to.be.true
    })

    it('Should render CardMedia with Stepper.', () => {
      const cardMedia = _card.find(CardMedia)
      expect(cardMedia).to.exist
      const statuses = [
        'outstanding',
        'options offered',
        'selection made',
        'ordered'
      ]
      expect(cardMedia.contains(
        <Stepper activeStep={statuses.indexOf(_props.selection.status)}>
          <Step>
            <StepLabel>Outstanding</StepLabel>
          </Step>
          <Step>
            <StepLabel>Options offered</StepLabel>
          </Step>
          <Step>
            <StepLabel>Selection made</StepLabel>
          </Step>
          <Step>
            <StepLabel>Ordered</StepLabel>
          </Step>
        </Stepper>
      )).to.be.true
    })

    it('Should render CardText with description.', () => {
      const cardText = _card.find(CardText).first()
      expect(cardText).to.exist
      expect(cardText.props().children).to.equal(_props.selection.description)
    })

    it('Should render expandable CardText with EditSelectionInfoForm.', () => {
      const cardText = _card.find(CardText).last()
      expect(cardText).to.exist
      expect(cardText.props().expandable).to.be.true
      expect(cardText.find(EditSelectionInfoForm)).to.exist
      expect(cardText.find(EditSelectionInfoForm).props().onCancel).to.equal(_wrapper.instance()._handleSelectionInfoFormCancel) // eslint-disable-line max-len
    })
  })

  describe('Options card...', () => {
    let _card
    beforeEach(() => {
      _card = _wrapper.find(Card).at(1)
    })

    it('Should render a tab for each option.', () => {
      const tabs = _card.find(Tabs)
      expect(tabs).to.exist
      expect(tabs.find(Tab)).to.have.length(_props.options.length)
    })

    describe('Option tab...', () => {
      let _tab, _option
      beforeEach(() => {
        _tab = _card.find(Tab).first()
        _option = _props.options[0]
      })

      it('Should render CardMedia with option image.', () => {
        const cardMedia = _tab.find(CardMedia)
        expect(cardMedia).to.exist
        const image = cardMedia.find('img')
        expect(image).to.exist
        expect(image.props().src).to.equal(_option.image_url)
        expect(image.props().alt).to.equal(_option.model)
      })

      it('Should render List with product link.', () => {
        const cardList = _tab.find(List)
        expect(cardList).to.exist
        const link = cardList.find('a')
        expect(link).to.have.length(1)
        expect(link.hasClass('list-link')).to.be.true
        expect(link.props().href).to.equal(_option.url)
        expect(link.props().target).to.equal('_blank')
        const listItem = link.find(ListItem)
        expect(listItem).to.exist
        expect(listItem.props().primaryText).to.equal(_option.model)
        expect(listItem.props().secondaryText).to.equal(_option.manufacturer)
      })

      it('Should render CardActions to select or add option.', () => {
        const cardActions = _tab.find(CardActions)
        expect(cardActions).to.exist
        const buttons = cardActions.find(FlatButton)
        expect(buttons).to.have.length(2)
        expect(buttons.first().props().label).to.equal('Select this one')
        expect(buttons.first().props().primary).to.be.true
        expect(buttons.last().props().label).to.equal('Add another option')
      })
    })
  })

  describe('Comments card...', () => {
    let _card
    beforeEach(() => {
      _card = _wrapper.find(Card).last()
    })

    it('Should render a List.', () => {
      expect(_card.find(List)).to.exist
    })

    it('Should render a ListItem for comment addition.', () => {
      const listItem = _card.find(ListItem).first()
      expect(listItem).to.exist

      expect(listItem.props().leftAvatar.type).to.equal(Avatar)
      expect(listItem.props().leftAvatar.props.src).to.equal('https://avatars0.githubusercontent.com/u/1718791?v=3&s=460') // eslint-disable-line max-len

      expect(listItem.props().primaryText).to.equal('Mel')
      expect(listItem.props().disabled).to.be.true

      const textField = listItem.props().secondaryText
      expect(textField.props.hintText).to.equal('Send a message...')
      expect(textField.props.multiLine).to.be.true
      expect(textField.props.fullWidth).to.be.true
      expect(textField.props.rows).to.equal(2)
      expect(textField.props.rowsMax).to.equal(4)
    })

    it('Should render a Divder.', () => {
      expect(_card.find(Divider).first()).to.exist
    })

    it('Should render an inset Divider for each comment except the last', () => {
      expect(_card.find(Divider)).to.have.length(_props.comments.length)
      _card.find(Divider).forEach((divider, idx) => {
        if (idx === 0) return
        expect(divider.props().inset).to.be.true
      })
    })

    describe('Comments...', () => {
      let _comments, _comment
      beforeEach(() => {
        _comments = _card.find('div')
        _comment = _comments.first()
      })

      it('Should render a comment for each comment and user.', () => {
        expect(_comments).to.have.length(zip(_props.comments, _props.commentUsers).length)
      })

      it('Should render with key `comment-idx`', () => {
        expect(_comment.key()).to.equal('comment-0')
      })

      it('Should render a ListItem', () => {
        const listItem = _comment.find(ListItem)
        expect(listItem).to.exist
        expect(listItem.props().leftAvatar.type).to.equal(Avatar)
        expect(listItem.props().leftAvatar.props.src).to.equal(_props.commentUsers[0].avatar_url)
        expect(listItem.props().primaryText).to.equal(_props.commentUsers[0].name)
        expect(listItem.props().secondaryText).to.equal(_props.comments[0].text)
        expect(listItem.props().disabled).to.be.true
      })
    })
  })
})
