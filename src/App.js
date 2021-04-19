import 'App.css'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import theme from 'config/theme'
import Header from 'components/shell/Header'
import Pages from 'components/pages'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Pages />
      </div>
    </ThemeProvider>
  )
}

export default App
