import React, { useState, useEffect } from 'react';
import LoadingAnimation from '../Loading';
import MainCard from '../Cards/main';
import ScrollToTop from '../scrollToTop';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import firebase from '../firebase';

export default function Archive() 
{
    const [posts, setPosts] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen(!isOpen)};

    useEffect(() => 
    {   
        document.title = 'DC Verse | ארכיון כתבות';
        firebase.getAllPosts().then(setPosts);
    }, []);

    return posts ? (
        <>
            <ScrollToTop />
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className="archive-container">
                <h3 className="title">ארכיון כתבות</h3>
                {posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)).map((post, index) =>
                    <div key={index}>
                        <MainCard post={post} />
                    </div>
                )}
            </div>
        </>
    ) : <LoadingAnimation text="כבר מגיע..." />
}
