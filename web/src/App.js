import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './components/admin';
import User from './components/user';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>

        <Route path="/">
          <User />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
