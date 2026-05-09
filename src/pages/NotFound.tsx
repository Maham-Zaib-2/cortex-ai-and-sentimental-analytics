import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card-soft p-10 text-center max-w-md">
        <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page drifted out of orbit.</p>
        <Link to="/" className="mt-6 inline-flex btn-gradient px-5 py-2.5 rounded-xl text-sm font-medium">Go home</Link>
      </div>
    </div>
  );
}