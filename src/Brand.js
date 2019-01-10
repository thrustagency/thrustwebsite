import React from 'react';
import { Link } from 'react-router-dom';
import axios from './axios';
import styled from 'styled-components';

export default class Brand extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const brandName = this.props.match.params.name;

        axios
            .get('/get-brands')
            .then(({ data }) => data.brands.filter(b => b.url === brandName))
            .then(brand => this.setState({ brand: brand[0] }));
    }

    render() {
        if (!this.state.brand) return <Container>Loading</Container>;
        const { brand: { name, bio1, img, logo, bio2, iframeSrc, soundcloudEmbed, facebook, soundcloud, ra } } = this.state;

        return (
            <Container>
                <Title>{name}</Title>
                <Description>{bio1}</Description>
                <Img src={`/brands/${img || logo}`} />
                <Description>{bio2}</Description>

                {iframeSrc && (
                    <iframe
                        id="youtube-iframe"
                        width="100%"
                        height="345"
                        padding="0"
                        src={iframeSrc}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                )}

                {soundcloudEmbed && (
                    <iframe
                        width="100%"
                        height="400"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/${soundcloudEmbed}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=true&show_teaser=true&visual=true`}
                    />
                )}

                <BookNowLink to="/booking-form">Book now</BookNowLink>
                <SocialIconsContainer>
                    <SocialIconLink href={facebook} target="_blank">
                        <SocialIcon src="/socialicons/facebook.png" />
                    </SocialIconLink>
                    <SocialIconLink href={soundcloud} target="_blank">
                        <SocialIcon src="/socialicons/soundcloud.png" />
                    </SocialIconLink>
                    <SocialIconLink href={ra} target="_blank">
                        <SocialIcon src="/socialicons/ra.png" />
                    </SocialIconLink>
                </SocialIconsContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    width: 650px;
    margin: 0 auto;
    text-align: center;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 28px;
`;

const Description = styled.p`
    text-align: justify;
    margin: 30px 0;
`;

const Img = styled.img`
    width: 80%;
    margin: 10px 0;
`;

const BookNowLink = styled(Link)`
    text-decoration: none;
    font-size: 28px;
    padding: 0 0 30px 0;
    color: rgb(20, 20, 20);

    :hover {
        color: rgb(20, 20, 20, 0.5);
    }
`;

const SocialIconsContainer = styled.div`
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 30px 0 40px 0;
    height: 50px;
`;

const SocialIconLink = styled.a`
    margin: 0 5%;
`;

const SocialIcon = styled.img`
    height: 30px;
`;
