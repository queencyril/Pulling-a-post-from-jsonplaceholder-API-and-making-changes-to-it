import React, { useState, useEffect } from 'react';

const ListItems = () => {
  const [postLists, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedPost, setEditedPost] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?limit=5')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const editPost = (postId) => {
    setSelectedPost(postId);
    setIsEditing(true);

  const postToEdit = postLists.find((post) => post.id === postId);
    setEditedPost(postToEdit.title);
  };

  const saveEditedPost = () => {
    // To update the post on the server
    const updatedPosts = postLists.map((post) => {
      if (post.id === selectedPost) {
        return { ...post, title: editedPost };
      }
      return post;
    });

    // Update the local state and reset editing state
    setPosts(updatedPosts);
    setSelectedPost(null);
    setIsEditing(false);
  };

  const deletePost = (postId) => { 
  // To remove the post from the local state
    const updatedPosts = postLists.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div>
      <h1 style={{
        fontSize: '30px',
        textAlign:'center'}}
        >List Items</h1>
      <ol style={{fontSize: '18px',}}>
        {postLists.map((post) => (
          <li key={post.id}>
            {selectedPost === post.id && isEditing ? (
              <>
                <input
                  type="text"
                  value={editedPost}
                  onChange={(e) => setEditedPost(e.target.value)}
                />
                <button onClick={saveEditedPost}>Make Changes</button>
              </>
            ) : (
              <>
                {post.title}
                <button onClick={() => editPost(post.id)}  style={{
                  borderRadius: '20px',
                  display: 'block',
                  border: '1px solid blue',
                  padding:'0 50px',
                  margin:'1px'
                }}>Edit Item</button>

                <button onClick={() => deletePost(post.id)} style={{
                  borderRadius: '20px',
                  border: '1px solid blue',
                  display: 'block',
                  padding:'0 40px',
                  margin:'1px 0 10px 0'
                }}>Delete Item</button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListItems;
