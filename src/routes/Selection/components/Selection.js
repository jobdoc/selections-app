import React from 'react'
import './Selection.scss'
import zip from 'lodash/zip'
import EditSelectionInfoForm from '../containers/EditSelectionInfoFormContainer'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { Tabs, Tab } from 'material-ui/Tabs'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

const statuses = [
  'outstanding',
  'options offered',
  'selection made',
  'ordered'
]
export class Selection extends React.Component {
  componentWillMount () {
    this.props.loadSelection(this.props.params.selectionId)
    this.state = {
      expanded: false
    }
  }

  _handleSelectionInfoFormCancel = () => {
    this.setState({
      expanded: false
    })
  }

  _handleExpandChange = (expanded) => {
    this.setState({
      expanded
    })
  }

  render () {
    return (
      <div className='selection__container'>
        <Card
          expanded={this.state.expanded}
          onExpandChange={this._handleExpandChange}
        >
          <CardTitle
            title={this.props.selection.item}
            subtitle={this.props.selection.room}
            actAsExpander
            showExpandableButton
          />
          <CardMedia>
            <Stepper activeStep={statuses.indexOf(this.props.selection.status)}>
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
          </CardMedia>
          <CardText>
            {this.props.selection.description}
          </CardText>
          <CardText expandable>
            <EditSelectionInfoForm onCancel={this._handleSelectionInfoFormCancel} />
          </CardText>
        </Card>
        <Card>
          <Tabs>
            {this.props.options.map((option, idx) => {
              return (
                <Tab label={`Option ${++idx}`} key={option.id}>
                  <CardMedia>
                    <img src={option.image_url} alt={option.model} />
                  </CardMedia>
                  <List>
                    <a className='list-link' href={option.url} target='_blank'>
                      <ListItem
                        primaryText={option.model}
                        secondaryText={option.manufacturer}
                      />
                    </a>
                  </List>
                  <CardText>{option.description}</CardText>
                  <CardActions>
                    <FlatButton label='Select this one' primary />
                    <FlatButton label='Add another option' />
                  </CardActions>
                </Tab>
              )
            })}
          </Tabs>
        </Card>
        <Card>
          <List>
            <ListItem
              leftAvatar={<Avatar src='https://avatars0.githubusercontent.com/u/1718791?v=3&s=460' />}
              primaryText='Mel'
              disabled
              secondaryText={
                <TextField
                  hintText='Send a message...'
                  multiLine
                  fullWidth
                  rows={2}
                  rowsMax={4}
                />
              }
            />
            <Divider />
            {zip(this.props.comments, this.props.commentUsers).map(([comment, user], idx) => {
              return (
                <div key={`comment-${idx}`}>
                  <ListItem
                    leftAvatar={<Avatar src={user.avatar_url} />}
                    primaryText={user.name}
                    secondaryText={comment.text}
                    disabled
                  />
                  {idx < this.props.comments.length - 1 ? <Divider inset /> : ''}
                </div>
              )
            })}
          </List>
        </Card>
      </div>
    )
  }
}

Selection.propTypes = {
  selection          : React.PropTypes.shape({
    item             : React.PropTypes.string,
    room             : React.PropTypes.string,
    status           : React.PropTypes.string,
    allowance        : React.PropTypes.string,
    description      : React.PropTypes.string
  }),
  options            : React.PropTypes.arrayOf(React.PropTypes.shape({
    url              : React.PropTypes.string,
    manufacturer     : React.PropTypes.string,
    model            : React.PropTypes.string,
    item_code        : React.PropTypes.string,
    description      : React.PropTypes.string,
    id               : React.PropTypes.string.isRequired
  })),
  comments           : React.PropTypes.arrayOf(React.PropTypes.shape({
    text             : React.PropTypes.string
  })),
  commentUsers       : React.PropTypes.arrayOf(React.PropTypes.shape({
    name             : React.PropTypes.string,
    avatar_url       : React.PropTypes.string
  })),
  loadSelection      : React.PropTypes.func,
  params             : React.PropTypes.shape({
    selectionId      : React.PropTypes.string
  })
}

Selection.defaultProps = {
  selection: {
    name: 'Faucet',
    location: 'Kitchen',
    description: 'This faucet is for the kitchen island.',
    status: 'options offered',
    allowance: '300'
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
  ]
}

export default Selection
