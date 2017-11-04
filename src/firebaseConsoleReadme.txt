###### Realtime database rules ######

{
  "rules": {
    "users": {
      ".read": "root.child('clearances').child(auth.uid).child('isAdmin').val() == true",
      ".write": "root.child('clearances').child(auth.uid).child('isAdmin').val() == true",
      "$uid": {
        ".read": "auth.uid == $uid",
        ".write": "auth.uid == $uid"
      }
    },
    "clearances": {
      ".read": "root.child('clearances').child(auth.uid).child('isAdmin').val() == true",
      ".write": "root.child('clearances').child(auth.uid).child('isAdmin').val() == true",
      "$uid": {
        ".read": "auth.uid == $uid"
      }
    },
    "jobs": {
      ".read": "auth != null",
      ".write": "root.child('clearances').child(auth.uid).child('isAdmin').val() == true"
    },
    "$type": {
      ".read": "root.child('clearances').child(auth.uid).child('isAdmin').val() == true",
      ".write": "root.child('clearances').child(auth.uid).child('isAdmin').val() == true",
      "$uid": {
        ".read": "auth.uid == $uid",
        ".write": "auth.uid == $uid"
      }
    }
  }
}

###### Sign-in providers ######

Email and password

###### Authorized domains ######

Make sure that is present localhost

###### Cloud Storage Rules ######

service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{resumeId} {
    	allow read: if request.auth != null;
        allow write: if request.auth != null &&
                      request.auth.uid == userId &&
                      request.resource.contentType.matches('application/pdf') &&
                      request.resource.size < 5 * 1024 * 1024 &&
                      resumeId.size() < 32;
    }
  }
}
