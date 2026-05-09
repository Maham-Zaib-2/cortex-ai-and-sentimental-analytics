import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BarChart2, TrendingDown, Bell, FileText, Settings, LogOut, Menu } from "lucide-react";
import { auth } from "@/lib/auth";
import { useState } from "react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/sentiment", label: "Sentiment Analysis", icon: BarChart2 },
  { to: "/churn", label: "Churn Risk", icon: TrendingDown },
  { to: "/alerts", label: "Real-Time Alerts", icon: Bell },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const session = auth.get();
  const [open, setOpen] = useState(false);

  const logout = () => { auth.logout(); navigate("/login"); };

  return (
    <>
      <button onClick={()=>setOpen(!open)} className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 rounded-xl glass flex items-center justify-center">
        <Menu className="w-5 h-5"/>
      </button>
      <aside className={`fixed lg:sticky top-0 h-screen z-40 w-[260px] glass border-r border-[#E0E8FF] flex flex-col transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl gradient-brand text-white font-extrabold flex items-center justify-center text-base shadow-md">CX</div>
          <div>
            <div className="font-extrabold text-lg leading-tight">CorteX</div>
            <div className="text-[10px] text-muted-foreground tracking-wide">AI Customer Intelligence</div>
          </div>
        </div>

        <nav className="px-3 flex-1 space-y-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active = path.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={()=>setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition relative ${
                  active
                    ? "gradient-banner text-primary border-l-[3px] border-primary"
                    : "text-foreground/70 hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="m-3 p-3 rounded-2xl border border-[#E8EEFF] bg-white/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-brand text-white font-bold flex items-center justify-center text-sm shrink-0">MA</div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold truncate">{session?.name ?? "User"}</div>
            <div className="text-[11px] text-muted-foreground truncate">{session?.role}</div>
          </div>
          <button onClick={logout} title="Log out" className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-danger transition">
            <LogOut className="w-4 h-4"/>
          </button>
        </div>
      </aside>
    </>
  );
}
