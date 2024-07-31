"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import axios from "axios";
import Image from "next/image";

const BlogPost = ({ params }) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/getblog?id=${params.id}`);
        console.log(response.data.blog);
        setBlog(response.data.blog);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="px-28 pt-6 pb-20">
        {/* first section  */}
        <div className="flex space-x-5">
          <div className="w-2/5">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="w-full border-b h-1" />
            <p className="my-2 text-[13px] text-slate-800 font-semibold">
              Written By
            </p>
            <div className="flex space-x-3 mb-2 items-center">
              <Image
                src={blog.authorImage ? blog.authorImage : "/usernull.png"}
                alt="author image"
                className="rounded-full size-12"
                width={20}
                height={20}
              />
              <div>
                <p className="text-[15px] font-semibold">{blog.author}</p>
                <p className="text-[11px] font-medium text-slate-600">
                  {blog.authorRole}
                </p>
              </div>
            </div>
          </div>
          <div className="w-3/5 h-[350px] overflow-hidden">
            <Image
              src={blog.media[0]}
              alt={blog.title}
              width={400}
              height={100}
              className="mb-4 w-full h-[350px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* second section  */}
        <div className="py-6" />

        <div className="flex space-x-5">
          <div className="w-2/5 h-[350px] overflow-hidden">
            <Image
              src={blog.media[1]}
              alt={blog.title}
              width={400}
              height={100}
              className="mb-4 w-full h-[350px] object-cover rounded-lg"
            />
          </div>
          <div className="w-3/5">
            <p className="text-2xl font-bold mb-3">{blog.subTitle}</p>

            <div
              className="text-[15px] text-slate-700"
              dangerouslySetInnerHTML={{ __html: blog.blogPost }}
            />
          </div>
        </div>

        {/* third section  */}
        <div className="py-6" />

        <div className="flex space-x-5">
          <div className="w-3/5">
            <p className="text-2xl font-bold mb-3">{blog.secSubTitle}</p>

            <div
              className="text-[15px] text-slate-700"
              dangerouslySetInnerHTML={{ __html: blog.blogPost2 }}
            />
          </div>
          <div className="w-2/5 h-[350px] overflow-hidden">
            <Image
              src={blog.media[2]}
              alt={blog.title}
              width={400}
              height={100}
              className="mb-4 w-full h-[350px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

