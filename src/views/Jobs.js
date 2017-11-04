import React, { Component } from 'react';
import Button from "react-md/lib/Buttons/Button";
import CardActions from "react-md/lib/Cards/CardActions";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Card from "react-md/lib/Cards/Card";

class Jobs extends Component {
    render() {
        return (
            <div className="md-grid">
                <Card className="md-cell">
                    <CardTitle title="Jobs"  />
                    <CardText>
                        Jobs...
                    </CardText>
                    <CardActions>
                        <Button flat>Action 1</Button>
                        <Button flat>Action 2</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Jobs;
