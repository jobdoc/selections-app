import React from 'react'
import HeaderContainer from 'containers/HeaderContainer'
import AppBar from 'material-ui/AppBar'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const storeFake = (state) => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state })
})

describe('(Container) Header', () => {
  let _wrapper, _props, _store

  beforeEach(() => {
    _store = storeFake({
      entities: {
        selections: {
          someId: {
            item: 'Sink'
          }
        }
      }
    })
    _props = {
      params: {
        type: 'plumbing'
      }
    }
    _wrapper = mount(
      <Provider store={_store}>
        <MuiThemeProvider>
          <HeaderContainer {..._props} />
        </MuiThemeProvider>
      </Provider>
    )
  })

  it('Should display the title based on route params.', () => {
    expect(_wrapper.find(AppBar).props().title)
      .to.equal(`${_props.params.type.charAt(0).toUpperCase()}${_props.params.type.slice(1)}`)
    // _wrapper.setProps({
    //   params: {
    //     selectionId: 'someId'
    //   }
    // })
    // _wrapper.mount()
    // console.log(_wrapper.find(AppBar).props());
    // const selectionName = _store.getState().entities.selections.someId.item
    // expect(_wrapper.find(AppBar).props().title)
    //   .to.equal(`${selectionName.charAt(0).toUpperCase()}${selectionName.slice(1)}`)
  })
})
