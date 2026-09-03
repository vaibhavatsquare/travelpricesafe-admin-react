"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  photo: string;
  email: string;
  role: string;
  joined: string;
  is_active: boolean;
  is_blocked: boolean;
  is_deleted: boolean;
};

type StatusFilter = "all" | "active" | "blocked" | "deleted";
type SortKey = "name" | "joined" | null;
type SortDir = "asc" | "desc";

const AVATAR_COLORS = [
  "#4F46E5", "#7C3AED", "#DB2777", "#EA580C",
  "#16A34A", "#0891B2", "#DC2626", "#9333EA",
];

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
}

// ── Sort Dropdown ─────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options: { label: string; value: SortKey }[] = [
    { label: "By Joined - New to Old", value: "joined" },
    { label: "By Joined - Old to New", value: "name" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: "0.5vw",
          padding: "1.2vh 0.8vw", border: "1px solid #E2E8F0",
          borderRadius: "30px", backgroundColor: "#fff",
          fontSize: "0.85vw", fontWeight: 500, color: "#1C1B17",
          cursor: "pointer", whiteSpace: "nowrap", width: "7vw", justifyContent: "space-between",
        }}
      >
        Sort
        <span style={{
          width: "1.4vw", height: "1.4vw", borderRadius: "50%",
          border: "0.5px solid #1C1B17", display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 0.5vh)", right: 0,
          backgroundColor: "#fff", border: "1px solid #F1F5F9",
          borderRadius: "0.6vw", boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25), 0px 0px 2px 0px rgba(0,0,0,0.16)",
          zIndex: 100, minWidth: "max-content", overflow: "hidden",
        }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: "0.8vh 1.2vw", fontSize: "0.85vw", cursor: "pointer",
                color: value === opt.value ? "#F26522" : "#1C1B17",
                fontWeight: value === opt.value ? 600 : 400,
                backgroundColor: value === opt.value ? "#FFF5F0" : "transparent",
              }}
              onMouseEnter={(e) => { if (value !== opt.value) e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = value === opt.value ? "#FFF5F0" : "transparent"; }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Status Dropdown ───────────────────────────────────────────
function StatusDropdown({ value, onChange }: { value: StatusFilter; onChange: (v: StatusFilter) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options: { label: string; value: StatusFilter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Blocked", value: "blocked" },
    { label: "Deleted", value: "deleted" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: "0.5vw",
          padding: "1.2vh 0.8vw", border: "1px solid #E2E8F0",
          borderRadius: "30px", backgroundColor: "#fff",
          fontSize: "0.85vw", fontWeight: 500, color: "#1C1B17",
          cursor: "pointer", whiteSpace: "nowrap", width: "7vw", justifyContent: "space-between",
        }}
      >
        {value === "all" ? "Status" : options.find((o) => o.value === value)?.label}
        <span style={{
          width: "1.4vw", height: "1.4vw", borderRadius: "50%",
          border: "0.5px solid #1C1B17", display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 0.5vh)", right: 0,
          backgroundColor: "#fff", border: "1px solid #F1F5F9",
          borderRadius: "0.6vw", boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25), 0px 0px 2px 0px rgba(0,0,0,0.16)",
          zIndex: 100, minWidth: "fit-content", overflow: "hidden",
        }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: "0.8vh 1.2vw", fontSize: "0.85vw", cursor: "pointer",
                color: value === opt.value ? "#F26522" : "#1C1B17",
                fontWeight: value === opt.value ? 600 : 400,
                backgroundColor: value === opt.value ? "#FFF5F0" : "transparent",
              }}
              onMouseEnter={(e) => { if (value !== opt.value) e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = value === opt.value ? "#FFF5F0" : "transparent"; }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function UserManagement() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir] = useState<SortDir>("asc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(false);

  // Replace with real API data
  const [users] = useState<User[]>([
    { id: 1, uuid: "u1", first_name: "Reinhold", last_name: "Smith", photo: "", email: "reinhold.s@gmail.com", role: "USD", joined: "2024-06-17", is_active: false, is_blocked: true, is_deleted: false },
    { id: 2, uuid: "u2", first_name: "Monica", last_name: "Mueller", photo: "", email: "monica.m@gmail.com", role: "USD", joined: "2024-06-17", is_active: false, is_blocked: true, is_deleted: false },
    { id: 3, uuid: "u3", first_name: "Carley", last_name: "Rath", photo: "", email: "carley.r@gmail.com", role: "USD", joined: "2024-06-17", is_active: true, is_blocked: false, is_deleted: false },
    { id: 4, uuid: "u4", first_name: "Kaylin", last_name: "Funk", photo: "", email: "kaylin.f@gmail.com", role: "USD", joined: "2024-06-17", is_active: false, is_blocked: false, is_deleted: true },
    { id: 5, uuid: "u5", first_name: "Maurice", last_name: "Bosco", photo: "", email: "maurice.b@gmail.com", role: "USD", joined: "2024-06-17", is_active: false, is_blocked: true, is_deleted: false },
    { id: 6, uuid: "u6", first_name: "Buford", last_name: "Lane", photo: "", email: "buford.l@gmail.com", role: "USD", joined: "2024-06-17", is_active: false, is_blocked: false, is_deleted: true },
    { id: 7, uuid: "u7", first_name: "Dasia", last_name: "Gleason", photo: "", email: "dasia.g@gmail.com", role: "USD", joined: "2024-06-17", is_active: true, is_blocked: false, is_deleted: false },
    { id: 8, uuid: "u8", first_name: "Devon", last_name: "Hill", photo: "", email: "devon.h@gmail.com", role: "USD", joined: "2024-06-17", is_active: true, is_blocked: false, is_deleted: false },
    { id: 9, uuid: "u9", first_name: "Trevion", last_name: "Mueller", photo: "", email: "trevion.m@gmail.com", role: "USD", joined: "2024-06-17", is_active: true, is_blocked: false, is_deleted: false },
    { id: 10, uuid: "u10", first_name: "Amanda", last_name: "Gleason", photo: "", email: "amanda.g@gmail.com", role: "USD", joined: "2024-06-17", is_active: true, is_blocked: false, is_deleted: false },
    { id: 11, uuid: "u11", first_name: "James", last_name: "Wilson", photo: "", email: "james.w@gmail.com", role: "USD", joined: "2024-05-10", is_active: true, is_blocked: false, is_deleted: false },
    { id: 12, uuid: "u12", first_name: "Sarah", last_name: "Connor", photo: "", email: "sarah.c@gmail.com", role: "USD", joined: "2024-05-12", is_active: false, is_blocked: true, is_deleted: false },
    { id: 13, uuid: "u13", first_name: "Michael", last_name: "Jordan", photo: "", email: "michael.j@gmail.com", role: "USD", joined: "2024-04-20", is_active: true, is_blocked: false, is_deleted: false },
    { id: 14, uuid: "u14", first_name: "Emily", last_name: "Davis", photo: "", email: "emily.d@gmail.com", role: "USD", joined: "2024-03-15", is_active: true, is_blocked: false, is_deleted: false },
    { id: 15, uuid: "u15", first_name: "Lucas", last_name: "Brown", photo: "", email: "lucas.b@gmail.com", role: "USD", joined: "2024-07-01", is_active: false, is_blocked: false, is_deleted: true },
  ]);

  const filteredUsers = users
    .filter((u) => {
      const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
      const matchSearch = fullName.includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" ? true :
        statusFilter === "active" ? u.is_active && !u.is_blocked && !u.is_deleted :
        statusFilter === "blocked" ? u.is_blocked :
        u.is_deleted;
      return matchSearch && matchStatus;
    })
    .sort(() => 0);

  const columns = ["Profile", "User Name", "Currency", "Email", "Joined", "Status", "Actions"];

  return (
    <div style={{ padding: "2vh 2.2vw", height: "100%", boxSizing: "border-box" as const, display: "flex", flexDirection: "column" }}>

      {/* Search + Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", marginBottom: "2.5vh" }}>
        {/* Search */}
        <div style={{ position: "relative", width: "40vw" }}>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", left: "1vw", top: "50%", transform: "translateY(-50%)", width: "1vw", height: "1vw" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "0.9vh 1vw 0.9vh 2.5vw",
              border: "1px solid #E2E8F0", borderRadius: "24px",
              fontSize: "0.85vw", color: "#1C1B17", outline: "none",
              backgroundColor: "#fff", boxSizing: "border-box" as const, height: "5vh",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#F26522")}
            onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
          />
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <SortDropdown value={sortKey} onChange={setSortKey} />
          <StatusDropdown value={statusFilter} onChange={setStatusFilter} />
        </div>
      </div>

      {/* Table Card */}
      <div style={{ backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #F1F5F9", overflow: "hidden" }}>
        <div style={{ overflowX: "auto", overflowY: "auto", height: "75vh" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "900px", tableLayout: "fixed" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9"}}>
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "1.6vh 1.6vw",
                      textAlign: col === "Profile" || col === "User Name" ? "center" : "center",
                      fontSize: "0.92vw", fontWeight: 600, color: "#1C1B17",
                      whiteSpace: "nowrap", backgroundColor: "#fff",
                      borderRadius: col === "Profile" ? "1vw 0 0 0" : col === "Actions" ? "0 1vw 0 0" : "0",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: "5vh", textAlign: "center", color: "#94A3B8", fontSize: "0.85vw" }}>
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "5vh", textAlign: "center", color: "#94A3B8", fontSize: "0.85vw" }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const status = user.is_deleted ? "deleted" : user.is_blocked ? "blocked" : "active";
                  const isDull = status === "blocked" || status === "deleted";
                  const initials = getInitials(user.first_name, user.last_name);
                  const avatarColor = getAvatarColor(user.first_name);

                  return (
                    <tr
                      key={user.id}
                      onClick={() => router.push(`/user-management/${user.uuid}`)}
                      style={{ borderBottom: "1px solid #F8FAFC", backgroundColor: "#fff", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                    >
                      {/* Profile Avatar */}
                      <td style={{ padding: "1.2vh 1.2vw", textAlign: "center" }}>
                        <div style={{
                          width: "2.5vw", height: "2.5vw", borderRadius: "50%",
                          backgroundColor: avatarColor,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.8vw", fontWeight: 700, color: "#fff",
                          flexShrink: 0,margin: "0 auto",
                        }}>
                          {user.photo
                            ? <img src={user.photo} alt={initials} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                            : initials
                          }
                        </div>
                      </td>

                      {/* User Name */}
                      <td style={{ padding: "1.2vh 1.2vw", fontSize: "0.85vw", fontWeight: 500, color: (status === "deleted" || status === "blocked") ? "rgba(107, 114, 128, 1)" : "#1C1B17", textAlign: "center" }}>
                        {user.first_name} {user.last_name}
                      </td>

                      {/* Role */}
                      <td style={{ padding: "1.2vh 1.2vw", textAlign: "center", fontSize: "0.85vw", color: (status === "deleted" || status === "blocked") ? "rgba(107, 114, 128, 1)" : "#475569" }}>
                        {user.role || "User"}
                      </td>

                      {/* Email */}
                      <td style={{ padding: "1.2vh 1.2vw", textAlign: "center", fontSize: "0.85vw", color: (status === "deleted" || status === "blocked") ? "rgba(107, 114, 128, 1)" : "#475569" }}>
                        {user.email || "-"}
                      </td>

                      {/* Joined */}
                      <td style={{ padding: "1.2vh 1.2vw", textAlign: "center", fontSize: "0.85vw", color: (status === "deleted" || status === "blocked") ? "rgba(107, 114, 128, 1)" : "#475569" }}>
                        {formatDate(user.joined)}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "1.2vh 1.2vw", textAlign: "center" }}>
                        <span style={{
                          fontSize: "0.85vw", fontWeight: 600,
                          color: status === "active" ? "#16A34A" : status === "blocked" ? "#EF4444" : "rgba(107, 114, 128, 1)",
                        }}>
                          {status === "active" ? "Active" : status === "blocked" ? "Blocked" : "Deleted"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "1.2vh 1.2vw" }}>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.2vw" }}>
                          {/* View */}
                          <button
                            onClick={() => router.push(`/user-management/${user.uuid}`)}
                            title="View"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
                          >
                            <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="3" />
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                            </svg>
                          </button>

                          {/* Block */}
                          <button
                            title="Block"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
                          >
                            <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4596 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill={(status === "blocked" || status === "deleted") ? "rgba(107, 114, 128, 1)" : "#475569"}/>
                              <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill={(status === "blocked" || status === "deleted") ? "rgba(107, 114, 128, 1)" : "#475569"}/>
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            title="Delete"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", opacity: status === "deleted" ? 0.35 : 1 }}
                          >
                            <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}