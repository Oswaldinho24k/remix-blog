import { useLoaderData, useParams, Link, Form, redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) throw new Error("Post not found");
  return { post };
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const values = Object.fromEntries(form);
  if (values._method === "delete") {
    //TODO validate if user

    await db.post.delete({
      where: { id: params.postId },
    });
  }
  return redirect("/posts");
};

function PostDetail() {
  const params = useParams();
  const { post } = useLoaderData();
  return (
    <div>
      <Link to="/posts">patrás</Link>
      <p>El detashe: {params.postId}</p>
      <p>{post.id}</p>
      <p>{post.title}</p>
      <p>{post.body}</p>
      <p>{post.createdAt}</p>

      <Form method="delete">
        <input type="hidden" name="_method" value="delete" />
        <button type="submit">deletear</button>
      </Form>
    </div>
  );
}

export default PostDetail;
