import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { auth, DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CorteX" }, { name: "description", content: "Access your CorteX AI customer intelligence dashboard." }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (auth.isAuthed()) navigate({ to: "/dashboard" }); }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = auth.login(email, password);
      setLoading(false);
      if (ok) {
        toast.success("Welcome back, Maham");
        navigate({ to: "/dashboard" });
      } else {
        toast.error("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* decorative blurred circles */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(122,175,212,0.45), transparent 60%)", filter: "blur(40px)" }} />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,212,0.45), transparent 60%)", filter: "blur(40px)" }} />
      <div className="pointer-events-none absolute top-1/3 right-10 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(144,200,192,0.45), transparent 60%)", filter: "blur(40px)" }} />

      <div className="fade-in relative w-full max-w-[420px] bg-white rounded-3xl p-12" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-brand text-white font-extrabold flex items-center justify-center text-lg shadow-md">CX</div>
          <div>
            <div className="text-2xl font-extrabold tracking-tight">CorteX</div>
            <div className="text-xs text-secondary font-medium">AI-Powered Customer Intelligence</div>
          </div>
        </div>

        <div className="my-6 h-px" style={{ background: "linear-gradient(90deg,transparent,#E0E8FF,transparent)" }} />

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-foreground/70">Email Address</label>
            <div className="mt-1.5 relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="admin@cortex.ai"
                className="w-full pl-10 pr-3 h-11 rounded-lg bg-[#F5F5FF] border border-transparent focus:border-primary focus:bg-white outline-none text-sm transition" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground/70">Password</label>
            <div className="mt-1.5 relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type={show ? "text" : "password"} required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Cortex123"
                className="w-full pl-10 pr-10 h-11 rounded-lg bg-[#F5F5FF] border border-transparent focus:border-primary focus:bg-white outline-none text-sm transition" />
              <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
          </div>

          <div className="rounded-xl p-3 text-xs gradient-banner border border-white/80 flex gap-2 items-start">
            <Sparkles className="w-4 h-4 text-primary mt-0.5"/>
            <div>
              <div className="font-semibold text-foreground/80">Demo Access</div>
              <div className="text-muted-foreground">Email: <span className="font-mono">{DEMO_EMAIL}</span></div>
              <div className="text-muted-foreground">Password: <span className="font-mono">{DEMO_PASSWORD}</span></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={()=>setRemember(!remember)} className="accent-[color:var(--primary)]" />
              <span className="text-foreground/70">Remember me</span>
            </label>
            <a href="#" className="text-primary font-medium hover:underline">Forgot password?</a>
          </div>

          <button disabled={loading} type="submit" className="btn-gradient w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-80">
            {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px bg-border flex-1"/>or continue with<div className="h-px bg-border flex-1"/>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="h-11 rounded-lg border border-border bg-white text-sm font-medium hover:bg-accent transition flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.6 0 19.2-7.7 19.2-19.5 0-1.2-.1-2.3-.6-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.6 6.3 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.7 13-4.6l-6-5c-2 1.4-4.4 2.1-7 2.1-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.6 5l6 5c-.4.4 6.6-4.8 6.6-14 0-1.2-.1-2.3-.6-3.5z"/></svg>
              Google
            </button>
            <button type="button" className="h-11 rounded-lg border border-border bg-white text-sm font-medium hover:bg-accent transition flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 23 23"><path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#7fba00" d="M12 1h10v10H12z"/><path fill="#00a4ef" d="M1 12h10v10H1z"/><path fill="#ffb900" d="M12 12h10v10H12z"/></svg>
              Microsoft
            </button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">Don't have an account? <Link to="/login" className="text-primary font-medium">Contact your admin</Link></p>
        </form>
      </div>
    </div>
  );
}
