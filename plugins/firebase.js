 (function(server) {
 	if (server) return;
 	if (!process.env.FIREBASE_KEY) {
 		throw Error('FIREBASE_KEY missing');
 	}
 	var config = {
 		apiKey: process.env.FIREBASE_KEY,
 		authDomain: "errortracky.firebaseapp.com",
 		databaseURL: "https://errortracky.firebaseio.com",
 		projectId: "errortracky",
 		storageBucket: "errortracky.appspot.com",
 		messagingSenderId: "1095457959694"
 	};
 	firebase.initializeApp(config);
 })(process.server)