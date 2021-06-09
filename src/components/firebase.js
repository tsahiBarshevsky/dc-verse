import app from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCrxqdPqtURvoW-8bT6kAfgI3vjOYUXW_M",
    authDomain: "dc-verse.firebaseapp.com",
    projectId: "dc-verse",
    storageBucket: "dc-verse.appspot.com",
    messagingSenderId: "933215147457",
    appId: "1:933215147457:web:5f2e4ff966922d43898b40"
};

class Firebase
{
    constructor()
    {
        app.initializeApp(firebaseConfig);
        // this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    addPost(title, date, category, text, image, credit)
    {
        return this.db.doc(`posts/${title}`).set({
            title: title,
            date: date,
            category: category,
            text: text,
            image: image,
            credit: credit
        });
    }

    async getPost(title)
    {
        const reference = this.db.collection(`posts`).doc(`${title}`);
        const doc = await reference.get();
        if (doc.data())
            return doc.data();
        return null;
    }
}

export default new Firebase();