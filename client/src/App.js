import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Routers from './routes/route';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routers></Routers>
      </Provider>
    </div>
  );
}

export default App;
