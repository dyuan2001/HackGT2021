import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from './components/LoginPage';
import Profile from './components/Profile'
import {Navigation, Footer, Home, About, LeaderboardPage, AppointmentPage, StorePage} from "./components";
import useWindowDimensions from './hooks/useWindowDimensions';
import background from "./assets/home_bkgd.png";
import bloodtext from "./assets/text_blood.png";

function App() {
  const { height, width } = useWindowDimensions();
  
  return (
    <div className = "App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/RegistrationPage" exact component={() => <RegistrationPage />} />
          <Route path="/Appointments" exact component={() => <AppointmentPage />} />
          <Route path="/LeaderboardPage" exact component={() => <LeaderboardPage />} />
          <Route path="/Store" exact component={() => <StorePage />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/LoginPage" exact component={() => <LoginPage />} />
          <Route path="/Profile" exact component={() => <Profile />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
