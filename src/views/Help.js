import React, { Component } from 'react';
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Card from "react-md/lib/Cards/Card";
import localRepository from '../localRepository';

class Help extends Component {
    render() {
        let supportEmail = localRepository.supportEmail.get();

        return (
            <div className="md-grid">
                <Card className="md-cell">
                    <CardTitle title="Help"  />
                    <CardText>
                        <p>Send us an email with any questions or inquiries. We would be happy to answer your questions.</p>
                        <p>Email: <a href={"mailto:" + supportEmail}>{supportEmail}</a></p>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default Help;
