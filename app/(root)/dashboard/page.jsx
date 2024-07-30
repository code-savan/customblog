"use client";

import { useSession } from "next-auth/react";
import Sidebar from "@/components/shared/Sidebar";
import Input from "@/components/shared/Input";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { MultiImageDropzone } from "@/components/shared/ImageDropZone";
import { useEdgeStore } from "@/lib/edgestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Dashboard = () => {
  const [fileStates, setFileStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [urls, setUrls] = useState({
    url: "",
  });
  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();

  function updateFileProgress(key, progress) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  const [blog, setBlog] = useState({
    title: "",
    subTitle: "",
    secSubTitle: "",
    category: "",
    media: [],
    readTime: "",
    author: "",
    authorImage: "",
    authorRole: "",
    blogPost: "",
    blogPost2: "",
  });

   useEffect(() => {
     if (session?.user?.name) {
       setBlog((prev) => ({ ...prev, author: session.user.name }));
     }
   }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setBlog((prev) => ({ ...prev, blogPost: value }));
  };
  const handleQuill2Change = (value) => {
    setBlog((prev) => ({ ...prev, blogPost2: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(blog);

    try {
      if (
        !blog.title ||
        !blog.subTitle ||
        !blog.category ||
        !blog.readTime ||
        !blog.authorRole ||
        !blog.blogPost
      ) {
        setError("please fill all the fields");
        return;
      }

      const res = await axios.post("/api/createblog", blog);
      console.log(res.data);
      if (res.status == 200 || res.status == 201) {
        console.log("blog uploaded successfully");
        setError("");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);

      setBlog({
        title: "",
        subTitle: "",
        secSubTitle: "",
        category: "",
        media: [],
        readTime: "",
        author: session?.user?.name || "",
        authorImage: "",
        authorRole: "",
        blogPost: "",
      });
    }

    setLoading(false);
  };

  return (
    <section className="w-full h-[100dvh] flex overflow-hidden">
      {session && (
        <>
          <Sidebar />
          <div className="w-full h-[100dvh] overflow-auto px-10 py-5 mt-2">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">Create a new post</p>
              <div className="bg-slate-200 size-9 font-medium shadow-sm rounded-full flex items-center justify-center">
                {session.user?.name.charAt(0)}
              </div>
            </div>
            <div className="rounded-lg shadow-sm w-[75%] mt-8">
              <form
                className="mt-5 py-6 space-y-6 rounded-xl  bg-white border border-slate-200"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col w-full lg:px-5">
                  <Input
                    label={"Blog Title"}
                    type={"text"}
                    placeholder={"How to make a blog post"}
                    name="title"
                    value={blog.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full lg:px-5">
                  <Input
                    label={"Sub-Title"}
                    type={"text"}
                    placeholder={"This is the subtitle for the current page"}
                    name="subTitle"
                    value={blog.subTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col w-full lg:px-5 h-fit">
                  {/* Rich text editor below  */}
                  <label className="text-color-1 text-[15px] font-semibold">
                    Blog Content 1
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={blog.blogPost}
                    onChange={handleQuillChange}
                    className="mt-1 h-[200px]"
                  />
                </div>

                <div className="flex flex-col w-full lg:px-5 pt-10">
                  <Input
                    label={"Secondary Sub-Title"}
                    type={"text"}
                    placeholder={
                      "This is the secondary subtitle for the current page"
                    }
                    name="secSubTitle"
                    value={blog.secSubTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col w-full lg:px-5 h-fit">
                  {/* Rich text editor below  */}
                  <label className="text-color-1 text-[15px] font-semibold">
                    Blog Content 2
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={blog.blogPost2}
                    onChange={handleQuill2Change}
                    className="mt-1 h-[200px]"
                  />
                </div>

                <div className="flex justify-between space-x-3 w-full lg:px-5 pt-10">
                  <Input
                    label={"Category"}
                    type={"text"}
                    placeholder={"Select Blog Category..."}
                    name="category"
                    value={blog.category}
                    onChange={handleChange}
                  />

                  <Input
                    label={"Average Read Time"}
                    type={"text"}
                    placeholder={"In Minutes (4 mins...)"}
                    name="readTime"
                    value={blog.readTime}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex space-x-3 w-full lg:px-5">
                  <Input
                    label={"Author"}
                    type={"text"}
                    placeholder={"John Smith"}
                    name="author"
                    value={session?.user?.name}
                  />
                  <Input
                    label={"Author Role"}
                    type={"text"}
                    placeholder={"Civil Engineer"}
                    name="authorRole"
                    value={blog.authorRole}
                    onChange={handleChange}
                  />
                  <div>
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files?.[0]);
                      }}
                    />
                    <button
                      className="bg-red-500 p-4"
                      type="button"
                      onClick={async () => {
                        console.log("clicked");
                        if (file) {
                          const res = await edgestore.publicFiles.upload({
                            file,
                          });
                          setBlog((prev) => ({
                            ...prev,
                            authorImage: res.url,
                          }));
                          setUrls({
                            url: res.url,
                          });
                        }
                        console.log("done");
                      }}
                    >
                      Upload
                    </button>
                    {urls.url && (
                      <Image
                        src={urls.url}
                        alt="thumbnail"
                        width={30}
                        height={30}
                      />
                    )}
                  </div>
                </div>
                {/* image  */}

                <div className="flex flex-col w-full lg:px-5 h-fit ">
                  <label className="text-color-1 text-[15px] font-semibold">
                    Blog Media
                  </label>
                  <p className="font-medium text-[13px] mb-3">Max 3 files</p>
                  <div className="rounded-md p-2 border border-slate-200">
                    {/* Max of 3 images! */}
                    <MultiImageDropzone
                      value={fileStates}
                      dropzoneOptions={{
                        maxFiles: 3,
                      }}
                      onChange={(files) => {
                        setFileStates(files);
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setFileStates([...fileStates, ...addedFiles]);
                        await Promise.all(
                          addedFiles.map(async (addedFileState) => {
                            try {
                              const res = await edgestore.publicFiles.upload({
                                file: addedFileState.file,
                                onProgressChange: async (progress) => {
                                  updateFileProgress(
                                    addedFileState.key,
                                    progress
                                  );
                                  if (progress === 100) {
                                    // wait 1 second to set it to complete
                                    // so that the user can see the progress bar at 100%
                                    await new Promise((resolve) =>
                                      setTimeout(resolve, 1000)
                                    );
                                    updateFileProgress(
                                      addedFileState.key,
                                      "COMPLETE"
                                    );
                                  }
                                },
                              });
                              console.log(res.url);
                              setBlog((prev) => ({
                                ...prev,
                                media: [...prev.media, res.url],
                              }));
                            } catch (err) {
                              updateFileProgress(addedFileState.key, "ERROR");
                            }
                          })
                        );
                      }}
                    />
                  </div>
                </div>

                {/* images end  */}

                <div className="flex flex-col w-full lg:px-5 pt-8">
                  <button
                    type="submit"
                    className="bg-yellow-600 text-white py-2 px-4 rounded"
                  >
                    Publish Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
