"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Deal = {
  id: number;
  name: string;
  venue: string;
  discount: string;
  price: number;
  startDate: string;
  endDate: string;
  status: "active" | "blocked" | "deleted";
  image: string;
};

type TabFilter = "active" | "expired";
type SortKey = "price" | "name" | null;

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
    { label: "By Price - Low to High", value: "price" },
    { label: "By Price - High to Low", value: "name" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: "1.6vw",
          padding: "1.2vh 0.8vw", border: "1px solid #E2E8F0",
          borderRadius: "30px", backgroundColor: "#fff",
          fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#1C1B17",
          cursor: "pointer", whiteSpace: "nowrap", width: "7vw", justifyContent: "space-between", fontFamily: "Poppins",
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
export default function DealManagement() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TabFilter>("active");
  const [sortKey, setSortKey] = useState<SortKey>(null);

  const [deals] = useState<Deal[]>([
    { id: 1,  name: "Skyline Rooftop Bar", venue: "The Hudson Restaurant", discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "blocked",  image: "" },
    { id: 2,  name: "Skyline Rooftop Bar", venue: "Skyline Tour",           discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "blocked",  image: "" },
    { id: 3,  name: "Skyline Rooftop Bar", venue: "Bayside Bar",            discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "active",   image: "" },
    { id: 4,  name: "Skyline Rooftop Bar", venue: "Downtown Cafe",          discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "blocked",  image: "" },
    { id: 5,  name: "Skyline Rooftop Bar", venue: "Liberty Club",           discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "blocked",  image: "" },
    { id: 6,  name: "Skyline Rooftop Bar", venue: "Pearl Spa",              discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "blocked",  image: "" },
    { id: 7,  name: "Skyline Rooftop Bar", venue: "Skyline Tour",           discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "deleted",  image: "" },
    { id: 8,  name: "Skyline Rooftop Bar", venue: "Skyline Tour",           discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "active",   image: "" },
    { id: 9,  name: "Skyline Rooftop Bar", venue: "Skyline Tour",           discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "active",   image: "" },
    { id: 10, name: "Skyline Rooftop Bar", venue: "Brick & Mortar Shop",    discount: "10%", price: 42, startDate: "2026-05-01", endDate: "2026-07-31", status: "active",   image: "" },
  ]);

  const isDull = (deal: Deal) => deal.status === "deleted" || deal.status === "blocked";

  const filtered = deals
    .filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.venue.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      if (sortKey === "price") return a.price - b.price;
      if (sortKey === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const columns = ["Deals", "Venue", "Discount", "Price", "Dates", "Status", "Actions"];

  const textColor = (deal: Deal) => isDull(deal) ? "rgba(107,114,128,1)" : "rgba(18,18,18,1)";

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

        {/* Active / Expired tabs */}
        <div style={{ display: "flex", background: "#Fff", borderRadius: "30px", padding: "0.3vh 0.3vw", gap: "0.2vw", border: "1px solid #E2E8F0" }}>
          {(["active", "expired"] as TabFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "1.2vh 1.4vw", borderRadius: "30px", border: "none",
                background: tab === t ? "#15223F" : "transparent",
                color: tab === t ? "#fff" : "#1C1B17",
                fontSize: "12px",lineHeight: "16px", fontWeight: 500, cursor: "pointer",
                fontFamily: "Poppins", transition: "all 0.2s",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <SortDropdown value={sortKey} onChange={setSortKey} />

        {/* Add Deal */}
        <button
          onClick={() => router.push("/deals/add")}
          style={{
            display: "flex", alignItems: "center", gap: "0.3vw",
            padding: "1.3vh 1vw", borderRadius: "30px",
            border: "none", backgroundColor: "#15223F",
            fontSize: "14px", lineHeight: "20px", fontWeight: 500, color: "#fff",
            cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Poppins",
          }}
        >
          Add Deal
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Table Card */}
      <div style={{ backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #F1F5F9", overflow: "hidden" }}>
        <div style={{ overflowX: "auto", overflowY: "auto", height: "75vh" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "900px", tableLayout: "fixed" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {columns.map((col) => (
                  <th key={col} style={{
                    padding: "1.6vh 1.6vw",
                    textAlign: col === "Deals" ? "center" : "center",
                    fontSize: "0.92vw", fontWeight: 600, color: "#1C1B17",
                    whiteSpace: "nowrap", backgroundColor: "#fff",
                    width: col === "Deals" ? "22%" : col === "Dates" ? "20%" : col === "Actions" ? "14%" : "auto",
                    fontFamily: "Poppins",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "5vh", textAlign: "center", color: "#94A3B8", fontSize: "0.85vw", fontFamily: "Poppins" }}>
                    No deals found.
                  </td>
                </tr>
              ) : (
                filtered.map((deal) => (
                  <tr
                    key={deal.id}
                    onClick={() => router.push(`/deals/${deal.id}`)}
                    style={{ borderBottom: "1px solid #F8FAFC", backgroundColor: "#fff", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                  >
                    {/* Deal name + image */}
                    <td style={{ padding: "1.2vh 1.6vw" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                        <div style={{ width: "3.2vw", height: "3.2vw", borderRadius: "0.6vw", flexShrink: 0, backgroundColor: "#E2E8F0", overflow: "hidden" }}>
                          {deal.image
                            ? <img src={deal.image} alt={deal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <div style={{ width: "100%", height: "100%", backgroundColor: "#CBD5E1" }} />
                          }
                        </div>
                        <p style={{ fontSize: "0.85vw", fontWeight: 400, color: textColor(deal), margin: 0, fontFamily: "Poppins" }}>
                          {deal.name}
                        </p>
                      </div>
                    </td>

                    {/* Venue */}
                    <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: textColor(deal), fontFamily: "Poppins", fontWeight: 400 }}>
                      {deal.venue}
                    </td>

                    {/* Discount */}
                    <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: textColor(deal), fontFamily: "Poppins", fontWeight: 400 }}>
                      {deal.discount}
                    </td>

                    {/* Price */}
                    <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: textColor(deal), fontFamily: "Poppins", fontWeight: 400 }}>
                      ${deal.price}
                    </td>

                    {/* Dates */}
                    <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: textColor(deal), fontFamily: "Poppins", fontWeight: 400 }}>
                      {deal.startDate} → {deal.endDate}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "1.2vh 1.6vw", textAlign: "center" }}>
                      <span style={{
                        fontSize: "0.85vw", fontWeight: 500, fontFamily: "Poppins",
                        color: deal.status === "active" ? "#16A34A" : deal.status === "blocked" ? "#EF4444" : "rgba(107,114,128,1)",
                      }}>
                        {deal.status === "active" ? "Active" : deal.status === "blocked" ? "Blocked" : "Deleted"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "1.2vh 1.6vw" }}>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1vw" }}>
                        {/* View */}
                        <button title="View" onClick={() => router.push(`/deals/${deal.id}`)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke="rgba(18,18,18,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42 13.9799 8.42 11.9999C8.42 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z" />
                            <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39C18.82 5.79 15.53 3.71 12 3.71C8.47 3.71 5.18 5.79 2.89 9.39C1.99 10.8 1.99 13.18 2.89 14.59C5.18 18.19 8.47 20.27 12 20.27Z" />
                          </svg>
                        </button>

                        {/* Edit */}
                        <button title="Edit" onClick={() => router.push(`/deals/${deal.id}/edit`)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke={deal.status === "deleted" ? "rgba(107,114,128,1)" : "rgba(18,18,18,1)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13.26 3.6L5.05 12.29C4.74 12.62 4.44 13.27 4.38 13.72L4.01 16.96C3.88 18.13 4.72 18.93 5.88 18.73L9.1 18.18C9.55 18.1 10.18 17.77 10.49 17.43L18.7 8.74C20.12 7.24 20.76 5.53 18.55 3.44C16.35 1.37 14.68 2.1 13.26 3.6Z" />
                            <path d="M11.89 5.05C12.32 7.81 14.56 9.92 17.34 10.2" />
                            <path d="M3 22H21" />
                          </svg>
                        </button>

                        {/* Block */}
                        <button title="Block" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4596 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill={deal.status === "active" ? "rgba(18,18,18,1)" : "rgba(107,114,128,1)"}/>
                            <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill={deal.status === "active" ? "rgba(18,18,18,1)" : "rgba(107,114,128,1)"}/>
                          </svg>
                        </button>

                        {/* Delete */}
                        <button title="Delete" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke={deal.status === "deleted" ? "rgba(107,114,128,1)" : "#EF4444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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