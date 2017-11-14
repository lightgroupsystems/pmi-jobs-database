import React, { Component } from 'react';
import PropTypes from "prop-types";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Card from "react-md/lib/Cards/Card";
import Moment from "react-moment";

class UsersPanel extends Component {
    render() {

        var result = [];
        for (var i=0; i < users.length; i++) {
          var user = users[i];
          const {email, name, resume, resumeDate} = user;
          let resumeInfo = "(None)";
          if (resume)
          {
              let resumeDateJs = new Date(resumeDate);
              resumeInfo = <span><a href={resume} target="_blanck" className="specialLink">File</a> uploaded <Moment fromNow date={resumeDateJs} /></span>
          }
          result.push(
            <div key={i} className="md-grid">
              <Card className="md-cell md-cell--4">
                  <CardTitle title={name} />
                  <CardText>
                      <div className="md-grid">
                          <div className="md-cell md-cell--4 md-cell--4-tablet md-cell--2-phone md-font-bold">Email:&nbsp;</div>
                          <div className="md-cell md-cell--8 md-cell--4-tablet md-cell--2-phone text-overflow-ellipsis">{email}</div>
                          <div className="md-cell md-cell--4 md-cell--4-tablet md-cell--2-phone md-font-bold">Resume:&nbsp;</div>
                          <div className="md-cell md-cell--8 md-cell--4-tablet md-cell--2-phone text-overflow-ellipsis">{resumeInfo}</div>
                      </div>
                      <br/>
                  </CardText>
              </Card>
          </div>);
        }
        return <div>{result}</div>;
    }
}

UsersPanel.propTypes = {
    id: PropTypes.string.isRequired
};

export default UsersPanel;
