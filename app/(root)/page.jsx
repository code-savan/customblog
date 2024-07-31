"use client"
import Header from '@/components/shared/Header'
import React from 'react'
import BlogCard from "@/components/shared/BlogCard";
import Loader from "@/components/shared/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
   const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
     const fetchBlogs = async () => {
       try {
         const response = await axios.get("/api/getblogs");
         console.log(response.data.blogs);
         setBlogs(response.data.blogs);
         setLoading(false);
       } catch (err) {
         console.error("Error fetching blogs:", err);
         setError(err.message);
         setLoading(false);
       }
     };

     fetchBlogs();
   }, []);
  
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <section className="w-full">
      <Header />
      <div className="w-full pt-6 px-8 flex items-center justify-center">
        <p className="font-semibold text-[70px]">Welcome to Where-Ever</p>
      </div>

      <div className="w-full py-4 px-8">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            _id={blog._id}
            title={blog.title}
            src={blog.media[0]}
            author={blog.author ? blog.author : "Admin"}
            authorRole={blog.authorRole}
            authorImage={blog.authorImage ? blog.authorImage : "/usernull.png"}
            blogPost={blog.blogPost ? blog.blogPost : "/defaultblogmedia.jpg"}
          />
        ))}
      </div>
    </section>
  );
}

export default Home