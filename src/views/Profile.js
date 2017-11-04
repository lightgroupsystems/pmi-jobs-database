import React, { Component } from 'react';
import PropTypes from "prop-types";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Card from "react-md/lib/Cards/Card";
import FontIcon from 'react-md/lib/FontIcons';
import Dropzone from "react-dropzone";
import LinearLoading from "../components/LinearLoading";
import Moment from "react-moment";

const REJECT_FILE_SIZE = 5 * 1024 * 1024;

class Profile extends Component {

    constructor() {
        super();

        this.handleDropFile = this.handleDropFile.bind(this);
    }

    componentWillMount() {
        this.props.watchProfile();
    }

    componentWillUnmount() {
        this.props.offWatchProfile();
    }

    handleDropFile(acceptedFiles, rejectedFiles) {
        if ((rejectedFiles && rejectedFiles.length > 1) || (acceptedFiles && acceptedFiles.length > 1)) {
            this.props.sendNotification("You can only upload one file at a time");
            return;
        }
        if (rejectedFiles && rejectedFiles.length > 0) {
            if (rejectedFiles[0].size >= REJECT_FILE_SIZE)
                this.props.sendNotification(`The resume should not weigh more than ${REJECT_FILE_SIZE/1024/1024} megabytes`);
            else
                this.props.sendNotification("The resume must be a valid pdf");
            return;
        }

        this.props.uploadResume(acceptedFiles[0]);
    }

    render() {

        const {email, memberID, name, resume, resumeDate} = this.props.user;
        const isLoading = this.props.isLoading;

        let resumeInfo = "(None)";
        if (resume)
        {
            let resumeDateJs = new Date(resumeDate);
            resumeInfo = <span><a href={resume} target="_blanck" className="specialLink">File</a> uploaded <Moment fromNow date={resumeDateJs} /></span>
        }


        return (
            <div className="md-grid">
                <Card className="md-cell md-cell--4">
                    <LinearLoading id="register-loading" isLoading={isLoading}/>
                    <CardTitle title={name} />
                    <CardText>
                        <div className="md-grid">
                            <div className="md-cell md-cell--4 md-cell--4-tablet md-cell--2-phone md-font-bold">Member ID:&nbsp;</div>
                            <div className="md-cell md-cell--8 md-cell--4-tablet md-cell--2-phone text-overflow-ellipsis">{memberID}</div>
                            <div className="md-cell md-cell--4 md-cell--4-tablet md-cell--2-phone md-font-bold">Email:&nbsp;</div>
                            <div className="md-cell md-cell--8 md-cell--4-tablet md-cell--2-phone text-overflow-ellipsis">{email}</div>
                            <div className="md-cell md-cell--4 md-cell--4-tablet md-cell--2-phone md-font-bold">Resume:&nbsp;</div>
                            <div className="md-cell md-cell--8 md-cell--4-tablet md-cell--2-phone text-overflow-ellipsis">{resumeInfo}</div>
                        </div>
                        <br/>
                        <Dropzone accept=".pdf" maxSize={REJECT_FILE_SIZE} activeClassName="dropzone-file-active" className="dropzone-file" disabled={isLoading} multiple={false} onDrop={this.handleDropFile}>
                            <div className="md-text-center" style={{padding: 5}}><FontIcon forceSize={60} forceFontSize={true}>cloud_upload</FontIcon></div>
                            <div className="md-text-center" style={{padding: 15}}>Drop here your resume to upload, or click.</div>
                        </Dropzone>
                    </CardText>
                </Card>
            </div>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.any,
    isLoading: PropTypes.bool,
    watchProfile: PropTypes.func.isRequired,
    offWatchProfile: PropTypes.func.isRequired,
    uploadResume: PropTypes.func.isRequired,
    sendNotification: PropTypes.func.isRequired
};

export default Profile;
