import "core-js"; // for IE
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './materialize';
import './materialize.css';
import '../node_modules/react-datepicker/dist/react-datepicker.css';
import './index.css';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import store from './store/store'

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Index />,  document.getElementById('root'));


