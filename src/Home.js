import React from 'react';
import EmailForm from './EmailForm';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { toggleEmailForm: false };
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.closeSignUp = this.closeSignUp.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.toggleSignUp();
        }, 4500);
    }

    toggleSignUp() {
        this.setState({ toggleEmailForm: !this.state.toggleEmailForm });
    }

    closeSignUp() {
        this.setState({ toggleEmailForm: false });
    }

    render() {
        return (
            <div id="home-container">
                {this.state.toggleEmailForm && (
                    <div id="home-overlay">
                        <div id="home-email-form-container">
                            <p id="close-overlay" onClick={this.closeSignUp}>x</p>
                            <h2 id="sign-up-home">Sign up to our mailing list</h2>
                            <EmailForm />
                        </div>
                    </div>
                )}
                <div id="home-logo-container">
                    <img src="/logos/blacklogowithtext.png" id="home-logo" />
                </div>
            </div>
        );
    }
}
