import Link from "next/link";
// The notFound function allows you to render the not-found file within a route segment
// Specifying a not-found file allows you to gracefully handle such errors by rendering a Not Found UI within the segment.

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested user!</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
