export function ChartCard({ title, subtitle, action, children }:{
  title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="card-soft p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-[#E8EEFF] shadow-lg px-3 py-2 text-xs">
      {label && <div className="font-semibold text-foreground/80 mb-1">{label}</div>}
      {payload.map((p:any,i:number)=>(
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{background:p.color || p.fill}}/>
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold">{p.value}{p.unit||""}</span>
        </div>
      ))}
    </div>
  );
}
