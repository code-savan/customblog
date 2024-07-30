import { connect } from "@/utils/config/dbConfig";
import Blog from "@/utils/models/blog";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "Blog ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Blog fetched successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Error in GET /api/getblog:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
