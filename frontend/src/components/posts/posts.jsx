import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import './posts.css';


const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/v1/post/list');
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }

        fetchPosts();
    }, []);

    return (
        <div className="posts">
            <Navbar />
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post-card">
                        <p className="post-comment">{post.comment}</p>
                        <div className="post-details">
                            <span className="post-date">
                                {new Date(post.dateCreated).toLocaleDateString()}
                            </span>
                            <span className="post-id">Post ID: {post.id}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;