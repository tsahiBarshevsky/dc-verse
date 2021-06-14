import app from 'firebase/app';
import 'firebase/auth';
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
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    isInitialized()
    {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }

    login(email, password)
    {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout()
    {
        return this.auth.signOut();
    }

    getCurrentUsername()
    {
        return this.auth.currentUser;
    }

    addPost(title, date, text, preview, image, credit)
    {
        return this.db.doc(`posts/${title}`).set({
            title: title,
            date: date,
            text: text,
            preview: preview,
            image: image,
            credit: credit
        });
    }

    async editPost(title, date, text, preview, image, credit)
    {
        this.db.collection('posts').doc(`${title}`).update({
            date: date,
            text: text,
            preview: preview,
            image: image,
            credit: credit
        });
    }

    async getPost(title)
    {
        console.log('getPost called');
        const reference = this.db.collection(`posts`).doc(`${title}`);
        const doc = await reference.get();
        if (doc.data())
            return doc.data();
        return null;
    }

    async getAllPosts()
    {
        console.log("getAllPosts called");
        const snapshot = await app.firestore().collection('posts').get();
        return snapshot.docs.map(doc => doc.data()).sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
    }

    deletePost(title)
    {
        const storageRef = this.storage.ref();

        // delete main image
        var mainImageRef = storageRef.child(`posts/${title}`);
        mainImageRef.delete().then(() => {
            console.log("Main image deleted");
        }).catch((error) => {
            console.log(error.message);
        });
        
        return this.db.collection('posts').doc(`${title}`).delete();
    }
}

export default new Firebase();