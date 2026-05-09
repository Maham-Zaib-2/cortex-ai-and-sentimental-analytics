import { createFileRoute } from "@tanstack/react-router";
import { ChartCard, ChartTooltip } from "@/components/cortex/ChartCard";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import { ComposedChart, Bar, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports — CorteX" }] }),
  component: Page,
});

const data = Array.from({length: 8}).map((_,i)=>({
  w: `W${i+1}`,
  positive: 60 + Math.round(Math.random()*15),
  negative: 10 + Math.round(Math.random()*10),
  csat: 80 + Math.round(Math.random()*8),
}));
const reports = [
  { name:"Weekly Sentiment Brief", date:"May 6, 2026", type:"Sentiment", size:"1.2MB" },
  { name:"Monthly Churn Outlook", date:"May 1, 2026", type:"Churn", size:"2.4MB" },
  { name:"VIP Customer Index", date:"Apr 28, 2026", type:"Customer", size:"845KB" },
  { name:"Q1 Executive Summary", date:"Apr 5, 2026", type:"Executive", size:"3.1MB" },
];

function Page() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-white border border-border text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground"/> Last 8 weeks
        </div>
        <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-white border border-border text-sm">
          <Filter className="w-4 h-4 text-muted-foreground"/> All segments
        </div>
        <button onClick={()=>toast.success("Report exported successfully")} className="ml-auto btn-gradient h-10 px-4 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Download className="w-4 h-4"/> Export PDF
        </button>
      </div>

      <ChartCard title="Performance Overview" subtitle="Sentiment vs CSAT score">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FB"/>
            <XAxis dataKey="w" stroke="#94a3b8" fontSize={11}/>
            <YAxis stroke="#94a3b8" fontSize={11}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }}/>
            <Bar dataKey="positive" stackId="a" fill="#7EC48A" radius={[6,6,0,0]}/>
            <Bar dataKey="negative" stackId="a" fill="#E8907A" radius={[6,6,0,0]}/>
            <Line type="monotone" dataKey="csat" stroke="#A78BD4" strokeWidth={2.5} dot={{r:4}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Generated Reports" subtitle="Download archived insights">
        <ul className="divide-y divide-border">
          {reports.map(r=>(
            <li key={r.name} className="py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-banner flex items-center justify-center text-primary"><FileText className="w-5 h-5"/></div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.type} • {r.date} • {r.size}</div>
              </div>
              <button onClick={()=>toast.success(`${r.name} downloaded`)} className="text-xs px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/70 font-medium flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5"/> Download
              </button>
            </li>
          ))}
        </ul>
      </ChartCard>
    </div>
  );
}
