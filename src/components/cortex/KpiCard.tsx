import { ArrowUpRight, ArrowDownRight, Minus, type LucideIcon } from "lucide-react";

type Trend = "up" | "down" | "stable";
const trendColors: Record<Trend,string> = { up: "text-success", down: "text-danger", stable: "text-warning" };

export function KpiCard({ label, value, delta, trend, Icon, gradient }:{
  label: string; value: string; delta: string; trend: Trend; Icon: LucideIcon; gradient: string;
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  return (
    <div className="card-soft p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground font-medium">{label}</div>
          <div className="text-2xl font-extrabold mt-1">{value}</div>
        </div>
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ background: gradient }}>
          <Icon className="w-5 h-5"/>
        </div>
      </div>
      <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${trendColors[trend]}`}>
        <TrendIcon className="w-3.5 h-3.5"/> {delta}
      </div>
    </div>
  );
}
