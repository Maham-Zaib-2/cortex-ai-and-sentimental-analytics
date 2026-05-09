import { useEffect } from "react";
import { ChartCard, ChartTooltip } from "@/components/cortex/ChartCard";
import { LineChart, Line, RadarChart, Radar, PolarAngleAxis, PolarGrid, PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ComposedChart, Bar, Area } from "recharts";

const monthly = Array.from({length: 12}).map((_,i)=>({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  positive: 60 + Math.round(Math.sin(i)*10) + i,
  neutral: 25 - i*0.5,
  negative: 15 - Math.round(Math.cos(i)*4),
}));
const radar = [
  { topic: "Product", score: 88 },
  { topic: "Support", score: 72 },
  { topic: "Pricing", score: 64 },
  { topic: "UX", score: 80 },
  { topic: "Delivery", score: 70 },
  { topic: "Trust", score: 85 },
];
const volume = Array.from({length: 14}).map((_,i)=>({
  d: `D${i+1}`, mentions: 200 + Math.round(Math.random()*150), avg: 75 + Math.round(Math.random()*15),
}));
const keywords = [
  { w: "fast support", s: 92, color: "#7EC48A" },
  { w: "easy onboarding", s: 88, color: "#7AAFD4" },
  { w: "pricing concern", s: 42, color: "#E8907A" },
  { w: "great UX", s: 90, color: "#A78BD4" },
  { w: "slow response", s: 38, color: "#E8907A" },
  { w: "intuitive", s: 85, color: "#90C8C0" },
  { w: "feature request", s: 60, color: "#D4B870" },
  { w: "love it", s: 96, color: "#7EC48A" },
];

export default function Sentiment() {
  useEffect(() => { document.title = "Sentiment Analysis — CorteX"; }, []);
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title="Monthly Sentiment" subtitle="Positive vs neutral vs negative">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FB"/>
                <XAxis dataKey="m" stroke="#94a3b8" fontSize={11}/>
                <YAxis stroke="#94a3b8" fontSize={11}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }}/>
                <Line type="monotone" dataKey="positive" stroke="#7EC48A" strokeWidth={2.5} dot={{r:3}}/>
                <Line type="monotone" dataKey="neutral" stroke="#90C8C0" strokeWidth={2.5} dot={{r:3}}/>
                <Line type="monotone" dataKey="negative" stroke="#E8907A" strokeWidth={2.5} dot={{r:3}}/>
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <ChartCard title="Topic Sentiment" subtitle="Across major themes">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radar}>
              <PolarGrid stroke="#E8EEFF"/>
              <PolarAngleAxis dataKey="topic" tick={{fontSize:11, fill:"#64748b"}}/>
              <PolarRadiusAxis tick={{fontSize:10, fill:"#94a3b8"}}/>
              <Radar dataKey="score" stroke="#A78BD4" fill="#A78BD4" fillOpacity={0.4}/>
              <Tooltip content={<ChartTooltip/>}/>
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Mention Volume vs Avg Sentiment" subtitle="Last 14 days">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={volume}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF1FB"/>
            <XAxis dataKey="d" stroke="#94a3b8" fontSize={11}/>
            <YAxis yAxisId="l" stroke="#94a3b8" fontSize={11}/>
            <YAxis yAxisId="r" orientation="right" stroke="#94a3b8" fontSize={11}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }}/>
            <Bar yAxisId="l" dataKey="mentions" fill="#7AAFD4" radius={[6,6,0,0]}/>
            <Area yAxisId="r" type="monotone" dataKey="avg" stroke="#A78BD4" fill="#A78BD4" fillOpacity={0.2}/>
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Trending Keywords" subtitle="Auto-extracted from interactions">
        <div className="flex flex-wrap gap-2">
          {keywords.map(k => (
            <span key={k.w} className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-white"
              style={{ color: k.color }}>
              {k.w} <span className="text-muted-foreground ml-1">{k.s}</span>
            </span>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}