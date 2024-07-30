import { connect } from "@/utils/config/dbConfig";
import Blog from "@/utils/models/blog";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order

    return NextResponse.json({
      message: "Blogs fetched successfully",
      success: true,
      blogs,
    });
    // console.log("Blog fetched successfully " + blogs)
  } catch (error) {
    console.error("Error in GET /api/getblogs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
