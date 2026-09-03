"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Venue = {
  id: number;
  uuid: string;
  name: string;
  address: string;
  category: string;
  city: string;
  avg_price: number;
  deals: number;
  is_active: boolean;
  is_blocked: boolean;
  is_deleted: boolean;
  image: string;
};

type CategoryFilter = "all" | "restaurant" | "bars" | "cafes" | "club" | "hotels" | "event_spaces" | "others";
type SortKey = "name" | "price" | null;
type SortDir = "asc" | "desc";

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
    { label: "By Avg Price - Low to High", value: "price" },
    { label: "By Avg Price - High to Low", value: "name" },
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

// ── Category Dropdown ─────────────────────────────────────────
function CategoryDropdown({ value, onChange }: { value: CategoryFilter; onChange: (v: CategoryFilter) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options: { label: string; value: CategoryFilter }[] = [
    { label: "All categories", value: "all" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Bars", value: "bars" },
    { label: "Cafes", value: "cafes" },
    { label: "Club", value: "club" },
    { label: "Hotels", value: "hotels" },
    { label: "Event Spaces", value: "event_spaces" },
    { label: "Others", value: "others" },
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
          cursor: "pointer", whiteSpace: "nowrap", width: "fit-content",
        }}
      >
        {value === "all" ? "All categories" : options.find((o) => o.value === value)?.label}
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

// ── Status Dropdown ───────────────────────────────────────────
type StatusFilter = "all" | "active" | "blocked" | "deleted";

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
    { label: "All status", value: "all" },
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
          cursor: "pointer", whiteSpace: "nowrap", width: "fit-content", justifyContent: "space-between",
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
          zIndex: 100, minWidth: "8vw", overflow: "hidden",
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
export default function VenueManagement() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir] = useState<SortDir>("asc");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(false);

  const [venues] = useState<Venue[]>([
    { id: 1,  uuid: "v2",  name: "Skyline Rooftop Bar", address: "230 5th Ave, New York, NY",          category: "Bar",        city: "New York",    avg_price: 42, deals: 3, is_active: false, is_blocked: true,  is_deleted: false, image: "" },
    { id: 2,  uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave, New York, NY",          category: "Cafe",       city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 3,  uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Restaurant", city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 4,  uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Cafe",       city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 5,  uuid: "v2",  name: "Skyline Rooftop Bar", address: "8118 Sunset Blvd, Los Angeles, CA",  category: "Bar",        city: "New York",    avg_price: 42, deals: 3, is_active: false, is_blocked: true,  is_deleted: false, image: "" },
    { id: 6,  uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Restaurant", city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 7,  uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Cafe",       city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 8,  uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Restaurant", city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 9,  uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Bar",        city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 10, uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Restaurant", city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 11, uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Restaurant", city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 12, uuid: "v1",  name: "Skyline Rooftop Bar", address: "230 5th Ave",                        category: "Restaurant", city: "New York",    avg_price: 42, deals: 3, is_active: true,  is_blocked: false, is_deleted: false, image: "" },
    { id: 13, uuid: "v3",  name: "The Grand Terrace",   address: "512 Park Ave, New York, NY",         category: "Restaurant", city: "New York",    avg_price: 55, deals: 1, is_active: false, is_blocked: false, is_deleted: true,  image: "" },
    { id: 14, uuid: "v3",  name: "Blue Harbor Cafe",    address: "88 Harbor Blvd, Chicago, IL",        category: "Cafe",       city: "Chicago",     avg_price: 28, deals: 2, is_active: false, is_blocked: false, is_deleted: true,  image: "" },
    { id: 15, uuid: "v3",  name: "Neon Lounge Club",    address: "340 Sunset Strip, Los Angeles, CA",  category: "Club",       city: "Los Angeles", avg_price: 60, deals: 0, is_active: false, is_blocked: false, is_deleted: true,  image: "" },
  ]);

  const filteredVenues = venues
    .filter((v) => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.address.toLowerCase().includes(search.toLowerCase()) ||
        v.city.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "all" ? true : v.category.toLowerCase() === categoryFilter;
      const matchStatus = statusFilter === "all" ? true : statusFilter === "blocked" ? v.is_blocked : statusFilter === "deleted" ? v.is_deleted : !v.is_blocked && !v.is_deleted;
      return matchSearch && matchCategory && matchStatus;
    })
    .sort(() => 0);

  const columns = ["Venue", "Category", "City", "Avg. price", "Deals", "Status", "Actions"];

  return (
    <div style={{ padding: "2vh 2.2vw", height: "100%", boxSizing: "border-box" as const, display: "flex", flexDirection: "column" }}>

      {/* Search + Filter Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", marginBottom: "2.5vh" }}>
        {/* Search */}
        <div style={{ position: "relative", width: "40vw" }}>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
          <CategoryDropdown value={categoryFilter} onChange={setCategoryFilter} />

          {/* Add Venues Button */}
          <button
            onClick={() => router.push("/venue/add")}
            style={{
              display: "flex", alignItems: "center", gap: "0.5vw",
              padding: "1.2vh 0.8vw", borderRadius: "30px",
              border: "none", backgroundColor: "#15223F",
              fontSize: "0.85vw", fontWeight: 600, color: "#fff",
              cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            Add Venues
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div style={{ backgroundColor: "#fff", borderRadius: "24px", border: "1px solid #F1F5F9", overflow: "hidden" }}>
        <div style={{ overflowX: "auto", overflowY: "auto", height: "75vh" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "900px", tableLayout: "fixed" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "1.6vh 1.6vw",
                      textAlign: col === "Venue" ? "left" : "center",
                      fontSize: "0.92vw", fontWeight: 600, color: "#1C1B17",
                      whiteSpace: "nowrap", backgroundColor: "#fff",
                      borderRadius: col === "Venue" ? "1vw 0 0 0" : col === "Actions" ? "0 1vw 0 0" : "0",
                      width: col === "Venue" ? "28%" : col === "Actions" ? "14%" : "auto",
                      fontFamily: "Poppins", lineHeight: "24px", letterSpacing: "0%",
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
              ) : filteredVenues.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "5vh", textAlign: "center", color: "#94A3B8", fontSize: "0.85vw" }}>
                    No venues found.
                  </td>
                </tr>
              ) : (
                filteredVenues.map((venue) => {
                  const status = venue.is_deleted ? "deleted" : venue.is_blocked ? "blocked" : "active";
                  return (
                    <tr
                      key={venue.id}
                      onClick={() => router.push(`/venue/${venue.uuid}`)}
                      style={{ borderBottom: "1px solid #F8FAFC", backgroundColor: "#fff", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                    >
                      {/* Venue */}
                      <td style={{ padding: "1.2vh 1.6vw" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                          {/* Thumbnail */}
                          <div style={{
                            width: "3.2vw", height: "3.2vw", borderRadius: "0.6vw", flexShrink: 0,
                            backgroundColor: "#E2E8F0", overflow: "hidden",
                          }}>
                            {venue.image
                              ? <img src={venue.image} alt={venue.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              : <div style={{ width: "100%", height: "100%", backgroundColor: "#CBD5E1", backgroundImage: "url('/public/globe.svg')", backgroundSize: "cover" }} />
                            }
                          </div>
                          {/* Name + Address */}
                          <div>
                            <p style={{ fontSize: "0.85vw", fontWeight: 600, color: (venue.is_blocked || venue.is_deleted) ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)", marginBottom: "0.2vh", fontFamily: "Poppins", lineHeight: "24px", letterSpacing: "0%" }}>{venue.name}</p>
                            <p style={{ fontSize: "0.75vw", fontWeight: 400, color: (venue.is_blocked || venue.is_deleted) ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "14vw", fontFamily: "Poppins", lineHeight: "24px", letterSpacing: "0%" }}>{venue.address}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: (venue.is_blocked || venue.is_deleted) ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)", fontFamily: "Poppins", fontWeight: 400, lineHeight: "24px", letterSpacing: "0%" }}>
                        {venue.category}
                      </td>

                      {/* City */}
                      <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: (venue.is_blocked || venue.is_deleted) ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)", fontFamily: "Poppins", fontWeight: 400, lineHeight: "24px", letterSpacing: "0%" }}>
                        {venue.city}
                      </td>

                      {/* Avg Price */}
                      <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: (venue.is_blocked || venue.is_deleted) ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)", fontFamily: "Poppins", fontWeight: 400, lineHeight: "24px", letterSpacing: "0%" }}>
                        ${venue.avg_price}
                      </td>

                      {/* Deals */}
                      <td style={{ padding: "1.2vh 1.6vw", textAlign: "center", fontSize: "0.85vw", color: (venue.is_blocked || venue.is_deleted) ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)", fontFamily: "Poppins", fontWeight: 400, lineHeight: "24px", letterSpacing: "0%" }}>
                        {venue.deals}
                      </td>

                      {/* Status */}
                      <td style={{ padding: "1.2vh 1.6vw", textAlign: "center" }}>
                        <span style={{
                          fontSize: "0.85vw", fontWeight: 600,
                          color: status === "active" ? "#16A34A" : status === "blocked" ? "#EF4444" : "rgba(107, 114, 128, 1)",
                        }}>
                          {status === "active" ? "Active" : status === "blocked" ? "Blocked" : "Deleted"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "1.2vh 1.6vw" }}>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.2vw" }}>
                          {/* View */}
                          <button
                            onClick={() => router.push(`/venue/${venue.uuid}`)}
                            title="View"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "rgba(18, 18, 18, 1)" }}
                          >
                            <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15.5819 11.9999C15.5819 13.9799 13.9819 15.5799 12.0019 15.5799C10.0219 15.5799 8.42188 13.9799 8.42188 11.9999C8.42188 10.0199 10.0219 8.41992 12.0019 8.41992C13.9819 8.41992 15.5819 10.0199 15.5819 11.9999Z" />
                              <path d="M11.9998 20.2697C15.5298 20.2697 18.8198 18.1897 21.1098 14.5897C22.0098 13.1797 22.0098 10.8097 21.1098 9.39973C18.8198 5.79973 15.5298 3.71973 11.9998 3.71973C8.46984 3.71973 5.17984 5.79973 2.88984 9.39973C1.98984 10.8097 1.98984 13.1797 2.88984 14.5897C5.17984 18.1897 8.46984 20.2697 11.9998 20.2697Z" />
                            </svg>
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => router.push(`/venue/${venue.uuid}/edit`)}
                            title="Edit"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: venue.is_deleted ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)" }}
                          >
                            <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M13.2594 3.60022L5.04936 12.2902C4.73936 12.6202 4.43936 13.2702 4.37936 13.7202L4.00936 16.9602C3.87936 18.1302 4.71936 18.9302 5.87936 18.7302L9.09936 18.1802C9.54936 18.1002 10.1794 17.7702 10.4894 17.4302L18.6994 8.74022C20.1194 7.24022 20.7594 5.53022 18.5494 3.44022C16.3494 1.37022 14.6794 2.10022 13.2594 3.60022Z" />
                              <path d="M11.8906 5.0498C12.3206 7.8098 14.5606 9.9198 17.3406 10.1998" />
                              <path d="M3 22H21" />
                            </svg>
                          </button>

                          {/* Block */}
                          <button
                            title="Block"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: (venue.is_blocked || venue.is_deleted) ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)" }}
                          >
                            <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4596 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill="currentColor"/>
                              <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill="currentColor"/>
                            </svg>
                          </button>

                          {/* Delete */}
                          <button
                            title="Delete"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: venue.is_deleted ? "rgba(107, 114, 128, 1)" : "#EF4444" }}
                          >
                            <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" stroke={venue.is_deleted ? "rgba(107, 114, 128, 1)" : "#EF4444"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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