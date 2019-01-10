import React from 'react'
import { Link } from 'react-router-dom';
import axios from './axios';

export default class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.renderGrid = this.renderGrid.bind(this);
    }

    componentDidMount() {
        axios
        .get('/home-info')
        .then(resp => {
            this.setState({
                worldArtists: resp.data.worldArtists,
                polandArtists: resp.data.polandArtists,
                managementArtists: resp.data.managementArtists
            });
        });
    }

    artistHighlight(e) {
        e.currentTarget.style.backgroundColor = 'white';
        e.currentTarget.children[0].style.filter = 'brightness(100%)';
        e.currentTarget.style.color = 'rgb(247, 245, 245)';
        e.currentTarget.children[3].style.visibility = 'visible';
        e.currentTarget.children[2].style.opacity = '0.7';
    }
    artistUnHighlight(e) {
        e.currentTarget.style.backgroundColor = 'rgb(247, 245, 245)';
        e.currentTarget.style.color = 'rgb(20, 20, 20)';
        e.currentTarget.children[0].style.filter = 'brightness(60%)';
        e.currentTarget.children[3].style.visibility = 'hidden';
        e.currentTarget.children[2].style.opacity = '0.3';
    }

    renderGrid(artists) {
        return artists.map((artist, index) => {
            return (
                <div
                    className="artist-container"
                    key={index}
                    onMouseOver={this.artistHighlight}
                    onMouseOut={this.artistUnHighlight}
                >
                    <div className="artist-image-container">
                        <Link to={`/artist/${artist.url}`}>
                            <img className="artist-image" src={`/photos/${artist.image}`} />
                        </Link>
                    </div>
                    <p className="artist-name artist-block-info">
                        <Link className="artist-name-link underline-class" to={`/artist/${artist.url}`}>{artist.name}</Link>
                    </p>
                    <div className="social-links-container artist-block-info">
                        <Link to={artist.facebook} target="blank">
                            <img className="social-icon underline-class" src="/socialicons/facebook.png"/>
                        </Link>
                        <Link to={artist.soundcloud} target="blank">
                            <img className="social-icon underline-class" src="/socialicons/soundcloud.png"/>
                        </Link>
                        <Link to={artist.ra} target="blank">
                            <img className="ra-icon" className="social-icon underline-class" src="/socialicons/ra.png"/>
                        </Link>
                    </div>
                    <div className="book-now-link-div">
                        <Link
                            to="/booking-form"
                            className="book-now-link underline-class"
                            onMouseOver={this.bookNowLightUp}
                            onMouseOut={this.bookNowUnLight}
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            );
        });
    }

    render() {
        const { worldArtists, polandArtists, managementArtists } = this.state;
        const allArtists = [
            { name: 'Worldwide Bookings', artists: worldArtists },
            { name: 'Poland Bookings', artists: polandArtists },
            { name: 'Management', artists: managementArtists },
        ];


        if (!worldArtists || !polandArtists || !managementArtists) return <span />;

        return (
            <div>
                {allArtists.map(group => (
                    <div>
                        <h2 className="home-titles">{group.name}</h2>
                        <div className="worldwide-artists-container">
                            {this.renderGrid(group.artists)}
                        </div>
                    </div>

                ))}
                <br />
                <br />
            </div>
        );
    }
}
