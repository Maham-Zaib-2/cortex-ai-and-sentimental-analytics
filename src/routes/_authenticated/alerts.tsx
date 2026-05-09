import { createFileRoute } from "@tanstack/react-router";
import { ChartCard } from "@/components/cortex/ChartCard";
import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle2, MessageSquare, TrendingDown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/alerts")({
  head: () => ({ meta: [{ title: "Real-Time Alerts — CorteX" }] }),
  component: Page,
});

const initial = [
  { id:1, type:"Sentiment", title:"Negative spike on live chat", desc:"+38% negative messages in last hour from EU region.", time:"2 min ago", sev:"high", Icon: MessageSquare },
  { id:2, type:"Churn", title:"Acme Corp risk escalated to 86", desc:"Usage dropped 40% over last 7 days.", time:"18 min ago", sev:"high", Icon: TrendingDown },
  { id:3, type:"System", title:"Sentiment model retrained", desc:"Accuracy improved to 94.2%.", time:"1 hr ago", sev:"info", Icon: CheckCircle2 },
  { id:4, type:"Sentiment", title:"Twitter mentions trending positive", desc:"VIP campaign performing 22% above baseline.", time:"2 hr ago", sev:"low", Icon: MessageSquare },
  { id:5, type:"Churn", title:"3 SMB accounts flagged", desc:"Renewal in 30 days, NPS below 6.", time:"3 hr ago", sev:"med", Icon: AlertTriangle },
];

const sevStyle: Record<string,string> = {
  high: "bg-danger/15 text-danger",
  med: "bg-warning/15 text-warning",
  low: "bg-success/15 text-success",
  info: "bg-primary/15 text-primary",
};

function Page() {
  const [alerts, setAlerts] = useState(initial);
  const [filter, setFilter] = useState<"all"|"high"|"med"|"low">("all");
  const visible = alerts.filter(a => filter === "all" || a.sev === filter);

  const resolve = (id:number) => {
    setAlerts(a => a.filter(x => x.id !== id));
    toast.success("Alert resolved");
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { l:"Active", v: alerts.length, c:"text-primary", Icon: Bell },
          { l:"Critical", v: alerts.filter(a=>a.sev==="high").length, c:"text-danger", Icon: AlertTriangle },
          { l:"Resolved Today", v: 18, c:"text-success", Icon: CheckCircle2 },
          { l:"Avg Response", v:"4m", c:"text-secondary", Icon: TrendingDown },
        ].map(s=>(
          <div key={s.l} className="card-soft p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-accent flex items-center justify-center ${s.c}`}><s.Icon className="w-5 h-5"/></div>
            <div><div className="text-xs text-muted-foreground">{s.l}</div><div className="text-xl font-bold">{s.v}</div></div>
          </div>
        ))}
      </div>

      <ChartCard title="Live Alert Feed" subtitle="Filtered by severity" action={
        <div className="flex gap-1 text-xs">
          {(["all","high","med","low"] as const).map(f=>(
            <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-lg font-medium transition ${filter===f ? "btn-gradient text-white" : "bg-accent text-foreground/70 hover:bg-accent/70"}`}>{f}</button>
          ))}
        </div>
      }>
        <ul className="space-y-3">
          {visible.length === 0 && <li className="text-center text-sm text-muted-foreground py-10">No alerts. All clear ✨</li>}
          {visible.map(a=>(
            <li key={a.id} className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 transition">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sevStyle[a.sev]}`}><a.Icon className="w-5 h-5"/></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{a.title}</span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${sevStyle[a.sev]}`}>{a.sev}</span>
                  <span className="text-[10px] text-muted-foreground">• {a.type}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{a.time}</p>
              </div>
              <button onClick={()=>resolve(a.id)} className="text-xs px-3 py-1.5 rounded-lg btn-gradient font-medium">Resolve</button>
            </li>
          ))}
        </ul>
      </ChartCard>
    </div>
  );
}
