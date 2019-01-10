import React from "react";
import { Link } from "react-router-dom";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import axios from "./axios";
import Header from "./Header";
import Home from "./Home";
import Artists from "./Artists";
import Artist from "./Artist";
import Brands from "./Brands";
import Brand from "./Brand";
import Info from "./Info";
import BookingForm from "./BookingForm";
import FormSent from "./FormSent";
import PrivacyPolicy from "./PrivacyPolicy";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import CookieBanner from "react-cookie-banner";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/artists" component={Artists} />
                        <Route exact path="/artist/:name" component={Artist} />
                        <Route exact path="/brands" component={Brands} />
                        <Route exact path="/brand/:name" component={Brand} />
                        <Route exact path="/info" component={Info} />
                        <Route
                            exact
                            path="/booking-form"
                            component={BookingForm}
                        />
                        <Route
                            exact
                            path="/request-sent"
                            component={FormSent}
                        />
                        <Route
                            exact
                            path="/privacy-policy"
                            component={PrivacyPolicy}
                        />
                        <CookieBanner
                            message="This site uses cookies. By continuing to browse the site, you are agreeing to our use of cookies."
                            onAccept={() => {}}
                            cookie="user-has-accepted-cookies"
                        />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
