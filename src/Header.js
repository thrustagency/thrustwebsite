import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
        return (
            <header>
                <div id="header-container" className="centre">
                    <Link to="/">
                        <img id="logo" src="/logos/thrust.png" />
                    </Link>
                    <div id="contact-header-div">
                        <Link to="/artists" className="contact-header-link">
                            Artists
                        </Link>
                        <Link to="/brands" className="contact-header-link">
                            Brands
                        </Link>
                        <Link
                            to="/booking-form"
                            className="contact-header-link"
                        >
                            Booking
                        </Link>
                        <Link to="/info" className="contact-header-link">
                            Info
                        </Link>
                    </div>
                </div>
            </header>
        );
}

export default Header;
