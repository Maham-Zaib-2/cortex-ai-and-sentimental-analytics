import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/cortex/AppSidebar";
import { TopNavbar } from "@/components/cortex/TopNavbar";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!auth.isAuthed()) navigate({ to: "/login" });
    else setReady(true);
  }, [navigate]);
  if (!ready) return null;
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        <main className="flex-1 p-6 fade-in"><Outlet /></main>
      </div>
    </div>
  );
}
