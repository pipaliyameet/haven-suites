import { useEffect, useState } from "react";
import type { Role } from "@/mock/dashboard";
import { ROLE_META } from "@/mock/dashboard";

const KEY = "aurelia.role";

export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v && v in ROLE_META ? (v as Role) : null;
}

export function setRole(role: Role) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, role);
  window.dispatchEvent(new Event("aurelia.role-change"));
}

export function clearRole() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("aurelia.role-change"));
}

export function useRole(): Role | null {
  const [role, setR] = useState<Role | null>(null);
  useEffect(() => {
    setR(getRole());
    const h = () => setR(getRole());
    window.addEventListener("aurelia.role-change", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("aurelia.role-change", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return role;
}
