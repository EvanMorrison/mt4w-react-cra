import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ThemeProvider } from 'styled-components';
import {theme} from './themeStyles';

import HeadingComponent from './Components/SiteHeading/HeadingComponent';
import Navbar from './Components/Navbar';
import HomeContainer from './Components/Home';
import ServicesComponent from './Components/Services';
import MassageComponent from './Components/Services/MassageComponent';
import MLDComponent from './Components/Services/MLDComponent';
import MyofascialComponent from './Components/Services/MyofascialComponent';
import AboutComponent from './Components/About';
import AppointmentComponent from './Components/Appointments';
import Footer from './Components/Footer';
import appState from './data/appState';
import './main.scss';


class App extends React.Component {
  state = {
    position: 0,
    servicesRoutes: [
      appState.homePage.heroPanels[0].route,
      appState.homePage.heroPanels[1].route,
      appState.homePage.heroPanels[2].route,
    ]
  }

  componentDidMount = () => {
    let bannerRef = ReactDOM.findDOMNode(this.refs.banner);
    let bannerHt = bannerRef.getBoundingClientRect().height;
    window.addEventListener('scroll', evt => {
      let position = window.scrollY;
      if (position < bannerHt) {
        this.setState({ bannerPos: position/bannerHt })
      }
      else if (position >= bannerHt && this.state.bannerPos < 1) {
        this.setState({ bannerPos: 1 })
      }
    })
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider >
          <ThemeProvider theme={theme}>
            <div>
              <HeadingComponent ref='banner' position={this.state.bannerPos} />
              <Navbar position={this.state.bannerPos} />
              <Route exact path="/" component={HomeContainer} />
              <Route exact path="/services" component={ServicesComponent} />
              <Route path="/about" component={AboutComponent} />
              <Route path="/appointments" component={AppointmentComponent} />
              <Route path={this.state.servicesRoutes[0]} component={MassageComponent} />
              <Route path={this.state.servicesRoutes[1]} component={MLDComponent} />
              <Route path={this.state.servicesRoutes[2]} component={MyofascialComponent} />
              <Footer />
            </div>
          </ThemeProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}

export default App;
