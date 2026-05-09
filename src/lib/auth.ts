const KEY = "cortex_auth";
export const DEMO_EMAIL = "admin@cortex.ai";
export const DEMO_PASSWORD = "Cortex123";

export type Session = { email: string; name: string; role: string };

export const auth = {
  isAuthed(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(KEY);
  },
  get(): Session | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  },
  login(email: string, password: string): Session | null {
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const s: Session = { email, name: "Maham Aurangzaib", role: "Business Owner" };
      localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    return null;
  },
  logout() {
    localStorage.removeItem(KEY);
  },
};
