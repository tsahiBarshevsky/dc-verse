import React, { useState, useEffect } from 'react';
import LoadingAnimation from '../Loading';
import MainCard from '../Cards/main';
import ScrollToTop from '../scrollToTop';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import firebase from '../firebase';

export default function Tag(props) 
{
    const [posts, setPosts] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {setIsOpen(!isOpen)};
    const tag = props.match.params.tag.replaceAll('-', ' ');

    useEffect(() => 
    {
        document.title = `DC Verse | כתבות בנושא ${tag}`;
        firebase.getAllPostsByTags(tag).then(setPosts);
    }, [tag]);

    return posts ? (
        <>
            <ScrollToTop />
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className="archive-container">
                {posts.length > 0 ?
                <>
                    <h3 className="title">כתבות בנושא {tag}</h3>
                    {posts.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)).map((post, index) =>
                        <div key={index}>
                            <MainCard post={post} />
                        </div>
                    )}
                </>
                :
                <h3 className="title">לא נמצאו כתבות בנושא {tag}</h3>}
            </div>
        </>
    ) : <LoadingAnimation text="כבר מגיע..." />
}
