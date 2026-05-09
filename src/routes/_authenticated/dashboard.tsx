import { createFileRoute } from "@tanstack/react-router";
import { KpiCard } from "@/components/cortex/KpiCard";
import { ChartCard, ChartTooltip } from "@/components/cortex/ChartCard";
import { MessageSquare, Smile, Frown, AlertTriangle, Download } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CorteX" }] }),
  component: Dashboard,
});

const trendData = [
  { d: "Mon", positive: 240, negative: 40 },
  { d: "Tue", positive: 280, negative: 38 },
  { d: "Wed", positive: 310, negative: 52 },
  { d: "Thu", positive: 290, negative: 45 },
  { d: "Fri", positive: 360, negative: 60 },
  { d: "Sat", positive: 330, negative: 48 },
  { d: "Sun", positive: 380, negative: 55 },
];
const channelData = [
  { name: "Email", value: 4200 },
  { name: "Chat", value: 3100 },
  { name: "Call", value: 2400 },
  { name: "Social", value: 1800 },
  { name: "Reviews", value: 845 },
];
const sentimentSplit = [
  { name: "Positive", value: 65, color: "#7EC48A" },
  { name: "Neutral", value: 20, color: "#90C8C0" },
  { name: "Negative", value: 15, color: "#E8907A" },
];

function Dashboard() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="gradient-banner rounded-2xl p-6 border border-white/80 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-extrabold">Good morning, Maham 👋</h2>
          <p className="text-sm text-muted-foreground mt-1">Here is your AI customer intelligence overview</p>
        </div>
        <div className="text-sm font-medium text-foreground/60">{today}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Total Interactions" value="12,345" delta="+12% this week" trend="up" Icon={MessageSquare} gradient="linear-gradient(135deg,#7AAFD4,#90C8C0)"/>
        <KpiCard label="Positive Sentiment" value="85%" delta="+3% vs last week" trend="up" Icon={Smile} gradient="linear-gradient(135deg,#7EC48A,#90C8C0)"/>
        <KpiCard label="Negative Sentiment" value="15%" delta="-2% vs last week" trend="down" Icon={Frown} gradient="linear-gradient(135deg,#E8907A,#A78BD4)"/>
        <KpiCard label="Churn Risk Index" value="12%" delta="Stable" trend="stable" Icon={AlertTriangle} gradient="linear-gradient(135deg,#D4B870,#E8907A)"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title="Sentiment Trend" subtitle="Last 7 days" action={
            <button onClick={()=>toast.success("Report exported successfully")} className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/70 text-foreground/70 font-medium transition">
              <Download className="w-3.5 h-3.5"/> Export
            </button>
          }>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="gPos" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7EC48A" stopOpacity={0.5}/><stop offset="100%" stopColor="#7EC48A" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gNeg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E8907A" stopOpacity={0.5}/><stop offset="100%" stopColor="#E8907A" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FB"/>
                <XAxis dataKey="d" stroke="#94a3b8" fontSize={11}/>
                <YAxis stroke="#94a3b8" fontSize={11}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Area type="monotone" dataKey="positive" stroke="#7EC48A" strokeWidth={2.5} fill="url(#gPos)"/>
                <Area type="monotone" dataKey="negative" stroke="#E8907A" strokeWidth={2.5} fill="url(#gNeg)"/>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <ChartCard title="Sentiment Split" subtitle="Distribution today">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={sentimentSplit} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {sentimentSplit.map((s,i)=> <Cell key={i} fill={s.color}/>)}
              </Pie>
              <Tooltip content={<ChartTooltip/>}/>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Interactions by Channel" subtitle="This week">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FB"/>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11}/>
              <YAxis stroke="#94a3b8" fontSize={11}/>
              <Tooltip content={<ChartTooltip/>}/>
              <Bar dataKey="value" fill="#7AAFD4" radius={[8,8,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Recent Activity" subtitle="Latest events">
          <ul className="divide-y divide-border">
            {[
              { c: "VIP Customer Acme Corp left a 5★ review", t: "2 min ago", color: "bg-success" },
              { c: "Negative sentiment spike detected on Chat", t: "12 min ago", color: "bg-danger" },
              { c: "Churn risk on Customer #4213 escalated", t: "38 min ago", color: "bg-warning" },
              { c: "Weekly report generated", t: "1 hr ago", color: "bg-primary" },
              { c: "New customer onboarded: Pixel Studio", t: "3 hr ago", color: "bg-secondary" },
            ].map((a,i)=>(
              <li key={i} className="py-3 flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-2 ${a.color}`}/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{a.c}</p>
                  <p className="text-xs text-muted-foreground">{a.t}</p>
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
      </div>
    </div>
  );
}
