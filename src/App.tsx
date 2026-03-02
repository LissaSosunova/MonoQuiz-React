import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import AppRouter from './router/AppRouter'


import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from './theme'


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </ThemeProvider>

    </>
  )
}

export default App
