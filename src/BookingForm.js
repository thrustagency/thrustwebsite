import React from 'react';
import axios from './axios';

export default class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artistName: '',
            date: '',
            city: '',
            country: '',
            venueName: '',
            venueAddress: '',
            venueCapacity: '',
            openingTime: '',
            artistSetTime: '',
            lineupProposal: '',
            doorPrice: '',
            promoterName: '',
            promoterEmail: '',
            promoterNumber: '',
            promoterFacebook: '',
            contractName: '',
            contractEmail: '',
            vatNumber: '',
            offerAndConditions: '',
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        axios.post("/submit-form", this.state).then(data => {
            if (data.error) this.setState({ error: true });
            location.pathname = "/request-sent";
        });
    }

    handleChange(e, field) {
        this.setState({ [field]: e.currentTarget.value });
    }

    render() {
        return (
            <div id="booking-form-container">
                <form id="booking-form">
                    <div id="booking-artist-info">
                        <h3 className="booking-titles">Event Info</h3>
                        <p className="form-p">Artist Name(s)</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Artist Name(s)"
                            ref={input => this.artistName = input}
                            onChange={(e) => this.handleChange(e, 'artistName')}
                        />
                        <p className="form-p">Event Date</p>
                        <input
                            type="date"
                            className="booking-form-input"
                            placeholder="Date"
                            onChange={(e) => this.handleChange(e, 'date')}
                        />
                        <p className="form-p">City</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="City"
                            onChange={(e) => this.handleChange(e, 'city')}
                        />
                        <p className="form-p">Country</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Country"
                            onChange={(e) => this.handleChange(e, 'country')}
                        />
                        <p className="form-p">Venue Name</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Venue Name"
                            onChange={(e) => this.handleChange(e, 'venueName')}
                        />
                        <p className="form-p">Venue Address</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Venue Address"
                            onChange={(e) => this.handleChange(e, 'venueAddress')}
                        />
                        <p className="form-p">Venue Capacity</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Venue Capacity"
                            onChange={(e) => this.handleChange(e, 'venueCapacity')}
                        />
                        <p className="form-p">Event Hours</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Open Time - Close Time"
                            onChange={(e) => this.handleChange(e, 'openingTime')}
                        />
                        <p className="form-p">Artist Set Time(s)</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Artist Set Time(s)"
                            onChange={(e) => this.handleChange(e, 'artistSetTime')}
                        />
                        <p className="form-p">Lineup Proposal</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Lineup Proposal (in billing order)"
                            onChange={(e) => this.handleChange(e, 'lineupProposal')}
                        />
                        <p className="form-p">Door Price</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Door Price"
                            onChange={(e) => this.handleChange(e, 'doorPrice')}
                        />
                    </div>
                    <div id="booking-promoter-info">
                        <h3 className="booking-titles">Promoter Info</h3>

                        <p className="form-p">Promoter Name(s)</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Promoter Name(s)"
                            onChange={(e) => this.handleChange(e, 'promoterName')}
                        />
                        <p className="form-p">Promoter Email(s)</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Promoter Email(s)"
                            onChange={(e) => this.handleChange(e, 'promoterEmail')}
                        />
                        <p className="form-p">Promoter Number</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Promoter Number"
                            onChange={(e) => this.handleChange(e, 'promoterNumber')}
                        />
                        <p className="form-p">Promoter Facebook</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Promoter Facebook"
                            onChange={(e) => this.handleChange(e, 'promoterFacebook')}
                        />
                        <p className="form-p">Contract Name</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Contact Name"
                            onChange={(e) => this.handleChange(e, 'contactName')}
                        />
                        <p className="form-p">Contract Email</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="Contact Email"
                            onChange={(e) => this.handleChange(e, 'contactEmail')}
                        />
                        <p className="form-p">VAT Number</p>
                        <input
                            type="text"
                            className="booking-form-input"
                            placeholder="VAT Number"
                            onChange={(e) => this.handleChange(e, 'vatNumber')}
                        />
                    </div>
                    <br />
                    <br />
                    <div id="additional-info-container">
                        <h3 className="booking-titles">Offer & Conditions</h3>
                        <p className="form-p">
                            Please include the offer and any relevant
                            conditions.
                        </p>
                        <textarea
                            className="booking-form-input"
                            id="additional-info-input"
                            placeholder="Offer & Conditions"
                            onChange={(e) => this.handleChange(e, 'offerAndConditions')}
                        />

                        <button id="submit-request-button" onClick={this.submitForm}>Submit Request</button>
                        {this.state.error && <p>Something went wrong. Please try again</p>}
                    </div>
                </form>
            </div>
        );
    }
}
