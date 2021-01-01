import { Router } from '@reach/router'
import UserProvider from './providers/userProvider'
import Login from './pages/Login'
import MainApp from './pages/MainApp'

const App = () => {
  return (
    <UserProvider>
      <Router>
        <MainApp path="/" />
        <Login path="/login" />
      </Router>
    </UserProvider>
  )
}

export default App
