import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Profiler id="App" onRender={(id, phase, actualDuration) => {
        console.log({ id, phase, actualDuration })
      }}>
        <App />
      </Profiler>
    </Provider>
  </StrictMode>,
)

