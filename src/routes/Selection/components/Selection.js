import React from 'react'
import './Selection.scss'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import { Tabs, Tab } from 'material-ui/Tabs'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

export class Selection extends React.Component {
  componentWillMount () {
    // this.props.loadSelection(this.props.params.selectionId)
  }

  render () {
    return (
      <div className='selection__container'>
        <Card>
          <CardTitle
            title={this.props.selection.name}
            subtitle={this.props.selection.location}
            actAsExpander
            showExpandableButton
          />
          <CardMedia>
            <Stepper activeStep={1}>
              <Step>
                <StepLabel>Outstanding</StepLabel>
              </Step>
              <Step>
                <StepLabel>Choices offered</StepLabel>
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
            Update status
            <br />
            <DropDownMenu value={1}>
              <MenuItem value={1} primaryText='Outstanding' />
              <MenuItem value={2} primaryText='Choices offered' />
              <MenuItem value={3} primaryText='Selection made' />
              <MenuItem value={4} primaryText='Ordered' />
            </DropDownMenu>
            <br />
            Update description
            <br />
            <TextField
              hintText='Description'
              value={this.props.selection.description}
              multiLine
              fullWidth
              rows={1}
              rowsMax={4}
            />
          </CardText>
          <CardActions expandable>
            <FlatButton label='Save' primary />
            <FlatButton label='Cancel' />
          </CardActions>
        </Card>
        <Card>
          <Tabs>
            {this.props.selection.choices.map((choice, idx) => {
              return (
                <Tab label={`Option ${++idx}`} key={choice.id}>
                  <CardMedia>
                    <img src={choice.image_url} alt={choice.model} />
                  </CardMedia>
                  <List>
                    <a className='selection__list-link' href={choice.url} target='_blank'>
                      <ListItem
                        primaryText={choice.model}
                        secondaryText={choice.manufacturer}
                      />
                    </a>
                  </List>
                  <CardText>{choice.description}</CardText>
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
            {this.props.selection.comments.map((comment, idx) => {
              return (
                <div key={`comment-${idx}`}>
                  <ListItem
                    leftAvatar={<Avatar src={comment.user.avatar_url} />}
                    primaryText={comment.user.name}
                    secondaryText={comment.text}
                    disabled
                  />
                  {idx < this.props.selection.comments.length - 1 ? <Divider inset /> : ''}
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
    name             : React.PropTypes.string,
    location         : React.PropTypes.string,
    status           : React.PropTypes.string,
    allowance        : React.PropTypes.number,
    description      : React.PropTypes.string,
    choices          : React.PropTypes.arrayOf(React.PropTypes.shape({
      url            : React.PropTypes.string,
      manufacturer   : React.PropTypes.string,
      model          : React.PropTypes.string,
      item_code      : React.PropTypes.string,
      description    : React.PropTypes.string,
      id             : React.PropTypes.string.isRequired
    })),
    comments         : React.PropTypes.arrayOf(React.PropTypes.shape({
      text           : React.PropTypes.string,
      user           : React.PropTypes.shape({
        name         : React.PropTypes.string,
        avatar_url   : React.PropTypes.string
      })
    }))
  }),
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
    status: 'choices offered',
    allowance: 300,
    choices: [
      {
        id: '23kj32kj2k',
        image_url: 'https://www.rohlhome.com/Images/i21126.JPG',
        url: 'https://www.rohlhome.com/Kitchen/Product_Detail.aspx?ProductID=U.4272-21652&Collection=1619&SubCollection=1652&ConnectionString=%22Product.Perrin%20^%20Rowe$S$$P$$C$0%22',
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
        image_url: 'http://kohler.scene7.com/is/image/PAWEB/Category_Template?$PDPcon$&$gradient_src=PAWEB%2Forganic-gradient&$shadow_src=PAWEB%2FBlank&$Badge1_src=PAWEB%2F2New&$Badge4_src=PAWEB%2FBlank&$Badge3_src=PAWEB%2FBlank&$Badge2_src=PAWEB%2FBlank&$product_src=is{PAWEB%2Fzab35855_rgb}',
        url: 'http://www.us.kohler.com/us/baross-touchless-kitchen-faucet/productDetail/kitchen-sink-faucets/1280604.htm;jsessionid=A858D57DDCAF454CBA986C3FDEE36454.kohler-prod2-ecom2?skuId=1280602&brandId=1117946',
        manufacturer: 'Kohler',
        model: 'Barossa',
        item_code: 'K-R78035-SD-VS',
        description: 'With a state-of-the-art sensor conveniently located underneath the spout, the Barossa faucet with Response® touchless technology works with your hand’s natural position in the sink while helping prevent the spread of germs and reducing soap and water stains. Barossa\'s hidden sensor maintains the integrity of the easy-to-clean design, and simple installation makes for a quick and beautiful update to the busiest room in your home.'
      }
    ],
    comments: [
      {
        text: 'Love these choices.',
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
    ]
  }
}

export default Selection
