import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../../api/blogApi';

const Blogs = () => {
  const { data, isLoading } = useQuery({ queryKey: ['blogs'], queryFn: () => getBlogs({ limit: 12 }) });

  if (isLoading) return <p className="p-8">Loading articles...</p>;

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Pet Care Blog</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data?.blogs?.map((blog) => (
          <Link key={blog._id} to={`/blogs/${blog.slug}`} className="rounded-xl bg-white p-5 shadow hover:shadow-md">
            <h2 className="font-semibold text-gray-900">{blog.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{blog.content.slice(0, 120)}...</p>
            <p className="mt-3 text-xs text-gray-400">By {blog.authorId?.fullName}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;