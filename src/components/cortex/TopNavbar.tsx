import { useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { auth } from "@/lib/auth";

const titles: Record<string,string> = {
  "/dashboard": "Dashboard",
  "/sentiment": "Sentiment Analysis",
  "/churn": "Churn Risk",
  "/alerts": "Real-Time Alerts",
  "/reports": "Reports",
  "/settings": "Settings",
};

export function TopNavbar() {
  const path = useLocation().pathname;
  const title = titles[path] ?? "CorteX";
  const session = auth.get();
  return (
    <header className="animated-gradient-header h-16 px-6 flex items-center justify-between border-b border-[#F0F0FF]">
      <h1 className="text-lg font-bold text-foreground/80 pl-12 lg:pl-0">{title}</h1>
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-white">
        <span className="pulse-dot"/>
        <span className="text-xs font-medium text-foreground/70">System Active</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-full bg-[#F5F5FF] w-56">
          <Search className="w-4 h-4 text-muted-foreground"/>
          <input placeholder="Search..." className="bg-transparent outline-none text-sm flex-1"/>
        </div>
        <button className="relative w-9 h-9 rounded-full bg-white/70 border border-white flex items-center justify-center hover:bg-white transition">
          <Bell className="w-4 h-4 text-foreground/70"/>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger"/>
        </button>
        <div className="w-9 h-9 rounded-full gradient-brand text-white font-bold flex items-center justify-center text-xs">{session?.name?.split(" ").map(s=>s[0]).join("").slice(0,2)}</div>
      </div>
    </header>
  );
}
