import React from 'react'
import Header from 'containers/HeaderContainer'
import Sidebar from 'components/Sidebar'
import './CoreLayout.scss'
import '../../styles/core.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export const CoreLayout = ({ location, params, children }) => (
  <MuiThemeProvider>
    <div className='core-layout__container'>
      <div className='core-layout__header'>
        <Header params={params} />
      </div>
      <div className='core-layout__sidebar'>
        <Sidebar pathname={location.pathname} />
      </div>
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
  params   : React.PropTypes.object,
  location : React.PropTypes.object
}

export default CoreLayout
