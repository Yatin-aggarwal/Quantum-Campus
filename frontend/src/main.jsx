
import { store } from './app/store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {FirebaseProvider} from "./Context.jsx";





createRoot(document.getElementById('root')).render(

      <Provider store={store}>
          <FirebaseProvider>
            <App/>
          </FirebaseProvider>
      </Provider>

)
