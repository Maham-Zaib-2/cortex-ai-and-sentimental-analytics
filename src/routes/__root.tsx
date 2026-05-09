import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card-soft p-10 text-center max-w-md">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 btn-gradient px-5 py-2.5 rounded-xl text-sm font-medium">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CorteX — AI Customer Intelligence" },
      { name: "description", content: "CorteX is an AI-driven customer experience management platform with sentiment, churn, and real-time alerting." },
      { property: "og:title", content: "CorteX — AI Customer Intelligence" },
      { name: "twitter:title", content: "CorteX — AI Customer Intelligence" },
      { property: "og:description", content: "CorteX is an AI-driven customer experience management platform with sentiment, churn, and real-time alerting." },
      { name: "twitter:description", content: "CorteX is an AI-driven customer experience management platform with sentiment, churn, and real-time alerting." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fda7299d-4662-4c68-a627-20b3194bea37/id-preview-c4562e13--521e687f-005f-4637-b584-ed0d8d690a8c.lovable.app-1778321563902.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fda7299d-4662-4c68-a627-20b3194bea37/id-preview-c4562e13--521e687f-005f-4637-b584-ed0d8d690a8c.lovable.app-1778321563902.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
