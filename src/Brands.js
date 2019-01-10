import React from 'react';
import { Link } from 'react-router-dom';
import axios from './axios';

export default class Brands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get("/get-brands").then(resp => this.setState({ brands: resp.data.brands }));
    }

    brandHighlight(e) {
        e.currentTarget.style.backgroundColor = 'white'
        e.currentTarget.children[0].style.filter = 'brightness(100%)';
        e.currentTarget.style.color = 'rgb(247, 245, 245)';
        e.currentTarget.children[3].style.visibility = 'visible';
        e.currentTarget.children[2].style.opacity = '0.7';
    }
    brandUnHighlight(e) {
        e.currentTarget.style.backgroundColor = 'rgb(247, 245, 245)';
        e.currentTarget.style.color = 'rgb(20, 20, 20)';
        e.currentTarget.children[0].style.filter = 'brightness(60%)';
        e.currentTarget.children[3].style.visibility = 'hidden';
        e.currentTarget.children[2].style.opacity = '0.3';
    }

    render() {
        if (!this.state.brands) return <div>Loading...</div>;

        return (
            <div>
                <h2 className="home-titles">Brands</h2>
                <div className="worldwide-artists-container">
                    {this.state.brands.map((brand, index) =>
                         (
                            <div
                                className="artist-container"
                                key={index}
                                onMouseOver={this.brandHighlight}
                                onMouseOut={this.brandUnHighlight}
                            >
                                <div className="artist-image-container">
                                    <Link to={`/brand/${brand.url}`}>
                                        <img className="artist-image" src={`/brands/${brand.logo}`} />
                                    </Link>
                                </div>
                                <p className="artist-name artist-block-info">
                                    <Link className="artist-name-link underline-class" to={`/brand/${brand.url}`}>{brand.name}</Link>
                                </p>
                                <div className="social-links-container artist-block-info">
                                    <Link to={brand.facebook} target="blank">
                                        <img className="social-icon underline-class" src="/socialicons/facebook.png" />
                                    </Link>
                                    <Link to={brand.soundcloud} target="blank">
                                        <img className="social-icon underline-class" src="/socialicons/soundcloud.png" />
                                    </Link>
                                    <Link to={brand.ra} target="blank">
                                        <img className="ra-icon" className="social-icon underline-class" src="/socialicons/ra.png" />
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
                        )
                    )}
                </div>
            </div>
        );
    }
}
