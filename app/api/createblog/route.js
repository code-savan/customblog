import { connect } from "@/utils/config/dbConfig";
import Blog from "@/utils/models/blog";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const {
      title,
      subTitle,
      secSubTitle,
      category,
      media,
      readTime,
      author,
      authorImage,
      authorRole,
      blogPost,
      blogPost2
    } = await request.json();

    const blog = await Blog.findOne({ title });

    if (blog) {
      return NextResponse.json(
        { error: "Blog already exists" },
        { status: 400 }
      );
    }



    const newBlog = new Blog({
      title,
      subTitle,
      secSubTitle,
      category,
      media,
      readTime,
      author,
      authorImage,
      authorRole,
      blogPost,
      blogPost2,
    });

    const savedBlog = await newBlog.save();

    return NextResponse.json({
      message: "Blog created successfully",
      success: true,
      savedBlog,
    });
  } catch (error) {
    console.error("Error in POST /api/createblog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
