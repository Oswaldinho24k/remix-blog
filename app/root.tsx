import { Outlet, LiveReload, Link, Links, Meta } from "remix";

import globalStylesUrl from "./styles/globalCSS.css";

type Children = {};

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];

export const meta = () => ({
  description: "this is my app siuuu",
  keywords: "siuu bicho cr7 lol",
});

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title = "LOL",
}: {
  children: Children;
  title?: string;
}) {
  return (
    <html>
      <head>
        <Links />
        <Meta />
        <title>{title}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: Children }) {
  return (
    <>
      <nav>
        <Link to="/">Remix</Link>
        <ul>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>

      <main>{children}</main>
    </>
  );
}

export const ErrorBoundary = ({ error }) => {
  console.log({ error });
  return (
    <Layout>
      <p>este es el error: {error.message}</p>
    </Layout>
  );
};
