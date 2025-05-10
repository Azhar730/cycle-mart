import { blogs } from "@/data/blogs";
import { useParams } from "react-router-dom";

const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-6 text-center">
            Blog not found
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 mt-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">
          {blog.title}
        </h1>

        <div className="flex flex-col items-center">
          <img
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-lg shadow-md mb-8 object-contain"
          />

          <p className="text-gray-700 text-lg max-w-4xl text-justify">
            {blog.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
