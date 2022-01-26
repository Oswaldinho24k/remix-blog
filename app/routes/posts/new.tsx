import { Form, Link, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");

  const formValues = { title, body };
  const post = await db.post.create({ data: formValues });

  return redirect(`/posts/${post.id}`);
};

function NewPost() {
  return (
    <div>
      <p>New Post</p>
      <Link to="/posts">patrás</Link>
      <div>
        <Form method="post">
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>

          <div>
            <label htmlFor="body">body</label>
            <textarea name="body" id="body" />
          </div>

          <div>
            <button type="submit">post el post</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default NewPost;
