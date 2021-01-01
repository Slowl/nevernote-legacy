import UserProvider from './providers/userProvider'
import MainApp from './pages/MainApp'

const App = () => {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  )
}

export default App
