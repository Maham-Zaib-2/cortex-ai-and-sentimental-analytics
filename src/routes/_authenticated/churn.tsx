import { createFileRoute } from "@tanstack/react-router";
import { ChartCard, ChartTooltip } from "@/components/cortex/ChartCard";
import { KpiCard } from "@/components/cortex/KpiCard";
import { TrendingDown, Users, AlertTriangle, Target } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/churn")({
  head: () => ({ meta: [{ title: "Churn Risk — CorteX" }] }),
  component: Page,
});

const churnTrend = Array.from({length: 12}).map((_,i)=>({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  rate: 8 + Math.round(Math.sin(i/2)*4 + Math.random()*2),
}));
const segments = [
  { s: "Enterprise", risk: 6 },
  { s: "Mid-Market", risk: 12 },
  { s: "SMB", risk: 18 },
  { s: "Startup", risk: 22 },
];
const customers = [
  { name: "Acme Corp", score: 86, tier: "Enterprise", reason: "Drop in usage 40%" },
  { name: "Bright Labs", score: 78, tier: "Mid-Market", reason: "Multiple negative tickets" },
  { name: "Pixel Studio", score: 71, tier: "SMB", reason: "Low NPS response" },
  { name: "Nova AI", score: 64, tier: "Startup", reason: "Renewal in 30 days" },
  { name: "Vertex Inc.", score: 58, tier: "Mid-Market", reason: "Sentiment trending down" },
];

function Page() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Churn Risk Index" value="12%" delta="Stable" trend="stable" Icon={AlertTriangle} gradient="linear-gradient(135deg,#D4B870,#E8907A)"/>
        <KpiCard label="At-Risk Customers" value="48" delta="+5 this week" trend="up" Icon={Users} gradient="linear-gradient(135deg,#E8907A,#A78BD4)"/>
        <KpiCard label="Saved Accounts" value="12" delta="+33% MoM" trend="up" Icon={Target} gradient="linear-gradient(135deg,#7EC48A,#90C8C0)"/>
        <KpiCard label="Avg. Risk Drop" value="-7.4%" delta="After action" trend="down" Icon={TrendingDown} gradient="linear-gradient(135deg,#7AAFD4,#A78BD4)"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title="Churn Rate Trend" subtitle="Past 12 months">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={churnTrend}>
                <defs><linearGradient id="gChurn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E8907A" stopOpacity={0.5}/><stop offset="100%" stopColor="#E8907A" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FB"/>
                <XAxis dataKey="m" stroke="#94a3b8" fontSize={11}/>
                <YAxis stroke="#94a3b8" fontSize={11}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Area type="monotone" dataKey="rate" stroke="#E8907A" strokeWidth={2.5} fill="url(#gChurn)"/>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <ChartCard title="Risk by Segment" subtitle="Customer tier">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={segments} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FB"/>
              <XAxis type="number" stroke="#94a3b8" fontSize={11}/>
              <YAxis dataKey="s" type="category" stroke="#94a3b8" fontSize={11} width={80}/>
              <Tooltip content={<ChartTooltip/>}/>
              <Bar dataKey="risk" fill="#A78BD4" radius={[0,8,8,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="High-Risk Customers" subtitle="AI-prioritized for outreach">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="text-left"><th className="py-2">Customer</th><th>Tier</th><th>Risk Score</th><th>Reason</th><th></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map(c=>(
                <tr key={c.name}>
                  <td className="py-3 font-medium">{c.name}</td>
                  <td className="text-muted-foreground">{c.tier}</td>
                  <td><div className="flex items-center gap-2"><div className="w-24 h-2 rounded-full bg-accent"><div className="h-2 rounded-full" style={{width: `${c.score}%`, background: "linear-gradient(90deg,#D4B870,#E8907A)"}}/></div><span className="text-xs font-semibold">{c.score}</span></div></td>
                  <td className="text-muted-foreground">{c.reason}</td>
                  <td className="text-right"><button onClick={()=>toast.success(`Outreach scheduled for ${c.name}`)} className="text-xs btn-gradient px-3 py-1.5 rounded-lg font-medium">Engage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
