"use client";

import { useState, useEffect, useRef } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(date: Date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

function formatDisplay(date: Date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export default function DatePicker({ label, value, onChange }: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<Date | null>(null);
  const [pending, setPending] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (day: number) => {
    setPending(new Date(viewYear, viewMonth, day));
  };

  const handleApply = () => {
    if (pending) {
      setSelected(pending);
      onChange(formatDate(pending));
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setPending(selected);
    setOpen(false);
  };

  const isSelected = (day: number) => {
    const d = pending || selected;
    return d && d.getFullYear() === viewYear && d.getMonth() === viewMonth && d.getDate() === day;
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div ref={containerRef} style={{ flex: 1, position: "relative" }}>
      {/* Label */}
      <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 400, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
        {label}
      </label>

      {/* Trigger */}
      <div
        onClick={() => { setOpen(o => !o); setPending(selected); }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.2vh 1.1vw", border: `1px solid ${open ? "#15223F" : "#E2E8F0"}`,
          borderRadius: "30px", background: "#fff", cursor: "pointer", transition: "border-color 0.2s",
        }}
      >
        <span style={{ fontSize: "0.9vw", color: selected ? "rgba(18,18,18,1)" : "#94A3B8", fontFamily: "Poppins", fontWeight: 400 }}>
          {selected ? formatDate(selected) : `Set ${label}`}
        </span>
        {/* Calendar icon */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.99609 2V5" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.0039 2V5" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.49609 9.08984H20.4961" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9984 13.6992H12.0074" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29529 13.6992H8.30427" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.29529 16.6992H8.30427" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Picker Popup — opens above */}
      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 0.06vh)", left: '-1vw',
          background: "#fff", borderRadius: "16px", zIndex: 300,
          boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.06), 0px 12px 24px -8px rgba(0,0,0,0.08)",
          padding: "2vh 1.6vw", width: "22vw", border: "1px solid #E6E6E6",
        }}>
          {/* Header row: "Set Date" + selected display */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.4vh" }}>
            <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: "0.9vw", color: "rgba(18,18,18,1)" }}>
              Set Date
            </span>
            <span style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: "0.72vw", color: "#6B7280" }}>
              {(pending || selected) ? formatDisplay(pending || selected!) : ""}
            </span>
          </div>

          {/* Month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2vh" }}>
            <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4vh 0.5vw", display: "flex", alignItems: "center" }}>
              <svg width="12" height="18" viewBox="0 0 24 24" fill="none" stroke="#010E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: "0.88vw", color: "rgba(18,18,18,1)" }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4vh 0.5vw", display: "flex", alignItems: "center" }}>
              <svg width="12" height="18" viewBox="0 0 24 24" fill="none" stroke="#010E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "0.8vh" }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontFamily: "Poppins", fontWeight: 500, fontSize: "0.68vw", color: "#6B7280", padding: "0.5vh 0" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.2vh 0" }}>
            {cells.map((day, idx) => {
              const sel = day !== null && isSelected(day);
              return (
                <div
                  key={idx}
                  onClick={() => day !== null && handleDayClick(day)}
                  style={{
                    textAlign: "center", fontFamily: "Poppins",
                    fontSize: "0.84vw", fontWeight: 500,
                    color: sel ? "rgba(18,18,18,1)" : day !== null ? "rgba(18,18,18,1)" : "transparent",
                    padding: "0.4vh 0",
                    cursor: day !== null ? "pointer" : "default",
                    borderRadius: "50%",
                    background: sel ? "#E8EAF0" : "transparent",
                    width: "2vw", height: "2vw",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { if (day && !sel) e.currentTarget.style.background = "#F1F5F9"; }}
                  onMouseLeave={(e) => { if (day && !sel) e.currentTarget.style.background = "transparent"; }}
                >
                  {day !== null ? String(day).padStart(2, "0") : ""}
                </div>
              );
            })}
          </div>

          {/* Cancel / Apply */}
          <div style={{ display: "flex", gap: "0.6vw", marginTop: "1.6vh" }}>
            <button
              onClick={handleCancel}
              style={{
                flex: 1, padding: "1.2vh 0", borderRadius: "10px",
                border: "1.5px solid #E6E6E6", background: "#fff",
                fontFamily: "Poppins", fontWeight: 600, fontSize: "0.75vw",
                color: "rgba(18,18,18,1)", cursor: "pointer", transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#15223F")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E6E6E6")}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              style={{
                flex: 1, padding: "1.2vh 0", borderRadius: "10px",
                border: "none", background: "rgba(21,34,63,1)",
                fontFamily: "Poppins", fontWeight: 600, fontSize: "0.75vw",
                color: "#fff", cursor: "pointer", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}