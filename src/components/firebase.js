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

    addPost(title, date, category, text, preview, image, credit)
    {
        return this.db.doc(`posts/${title}`).set({
            title: title,
            date: date,
            category: category,
            text: text,
            preview: preview,
            image: image,
            credit: credit
        });
    }

    async editPost(title, date, category, text, preview, image, credit)
    {
        this.db.collection('posts').doc(`${title}`).update({
            date: date,
            category: category,
            text: text,
            preview: preview,
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

    async getAllPosts()
    {
        const snapshot = await app.firestore().collection('posts').get();
        return snapshot.docs.map(doc => doc.data());
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

    async getFourRecentPosts()
    {
        var recent = [], ret = [];
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => recent.push(doc.data()));
        var sorted = recent.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<5; i++)
            if (new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
                ret.push(sorted[i]);
        return ret;
    }

    // Recent posts shown in the current post
    async getRecentPosts(title)
    {
        var recent = [], ret = [], counter = 0;
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.map(doc => recent.push(doc.data()));
        var sorted = recent.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<sorted.length; i++)
        {
            if (sorted[i].title !== title && new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
            {
                ret.push(sorted[i]);
                counter++;
            }
            if (counter === 4)
            break;
        }
        return ret;
    }
    
    async getRelatedByCategory(title, category)
    {
        var related = [], ret = [], counter = 0;
        const snapshot = await app.firestore().collection('posts').where("category", "==", category).get();
        snapshot.docs.map(doc => related.push(doc.data()));
        var sorted = related.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        for (var i=0; i<sorted.length; i++)
        {
            if (sorted[i].title !== title && new Date(sorted[i].date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
            {
                ret.push(sorted[i]);
                counter++;
            }
            if (counter === 3)
                break;
        }
        return ret;
    }

    async getAllPostsByCategory(category)
    {
        const snapshot = await app.firestore().collection('posts').where("category", "==", category).get();
        snapshot.docs.map(doc => doc.data());
    }

    async categoriesDistribution()
    {
        var categories = [], a = [], b = [], ret = [], prev;
        const snapshot = await app.firestore().collection('posts').get();
        snapshot.docs.forEach(doc => 
        {
            if (new Date(doc.data().date.seconds * 1000) <= new Date().setHours(23, 59, 59, 59))
                categories.push(doc.data().category)
        });
        categories.sort();
        var i;
        for (i = 0; i<categories.length; i++) 
        {
            if (categories[i] !== prev) 
            {
                a.push(categories[i]);
                b.push(1);
            } 
            else
                b[b.length-1]++;
            prev = categories[i];
        }
        for (i=0; i<a.length; i++)
            if (b[i] >= 3)
                ret.push({name: a[i], occurrences: b[i]});
        return ret.sort((a,b) => (a.occurrences < b.occurrences) ? 1 : ((b.occurrences < a.occurrences) ? -1 : 0));
    }
}

export default new Firebase();