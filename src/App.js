import React, { Component } from "react";


//Router
import { BrowserRouter, HashRouter } from 'react-router-dom';

import history from './helper/history';
// Redux
import { Provider } from "react-redux"
import { createStore } from "redux"
import allReducers from "./reducer"

import HeaderMenu from "./components/HeaderMenu";
import SearchForm from "./components/SearchForm";
import FixContentBody from "./components/FixContentBody";
import { ToastProvider } from "react-toast-notifications";

import ContentSlider from "./components/ContentSlider";
import Footers from "./components/Footers";

import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation } from 'swiper';
import MessengerCustomerChat from 'react-messenger-customer-chat';


let store = createStore(allReducers)

SwiperCore.use([Navigation]);

class App extends Component {


  componentDidMount() {
    const script = document.createElement("script");
    script.src = process.env.PUBLIC_URL + '/LibCustom/js/main.js';
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <div className="App">
            <ToastProvider autoDismiss={true} autoDismissTimeout="2000">
              <MessengerCustomerChat
                pageId="187341811901684"
                appId="560238484992631"
              />
              <HeaderMenu />
              <SearchForm />
              <FixContentBody />
              {/* <ContentSlider /> */}
              <Footers />
            </ToastProvider>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
