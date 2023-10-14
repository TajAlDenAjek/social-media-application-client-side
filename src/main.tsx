import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux' // subscriber to the store
import { store } from './app/store.tsx'

// const SERVER_SIDE=import.meta.env.VITE_REACT_API_KEY 
// console.log(SERVER_SIDE)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
