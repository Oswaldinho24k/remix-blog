import { Link, Outlet, useLoaderData } from "remix";

import { db } from "~/utils/db.server";

type Post = {
  id: string;
  title: string;
  body: string;
};

export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      take: 10,
      select: { id: true, title: true, body: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  return data;
};

function PostsList() {
  const { posts } = useLoaderData();
  return (
    <div>
      <p>Los posts</p>
      <Link to="new">New Post</Link>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {posts.map((post: Post) => (
          <Link to={post.id}>{post.title}</Link>
        ))}
      </div>
      {/* <Outlet /> */}
    </div>
  );
}

export default PostsList;
