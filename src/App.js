import 'App.css'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import theme from 'config/theme'
import Header from 'components/shell/Header'
import Pages from 'components/pages'
import { UserProvider } from 'context/context'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
