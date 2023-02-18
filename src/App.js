import React, { useState, useEffect } from "react";

import "./main.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalLikes, setTotalLikes] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
    );
    const data = await response.json();
    setPosts(posts.concat(data));
    setPage(page + 1);
  };

  const handleLike = (postId) => {
    setTotalLikes(totalLikes + 1);
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Social Media Feed</h2>

      <input
        type="text"
        placeholder="Search posts"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="posts">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post">
            <div className="wrap">
              <img
                className="img"
                src={` https://picsum.photos/200?random=${post.id}`}
                alt={post.title}
              />
              <h5>UserID:{post.userId}</h5>
              <h5>Title:{post.title}</h5>
              {/* <p>{post.body}</p> */}
              <p>Likes {totalLikes} </p>

              <button className="LP" onClick={() => handleLike(post.id)}>
                Like Post{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
      {posts.length > 0 && (
        <button className="colo" onClick={fetchPosts}>
          Load More Posts
        </button>
      )}
    </div>
  );
};
export default App;
