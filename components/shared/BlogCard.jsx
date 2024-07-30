import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({
  src,
  author,
  title,
  blogPost,
  authorImage,
    authorRole,
  _id,
}) => {
  return (
      <Link href={`/blogpost/${_id}`}>
    <div className="border-b py-4 max-w-[750px] flex mt-8 justify-between items-end mx-auto space-x-4">
        <div className="w-full">
          <div className="flex space-x-3 mb-4 items-center">
            <Image
              src={authorImage ? authorImage : "/usernull.png"}
              alt="author image"
              className="rounded-full size-10"
              width={20}
              height={20}
            />
            <div>
              <p className="text-[15px] font-semibold">{author}</p>
              <p className="text-[11px] font-medium text-slate-600">
                {authorRole}
              </p>
            </div>
          </div>
          <div className="w-full">
            <p className="font-extrabold text-[20px]">{title}</p>
            <div
              className="text-[15px] text-slate-500 font-medium line-clamp-4 w-[450px]"
              dangerouslySetInnerHTML={{ __html: blogPost }}
            />
          </div>
        </div>

        <div className=" w-[400px] h-[200px] overflow-hidden">
          <Image
            src={src ? src : "/defaultblogmedia.jpg"}
            alt="blog media"
            className="size-full object-fill"
            width={350}
            height={200}
          />
        </div>
    </div>
      </Link>
  );
};

export default BlogCard;
