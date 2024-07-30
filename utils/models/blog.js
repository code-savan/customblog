import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Insert Blog title"],
  },
  subTitle: {
    type: String,
  },
  secSubTitle: {
    type: String,
  },
  category: {
    type: String,
  },
  media: {
    type: Array,
  },
  readTime: {
    type: String,
  },
  author: {
    type: String,
  },
  authorImage: {
    type: String,
  },
  authorRole: {
    type: String,
  },
  blogPost: {
    type: String,
  },
  blogPost2: {
    type: String,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;

