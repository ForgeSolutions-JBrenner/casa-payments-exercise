import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import {Toaster} from 'react-hot-toast'
import Success from './pages/StripePages/Success';
import Cancel from './pages/StripePages/Cancel';
import AuthRoutes from './components/routes/AuthRoutes'
import Account from './pages/Account'

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{
        duration: 1000,
      }}/>
    <Switch>
      <AuthRoutes exact path="/" component ={Home}/>
      <Route exact path="/register" component ={Register}/>
      <Route exact path="/login" component ={Login}/>
      <AuthRoutes exact path="/stripe/success" component ={Success}/>
      <AuthRoutes exact path="/stripe/cancel" component ={Cancel}/>
      <AuthRoutes exact path="/account" component ={Account}/>
    </Switch>
    </Router>
  );
}

export default App;
