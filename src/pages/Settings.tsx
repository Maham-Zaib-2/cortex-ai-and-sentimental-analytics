import { useEffect, useState } from "react";
import { ChartCard } from "@/components/cortex/ChartCard";
import { auth } from "@/lib/auth";
import { toast } from "sonner";

function Toggle({ on, set, label, hint }:{on:boolean; set:(b:boolean)=>void; label:string; hint:string}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div><div className="text-sm font-semibold">{label}</div><div className="text-xs text-muted-foreground">{hint}</div></div>
      <button onClick={()=>set(!on)} className={`w-11 h-6 rounded-full p-0.5 transition ${on ? "gradient-brand" : "bg-accent"}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`}/>
      </button>
    </div>
  );
}

function Field({ label, value }:{ label:string; value:string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground/70">{label}</label>
      <input defaultValue={value} className="mt-1.5 w-full h-10 px-3 rounded-lg bg-[#F5F5FF] border border-transparent focus:border-primary focus:bg-white outline-none text-sm transition"/>
    </div>
  );
}

export default function Settings() {
  useEffect(() => { document.title = "Settings — CorteX"; }, []);
  const session = auth.get();
  const [emailA, setEmailA] = useState(true);
  const [pushA, setPushA] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [ai, setAi] = useState(true);

  const save = () => toast.success("Settings saved");

  return (
    <div className="space-y-6 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Profile" subtitle="Your personal information">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl gradient-brand text-white font-extrabold flex items-center justify-center text-xl">MA</div>
            <div>
              <div className="font-bold">{session?.name}</div>
              <div className="text-xs text-muted-foreground">{session?.role}</div>
              <div className="text-xs text-muted-foreground">{session?.email}</div>
            </div>
          </div>
          <div className="space-y-3">
            <Field label="Display name" value={session?.name ?? ""}/>
            <Field label="Email" value={session?.email ?? ""}/>
            <Field label="Company" value="CorteX Inc."/>
            <button onClick={save} className="btn-gradient mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold">Save Changes</button>
          </div>
        </ChartCard>

        <ChartCard title="Notifications" subtitle="Choose what you receive">
          <Toggle on={emailA} set={setEmailA} label="Email alerts" hint="Critical sentiment & churn events"/>
          <Toggle on={pushA} set={setPushA} label="Push notifications" hint="Real-time browser alerts"/>
          <Toggle on={weekly} set={setWeekly} label="Weekly digest" hint="Mondays at 9 AM"/>
          <Toggle on={ai} set={setAi} label="AI proactive insights" hint="CorteX recommends actions automatically"/>
        </ChartCard>
      </div>

      <ChartCard title="Integrations" subtitle="Connected data sources">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { n:"Zendesk", s:"Connected", c:"text-success" },
            { n:"Intercom", s:"Connected", c:"text-success" },
            { n:"Salesforce", s:"Connected", c:"text-success" },
            { n:"Slack", s:"Disconnected", c:"text-muted-foreground" },
            { n:"HubSpot", s:"Disconnected", c:"text-muted-foreground" },
            { n:"Twitter/X", s:"Connected", c:"text-success" },
          ].map(i=>(
            <div key={i.n} className="p-4 rounded-xl border border-border flex items-center justify-between">
              <div><div className="font-semibold text-sm">{i.n}</div><div className={`text-xs ${i.c}`}>{i.s}</div></div>
              <button className="text-xs px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/70 font-medium">Manage</button>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}