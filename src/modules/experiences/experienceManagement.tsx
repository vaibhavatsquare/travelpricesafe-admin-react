"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Experience = {
  id: number;
  userName: string;
  venue: string;
  rating: number;
  preview: string;
  date: string;
  status: "approved" | "rejected" | "deleted" | "pending";
  avatarColor: string;
};

type SortKey = "date_new" | "date_old" | "rating_high" | "rating_low" | null;
type StatusFilter = "all" | "approved" | "rejected" | "deleted" | "pending";

// ── Avatar ────────────────────────────────────────────────────
function Avatar({ color }: { color: string }) {
  return (
    <div style={{
      width: "2.4vw", height: "2.4vw", borderRadius: "50%",
      backgroundColor: color, display: "flex", alignItems: "center",
      justifyContent: "center", flexShrink: 0,
    }}>
      <span style={{ fontSize: "0.72vw", fontWeight: 600, color: "#fff", fontFamily: "Poppins" }}>MJ</span>
    </div>
  );
}

// ── Star Rating ───────────────────────────────────────────────
function StarRating({ rating, muted }: { rating: number; muted: boolean }) {
  return (
    <div style={{ display: "flex", gap: "0.15vw", justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= rating ? (muted ? "#CBD5E1" : "#F59E0B") : "none"}
          stroke={s <= rating ? (muted ? "#CBD5E1" : "#F59E0B") : "#CBD5E1"} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ── Sort Dropdown ─────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options: { label: string; value: SortKey }[] = [
    { label: "By Date - New to Old", value: "date_new" },
    { label: "By Date - Old to New", value: "date_old" },
    { label: "By Rating - High to Low", value: "rating_high" },
    { label: "By Rating - Low to High", value: "rating_low" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => {
          if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setDropdownPos({ top: rect.bottom + 6, left: rect.left });
          }
          setOpen(!open);
        }}
        style={{
          display: "flex", alignItems: "center", gap: "1.6vw",
          padding: "1.2vh 0.8vw", border: "1px solid #E2E8F0",
          borderRadius: "30px", backgroundColor: "#fff",
          fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#1C1B17",
          cursor: "pointer", whiteSpace: "nowrap", width: "7vw",
          justifyContent: "space-between", fontFamily: "Poppins",
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
          position: "fixed", top: dropdownPos.top, left: dropdownPos.left,
          backgroundColor: "#fff", border: "1px solid #F1F5F9",
          borderRadius: "0.6vw", boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25), 0px 0px 2px 0px rgba(0,0,0,0.16)",
          zIndex: 9999, minWidth: "max-content", overflow: "hidden",
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
                fontFamily: "Poppins",
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
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options: { label: string; value: StatusFilter }[] = [
    { label: "All Status", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Deleted", value: "deleted" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => {
          if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setDropdownPos({ top: rect.bottom + 6, left: rect.left });
          }
          setOpen(!open);
        }}
        style={{
          display: "flex", alignItems: "center", gap: "1.6vw",
          padding: "1.2vh 0.8vw", border: "1px solid #E2E8F0",
          borderRadius: "30px", backgroundColor: "#fff",
          fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#1C1B17",
          cursor: "pointer", whiteSpace: "nowrap", width: "8vw",
          justifyContent: "space-between", fontFamily: "Poppins",
        }}
      >
        {value === "all" ? "Status" : value.charAt(0).toUpperCase() + value.slice(1)}
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
          position: "fixed", top: dropdownPos.top, left: dropdownPos.left,
          backgroundColor: "#fff", border: "1px solid #F1F5F9",
          borderRadius: "0.6vw", boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25), 0px 0px 2px 0px rgba(0,0,0,0.16)",
          zIndex: 9999, minWidth: "9vw", overflow: "hidden",
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
                fontFamily: "Poppins",
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
export default function ExperienceManagement() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1,  userName: "Reinhold39",          venue: "Skyline Tour",      rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "deleted",  avatarColor: "#64748B" },
    { id: 2,  userName: "Monica_Mueller31",     venue: "Bayside Bar",       rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "rejected", avatarColor: "#8B5CF6" },
    { id: 3,  userName: "Carley_Rath60",        venue: "Downtown Cafe",     rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "approved", avatarColor: "#10B981" },
    { id: 4,  userName: "Kaylin.Funk",          venue: "Liberty Club",      rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "rejected", avatarColor: "#F59E0B" },
    { id: 5,  userName: "Maurice.Bosco59",      venue: "Pearl Spa",         rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "pending",  avatarColor: "#8B5CF6" },
    { id: 6,  userName: "Buford16",             venue: "Skyline Tour",      rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "deleted",  avatarColor: "#64748B" },
    { id: 7,  userName: "Dasia_Gleason63",      venue: "Skyline Tour",      rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "approved", avatarColor: "#8B5CF6" },
    { id: 8,  userName: "Devon55",              venue: "Skyline Tour",      rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "pending",  avatarColor: "#8B5CF6" },
    { id: 9,  userName: "Trevion_Mueller25",    venue: "Skyline Tour",      rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "approved", avatarColor: "#8B5CF6" },
    { id: 10, userName: "Amanda.Gleason10",     venue: "Skyline Tour",      rating: 4, preview: "Decent experience overall, though the wai...", date: "17 June 24", status: "approved", avatarColor: "#8B5CF6" },
  ]);

  const handleApprove = (id: number) => {
    setExperiences((prev) => prev.map((e) => e.id === id ? { ...e, status: "approved" } : e));
  };

  const handleReject = (id: number) => {
    setExperiences((prev) => prev.map((e) => e.id === id ? { ...e, status: "rejected" } : e));
  };

  const handleDelete = (id: number) => {
    setExperiences((prev) => prev.map((e) => e.id === id ? { ...e, status: "deleted" } : e));
  };

  const isMuted = (exp: Experience) => exp.status === "deleted";

  const filtered = experiences
    .filter((e) => {
      const matchSearch =
        e.userName.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || e.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortKey === "rating_high") return b.rating - a.rating;
      if (sortKey === "rating_low") return a.rating - b.rating;
      if (sortKey === "date_new") return b.id - a.id;
      if (sortKey === "date_old") return a.id - b.id;
      return 0;
    });

  const textColor = (exp: Experience) => isMuted(exp) ? "rgba(107,114,128,1)" : "rgba(18,18,18,1)";

  const columns = ["Profile", "User Name", "Venue", "Rating", "Preview", "Date", "Status", "Actions"];

  const statusDisplay = (exp: Experience) => {
    if (exp.status === "pending") {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4vw" }}>
          {/* Approve */}
          <button
            title="Approve"
            onClick={() => handleApprove(exp.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#0D8B47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="#0D8B47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Reject */}
          <button
            title="Reject"
            onClick={() => handleReject(exp.id)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.17188 14.8299L14.8319 9.16992" stroke="#FF4746" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8319 14.8299L9.17188 9.16992" stroke="#FF4746" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#FF4746" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      );
    }

    const colorMap: Record<string, string> = {
      approved: "#16A34A",
      rejected: "#EF4444",
      deleted:  "rgba(107,114,128,1)",
    };

    return (
      <span style={{
        fontSize: "0.85vw", fontWeight: 500, fontFamily: "Poppins",
        color: colorMap[exp.status] ?? "#1C1B17",
      }}>
        {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
      </span>
    );
  };

  return (
    <div style={{ padding: "2vh 2.2vw", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>

      {/* Search + Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", marginBottom: "2.5vh" }}>

        {/* Search */}
        <div style={{ position: "relative", flex: 1 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "absolute", left: "1vw", top: "50%", transform: "translateY(-50%)", width: "1vw", height: "1vw" }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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
              backgroundColor: "#fff", boxSizing: "border-box", height: "5vh",
              fontFamily: "Poppins",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#15223F")}
            onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
          />
        </div>

        {/* Sort */}
        <SortDropdown value={sortKey} onChange={setSortKey} />

        {/* Status */}
        <StatusDropdown value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Table Card */}
      <div style={{ backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #F1F5F9", overflow: "hidden" }}>
        <div style={{ overflowX: "auto", overflowY: "auto", height: "75vh" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "960px", tableLayout: "fixed" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {columns.map((col) => (
                  <th key={col} style={{
                    padding: "1.6vh 1.2vw",
                    textAlign: "center",
                    fontSize: "0.92vw", fontWeight: 600, color: "#1C1B17",
                    whiteSpace: "nowrap", backgroundColor: "#fff",
                    width:
                      col === "Profile"  ? "7%"  :
                      col === "User Name"? "14%" :
                      col === "Venue"    ? "13%" :
                      col === "Rating"   ? "12%" :
                      col === "Preview"  ? "22%" :
                      col === "Date"     ? "10%" :
                      col === "Status"   ? "12%" :
                      col === "Actions"  ? "10%" : "auto",
                    fontFamily: "Poppins",
                    position: "sticky", top: 0, zIndex: 10,
                    borderBottom: "1px solid #F1F5F9",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "5vh", textAlign: "center", color: "#94A3B8", fontSize: "0.85vw", fontFamily: "Poppins" }}>
                    No experiences found.
                  </td>
                </tr>
              ) : (
                filtered.map((exp) => (
                  <tr
                    key={exp.id}
                    style={{ borderBottom: "1px solid #F8FAFC", backgroundColor: "#fff" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                  >
                    {/* Profile */}
                    <td style={{ padding: "1.2vh 1.2vw", textAlign: "center" }}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Avatar color={exp.avatarColor} />
                      </div>
                    </td>

                    {/* User Name */}
                    <td style={{ padding: "1.2vh 1.2vw", textAlign: "center", fontSize: "0.85vw", color: textColor(exp), fontFamily: "Poppins", fontWeight: 400 }}>
                      {exp.userName}
                    </td>

                    {/* Venue */}
                    <td style={{ padding: "1.2vh 1.2vw", textAlign: "center", fontSize: "0.85vw", color: textColor(exp), fontFamily: "Poppins", fontWeight: 400 }}>
                      {exp.venue}
                    </td>

                    {/* Rating */}
                    <td style={{ padding: "1.2vh 1.2vw", textAlign: "center" }}>
                      <StarRating rating={exp.rating} muted={isMuted(exp)} />
                    </td>

                    {/* Preview */}
                    <td style={{ padding: "1.2vh 1.2vw", textAlign: "center", fontSize: "0.85vw", color: textColor(exp), fontFamily: "Poppins", fontWeight: 400 }}>
                      {exp.preview}
                    </td>

                    {/* Date */}
                    <td style={{ padding: "1.2vh 1.2vw", textAlign: "center", fontSize: "0.85vw", color: textColor(exp), fontFamily: "Poppins", fontWeight: 400 }}>
                      {exp.date}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "1.2vh 1.2vw", textAlign: "center" }}>
                      {statusDisplay(exp)}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "1.2vh 1.2vw" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8vw" }}>

                        {/* View */}
                        <button title="View" onClick={() => router.push(`/experiences/${exp.id}?status=${exp.status}`)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke="rgba(18,18,18,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42 13.9799 8.42 11.9999C8.42 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z" />
                            <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39C18.82 5.79 15.53 3.71 12 3.71C8.47 3.71 5.18 5.79 2.89 9.39C1.99 10.8 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z" />
                          </svg>
                        </button>

                        {/* Block */}
                        <button title="Block" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4513 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill={isMuted(exp) ? "rgba(107,114,128,1)" : "rgba(18,18,18,1)"} />
                            <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill={isMuted(exp) ? "rgba(107,114,128,1)" : "rgba(18,18,18,1)"} />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button title="Delete" onClick={() => handleDelete(exp.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke={isMuted(exp) ? "rgba(107,114,128,1)" : "#EF4444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}