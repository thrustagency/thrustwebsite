import React from 'react';
import { Link } from 'react-router-dom';
import EmailForm from './EmailForm';

const Contact = () => {
    const team = [
        { name: 'Fabio Venezia', role: 'Bookings & Management', src: 'fabio.jpg' },
        { name: 'Silvio Venezia', role: 'Bookings & Finances', src: 'silvio.jpg' },
        { name: 'Adrian Ziegler', role: 'Bookings (GER)', src: 'adrian.jpg' }
    ];

    return (
        <div id="contact-container">
            <div id="contact-about-container">
                <h2 className="contact-h3">THRUST | Boutique Creative & Artist Agency</h2>
                <p id="thrust-slogan">
                    Our mission is to develop artists, giving music and art a
                    place within the ever-changing underground scenes.
                </p>

                <div id="connect-with-us-div">
                    <p id="connect-with-us-p">Connect with us: </p>
                    <Link to="https://www.facebook.com/thrustagency/" target="blank">
                        <img className="social-icon connect-icon" src="/socialicons/facebook.png"/>
                    </Link>
                    <Link to="https://www.instagram.com/voxnoxrecords/" target="blank">
                        <img className="social-icon connect-icon" src="/socialicons/instagram.png"/>
                    </Link>
                    <a to="mailto:fabio@thrustagency.com" target="blank">
                        <img className="social-icon connect-icon" src="/socialicons/mail.png"/>
                    </a>
                </div>
                <br />
                <div id="subscribe-form">
                    <p className="inline" id="subscribe">Subscribe to our mailing list:</p>
                    <br />
                    <br />
                    <EmailForm />
                </div>
                <br />
                <p id="privacy-policy">View our privacy policy{" "}<Link to="/privacy-policy" id="privacy-link">here</Link></p>
            </div>
            <br />
            <h2 className="contact-h3">The Team</h2>
            <div id="contact-team-container">
                {team.map(member =>
                    <div className="team-div-member" key={member.name}>
                        <img className="team-member-photo" src={`/photos/${member.src}`} />
                        <h4 className="contact-h4">{member.name}</h4>
                        <h5 className="contact-h5">{member.role}</h5>
                    </div>
                )}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Contact;
