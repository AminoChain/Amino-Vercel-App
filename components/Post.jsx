import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

const Post = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />a
    </div>
  );
};

export default Post;
