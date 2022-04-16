import Layout from './components/Layout'
import { Provider } from 'react-redux'
import { store } from './app/store'

const App = () => {
  return (
    <Provider store={store}>
      {/* Gradient Color Stops https://tailwindcss.com/docs/gradient-color-stops */}
      <div className="m-0 overflow-hidden h-[100vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <Layout />
      </div>
    </Provider>
  )
}

export default App
