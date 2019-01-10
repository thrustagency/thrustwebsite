import React from 'react';
import { Link } from 'react-router-dom';
import axios from './axios';

export default class Artist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            perform: '',
            facebook: '',
            soundcloud: '',
            ra: '',
            image: '',
            pressKit: '',
            soundcloudEmbed: '',
            bio: ''
        };
    }

    componentDidMount() {
        axios.get(`/get-artist/${this.props.match.params.name}`)
            .then(resp => {
                const { id, name, perform, facebook, soundcloud, ra, image, pressKit, soundcloudEmbed, bio} = resp.data.artist;
                this.setState({ id, name, perform, facebook, soundcloud, soundcloudEmbed, ra, image, pressKit, bio });
            });
    }

    render() {
        const { name, perform, facebook, soundcloud, soundcloudEmbed, ra, image, pressKit, bio } = this.state;

        return (
            <div className="artist-page-container">
                <div className="big-image-container">
                    <img className="big-image" src={`/photos/${image}`} />
                    <div className="presskit-link-div">
                        <a
                            className="presskit-link"
                            href={pressKit}
                            target="blank"
                        >
                            Download press kit
                        </a>
                    </div>
                </div>
                <div className="artist-page-info-container">
                    <h2 className="artist-title">
                        {name}
                        <Link to="/booking-form" className="artist-book-now">
                            Book now
                        </Link>
                    </h2>

                    <h3 className="artist-perform">{perform}</h3>
                    <div className="artist-social-links-container">
                        <Link to={facebook} target="blank">
                            <img className="artist-social-icon" src="/socialicons/facebook.png" />
                        </Link>
                        <Link to={soundcloud} target="blank">
                            <img className="artist-social-icon" src="/socialicons/soundcloud.png" />
                        </Link>
                        <Link to={ra} target="blank">
                            <img className="ra-icon" className="artist-social-icon" src="/socialicons/ra.png" />
                        </Link>
                    </div>
                    <div className="bio-container">
                        <p className="artist-bio">{bio}</p>
                    </div>
                </div>
                <div className="sc-embed-div">
                    <iframe
                        width="100%"
                        height="400"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/${soundcloudEmbed}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=true&show_teaser=true&visual=true`}
                    />
                </div>
            </div>
        );
    }
}
