import React, { Component } from 'react';
import PropTypes from "prop-types";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Card from "react-md/lib/Cards/Card";
import {Switch,TextField,Button, DialogContainer, Checkbox } from "react-md";
import LinearLoading from "../components/LinearLoading";
import actionTypes from '../constants/userCardTypes';
import FontIcon from 'react-md/lib/FontIcons';
import Dropzone from "react-dropzone";
import Moment from "react-moment";


const REJECT_FILE_SIZE = 5 * 1024 * 1024;

class UserCard extends Component {

    constructor() {
        super();
        this.state = {
            isAdmin: true,
            visible: false
        };
        this.handleDropFile = this.handleDropFile.bind(this);
        this.changeIsAdmin = this.changeIsAdmin.bind(this);
        this.changeIsMember = this.changeIsMember.bind(this);
        this.changeIsCompany = this.changeIsCompany.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.hide = this.hide.bind(this);
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
        this.props.uploadResume(this.props.user.userID,acceptedFiles[0]);
    }

    changeIsAdmin(){
        this.props.isAdminChanged(this.props.user.userID, !this.props.user.clearances.isAdmin);
    }

    changeIsMember(){
        this.props.isMemberChanged(this.props.user.userID, !this.props.user.clearances.isMember);
    }

    changeIsCompany(){
        this.props.isCompanyChanged(this.props.user.userID, !this.props.user.clearances.isCompany);
    }

    handleDelete(){
        this.hide();
        console.log("Se deletea user")
        this.props.isUserDeleted(this.props.user.userID);
    }

    show = () => {
        this.setState({ visible: true });
    };

    hide = () => {
        this.setState({ visible: false });
    };


    changeMemberID(event){
    }

    render() {
      let resumeComp;
      let resumeDateJs;
      const {email, memberID, name, surname, resume, resumeDate,clearances} = this.props.user;
      const {isLoading} = this.props;
      const { visible } = this.state;

      if (resume)
      {
          resumeDateJs = new Date(resumeDate);
          let resumeInfo = <span><a href={resume} target="_blanck" className="specialLink">File</a> uploaded <Moment fromNow date={resumeDateJs} /></span>
          resumeComp = [<div key={1} className="md-cell md-cell--4 md-cell--4-tablet md-cell--12-phone md-font-bold">Resume:&nbsp;</div>,<div key={2} className="md-cell md-cell--8 md-cell--4-tablet md-cell--12-phone text-overflow-ellipsis">{resumeInfo}</div>];
      }
      var dropZone;
      if( this.props.showDropArea){
          dropZone  = <Dropzone accept=".pdf" maxSize={REJECT_FILE_SIZE} activeClassName="dropzone-file-active" className="dropzone-file" disabled={isLoading} multiple={false} onDrop={this.handleDropFile}>
              <div className="md-text-center" style={{padding: 5}}><FontIcon forceSize={60} forceFontSize={true}>cloud_upload</FontIcon></div>
              <div className="md-text-center" style={{padding: 15}}>Drop here your resume to upload, or click.</div>
          </Dropzone>;
      }
      let clearancesComp;
      if(clearances){
          clearancesComp = [
              <div key={1} className="md-cell md-cell--6 md-cell--4-tablet md-cell--12-phone md-font-bold">Is admin:&nbsp;</div>,
              <div key={2} className="md-cell md-cell--6 md-cell--4-tablet md-cell--12-phone text-overflow-ellipsis"><input type="checkbox" id="admin-checkbox" name="is-admin" aria-label="is admin" onChange={this.changeIsAdmin} checked={clearances.isAdmin}/></div>,
              <div key={3} className="md-cell md-cell--6 md-cell--4-tablet md-cell--12-phone md-font-bold">Is member:&nbsp;</div>,
              <div key={4} className="md-cell md-cell--6 md-cell--4-tablet md-cell--12-phone text-overflow-ellipsis"><input type="checkbox" id="admin-checkbox" name="is-admin" aria-label="is member" onChange={this.changeIsMember} checked={clearances.isMember}/></div>,
              <div key={5} className="md-cell md-cell--6 md-cell--4-tablet md-cell--12-phone md-font-bold">Is company:&nbsp;</div>,
              <div key={6} className="md-cell md-cell--6 md-cell--4-tablet md-cell--12-phone text-overflow-ellipsis"><input type="checkbox" id="admin-checkbox" name="is-admin" aria-label="is company" onChange={this.changeIsCompany} checked={clearances.isCompany}/></div>
          ];
      };

      const actions = [];
      actions.push(<Button raised primary onClick={this.hide}>Cancel</Button>);
      actions.push(<Button raised primary onClick={this.handleDelete}>Confirm</Button>);

      return (
          <Card className="md-cell md-cell--4 md-cell--4-tablet md-cell--12-phone">
              <LinearLoading id="register-loading" isLoading={isLoading}/>
              <div className="md-grid">
                <div className="md-cell md-cell--6 md-cell--12-tablet md-cell--12-phone text-overflow-ellipsis">
                  <CardTitle title={name + ' ' + surname}/>
                </div>
                  <div className="md-cell md-cell--6 md-cell--12-tablet md-cell--12-phone text-overflow-ellipsis">
                      <CardText>

                      </CardText>
                  </div>
              </div>
              <CardText>
                  <div className="md-grid">
                      <div className="md-cell md-cell--12 md-cell--12-tablet md-cell--12-phone text-overflow-ellipsis">
                        <TextField id="member-id" value={memberID} label="Member ID" onChange={this.changeMemberID}  />
                      </div>
                      <div className="md-cell md-cell--12 md-cell--12-tablet md-cell--12-phone text-overflow-ellipsis">
                        <TextField id="member-id" value={email} label="Email" onChange={this.changeMemberID}  />
                      </div>
                      {clearancesComp}
                      {resumeComp}
                  </div>
                  <div>
                      <Button raised iconBefore={true} onClick={this.show}>
                          Delete
                      </Button>
                      <DialogContainer id="simple-action-dialog" visible={visible} onHide={this.hide} actions={actions} title="Delete user?"></DialogContainer>
                  </div>
                  <br/>
                  {dropZone}
              </CardText>
          </Card>
      );
    }
}

UserCard.propTypes = {
    user: PropTypes.any.isRequired,
    isLoading: PropTypes.bool.isRequired,

    sendNotification: PropTypes.func.isRequired,
    uploadResume: PropTypes.func.isRequired,
    dispatch: PropTypes.func
};

export default UserCard;
