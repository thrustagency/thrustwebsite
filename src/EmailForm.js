import MailchimpSubscribe from 'react-mailchimp-subscribe';
import React from 'react';

const url = 'https://thrustagency.us16.list-manage.com/subscribe/post?u=9603efbcb454353944bc29fd6&amp;id=31b65222c0';

export default class EmailForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <MailchimpSubscribe url={url} />;
    }
}
