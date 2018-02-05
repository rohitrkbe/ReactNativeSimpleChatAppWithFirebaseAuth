import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;

  //initialize firebase backend
  constructor() {
    firebase.initializeApp({
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });
  }

  setUid(value) {
    this.uid = value;
  }

  getUid() {
    return this.uid;
  }

  //retrive msg from backend
  loadMessages(callback) {
    this.messageRef = firebase.database().ref('messages');
    this.messageRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messageRef.limitToLast(50).on('child_added', onReceive);
  }

  //send msg to db
  SendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messageRef.push({text: message[i].text, user: message[i].user, createdAt: firebase.database.ServerValue.TIMESTAMP});
    }
  }

  CloseChat() {
    if (this.messageRef) {
      this.messageRef.off();
    }
  }

}

export default new Backend();
