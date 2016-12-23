import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './CoreLayout.scss'
import '../../styles/core.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div className='core-layout__container'>
      <div className='core-layout__header'>
        <Header />
      </div>
      <div className='core-layout__sidebar'>
        <Sidebar />
      </div>
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
