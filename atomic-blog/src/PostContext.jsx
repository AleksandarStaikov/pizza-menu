import { faker } from "@faker-js/faker";
import { createContext, useState, useContext } from "react";

const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const context = {
    posts: searchedPosts,
    onAddPost: handleAddPost,
    onClearPosts: handleClearPosts,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
  };

  return (
    <PostContext.Provider value={context}>{children}</PostContext.Provider>
  );
};

function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePosts was used outside a PostContextProvider");
  }
  return context;
}

export { PostContextProvider, usePosts };
