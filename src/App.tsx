import Layout from './components/Layout'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import SignIn from './components/SignIn'
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
