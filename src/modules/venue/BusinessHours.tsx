"use client";

import { useState, useRef } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DayHours = { open: string; close: string; closed: boolean };
type BusinessHours = Record<string, DayHours>;

interface BusinessHoursProps {
  hours: BusinessHours;
  setHours: (hours: BusinessHours) => void;
  markDirty: () => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const AMPM = ["AM", "PM"];

function ScrollPicker({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  const idx = items.indexOf(value);
  const isAmPm = items.length === 2;

  const increment = () => {
    const next = (idx + 1) % items.length;
    onChange(items[next]);
  };

  const decrement = () => {
    const prev = (idx - 1 + items.length) % items.length;
    onChange(items[prev]);
  };

  const [inputVal, setInputVal] = useState(value);
  if (inputVal !== value && document.activeElement?.tagName !== "INPUT") {
    setInputVal(value);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputVal(raw);
  };

  const handleBlur = () => {
    const num = parseInt(inputVal);
    const max = items.length - 1;
    if (isNaN(num)) { setInputVal(value); return; }
    const clamped = Math.max(0, Math.min(num, max));
    const formatted = String(clamped).padStart(2, "0");
    setInputVal(formatted);
    onChange(formatted);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      {isAmPm ? (
        <div
          onClick={() => onChange(value === "AM" ? "PM" : "AM")}
          style={{ fontSize: "1vw", fontWeight: 600, color: "rgba(21,34,63,1)", fontFamily: "Poppins", cursor: "pointer", userSelect: "none", textAlign: "left", flex: 1 }}
        >
          {value}
        </div>
      ) : (
        <input
          type="text"
          value={inputVal}
          onChange={handleInput}
          onBlur={handleBlur}
          maxLength={2}
          style={{ width: "2.5vw", flexShrink: 0, textAlign: "left", border: "none", outline: "none", fontSize: "1vw", fontWeight: 600, color: "rgba(21,34,63,1)", fontFamily: "Poppins", background: "transparent" }}
        />
      )}

      {/* Up / Down arrows on right */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.1vh", flexShrink: 0 }}>
        <button
          onClick={decrement}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.1vh 0", display: "flex" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(21,34,63,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "0.7vw", height: "0.7vw" }}>
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button
          onClick={increment}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.1vh 0", display: "flex" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(21,34,63,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "0.7vw", height: "0.7vw" }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function TimeSelect({ value, onChange, isLast = false }: { value: string; onChange: (v: string) => void; isLast?: boolean }) {
  const [hh, mm] = value.split(":");
  const [showModal, setShowModal] = useState(false);
  const [tempHH, setTempHH] = useState(hh);
  const [tempMM, setTempMM] = useState(mm);
  const [tempAmPm, setTempAmPm] = useState(parseInt(hh) >= 12 ? "PM" : "AM");
  const iconRef = useRef<SVGSVGElement>(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  const openModal = () => {
    setTempHH(hh);
    setTempMM(mm);
    setTempAmPm(parseInt(hh) >= 12 ? "PM" : "AM");
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setModalPos({
        left: rect.right + 10,
        top: isLast ? rect.top - 220 : rect.top,
      });
    }
    setShowModal(true);
  };

  const handleApply = () => {
    let hour = parseInt(tempHH);
    if (tempAmPm === "PM" && hour < 12) hour += 12;
    if (tempAmPm === "AM" && hour === 12) hour = 0;
    onChange(`${String(hour).padStart(2, "0")}:${tempMM}`);
    setShowModal(false);
  };

  return (
    <>
      {/* Time display box */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0 0.8vw", background: "#fff", width: "7vw", height: "5.5vh", boxSizing: "border-box" }}>
        <span style={{ fontSize: "0.9vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>{hh}:{mm}</span>
        <svg ref={iconRef} onClick={openModal} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1vw", height: "1vw", flexShrink: 0, cursor: "pointer" }}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{ position: "fixed", top: modalPos.top, left: modalPos.left, background: "#fff", borderRadius: "16px", padding: "2vh 1.5vw", width: "24vw", boxShadow: "0 8px 32px rgba(0,0,0,0.16)", display: "flex", flexDirection: "column", gap: "1.5vh", zIndex: 1001 }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>Set Time</p>
              <p style={{ fontSize: "0.85vw", fontWeight: 500, color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: 0 }}>{tempHH}:{tempMM}</p>
            </div>

            {/* Selectors */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1vw", width: "100%" }}>
              {/* Hour */}
              <div style={{ background: "rgba(243, 245, 253, 1)", borderRadius: "12px", padding: "0.8vh 0.8vw", minWidth: 0 }}>
                <p style={{ fontSize: "0.75vw", fontWeight: 500, color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0 0 0.4vh" }}>Hour</p>
                <ScrollPicker items={HOURS} value={tempHH} onChange={setTempHH} />
              </div>

              {/* Minute */}
              <div style={{ background: "rgba(243, 245, 253, 1)", borderRadius: "12px", padding: "0.8vh 0.8vw", minWidth: 0 }}>
                <p style={{ fontSize: "0.75vw", fontWeight: 500, color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0 0 0.4vh" }}>Minute</p>
                <ScrollPicker items={MINUTES} value={tempMM} onChange={setTempMM} />
              </div>

              {/* AM/PM */}
              <div style={{ background: "rgba(243, 245, 253, 1)", borderRadius: "12px", padding: "0.8vh 0.8vw", minWidth: 0 }}>
                <p style={{ fontSize: "0.75vw", fontWeight: 500, color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0 0 0.4vh" }}>AM/PM</p>
                <ScrollPicker items={AMPM} value={tempAmPm} onChange={setTempAmPm} />
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "1vw" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ flex: 1, padding: "1.4vh 0", borderRadius: "12px", border: "1.5px solid #E2E8F0", background: "#fff", fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", cursor: "pointer" }}
              >Cancel</button>
              <button
                onClick={handleApply}
                style={{ flex: 1, padding: "1.4vh 0", borderRadius: "12px", border: "none", background: "rgba(21, 34, 63, 1)", fontSize: "0.9vw", fontWeight: 600, color: "#fff", fontFamily: "Poppins", cursor: "pointer" }}
              >Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function BusinessHoursTab({ hours, setHours, markDirty }: BusinessHoursProps) {
  const updateHours = (day: string, field: keyof DayHours, value: string | boolean) => {
    setHours({ ...hours, [day]: { ...hours[day], [field]: value } });
  };

  return (
    <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", padding: "2vh 1.5vw", display: "flex", flexDirection: "column", gap: "1.5vh" }}>

      {/* Apply to all days banner */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(243, 245, 253, 1)", borderRadius: "12px", padding: "2.6vh 1.5vw",
        border: "1px solid #E2E8F0",
      }}>
        <div>
          <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>Apply to all days</p>
          <p style={{ fontSize: "0.78vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0.3vh 0 0" }}>Use Monday's hours for the entire week.</p>
        </div>
        <div
          onClick={() => {
            const mon = hours["Mon"];
            const updated: BusinessHours = {};
            DAYS.forEach((d) => { updated[d] = { ...mon }; });
            setHours(updated);
            markDirty();
          }}
          style={{
            width: "2.8vw", height: "1.5vw", borderRadius: "30px",
            background: "rgba(21, 34, 63, 1)", position: "relative", cursor: "pointer", flexShrink: 0, marginRight: "0.1vw",
          }}
        >
          <div style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            left: "calc(100% - 1.2vw - 0.15vw)",
            width: "1.2vw", height: "1.2vw", borderRadius: "50%", background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }} />
        </div>
      </div>

      {/* Day rows */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "1vw 1.5vw" }}>
      {DAYS.map((day, idx) => {
        const h = hours[day];
        const isLast = idx === DAYS.length - 1;
        return (
          <div key={day}>
            <div style={{ display: "flex", alignItems: "center", padding: "2vh 0.5vw" }}>

              {/* Day label */}
              <p style={{ fontSize: "0.88vw", fontWeight: 600, color: "rgba(107, 114, 128, 1)", fontFamily: "Poppins", width: "3vw", flexShrink: 0, margin: 0, textTransform: "uppercase",padding:'0.8vw 0',marginRight:'1vw',marginLeft:'1vw' }}>{day}</p>

              {/* Time inputs */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", flex: 1 }}>

                {/* Open time */}
                <TimeSelect value={h.open} onChange={(v) => { updateHours(day, "open", v); markDirty(); }} isLast={idx === DAYS.length - 1} />

                <span style={{ fontSize: "0.82vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins" }}>to</span>

                {/* Close time */}
                <TimeSelect value={h.close} onChange={(v) => { updateHours(day, "close", v); markDirty(); }} isLast={idx === DAYS.length - 1} />
              </div>

              {/* Toggle — right side */}
              <div
                onClick={() => { updateHours(day, "closed", !h.closed); markDirty(); }}
                style={{
                  width: "2.6vw", height: "1.4vw", borderRadius: "30px",
                  background: h.closed ? "rgba(107, 114, 128, 1)" : "rgba(21, 34, 63, 1)",
                  position: "relative", cursor: "pointer", flexShrink: 0,
                  transition: "background 0.2s",
                }}
              >
                <div style={{
                  position: "absolute", top: "50%", transform: "translateY(-50%)",
                  left: h.closed ? "0.15vw" : "calc(100% - 1.1vw - 0.15vw)",
                  width: "1.1vw", height: "1.1vw", borderRadius: "50%", background: "#fff",
                  transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }} />
              </div>
            </div>

            {/* Divider */}
            {!isLast && <div style={{ height: "1px", background: "#F1F5F9", width: "100%" }} />}
          </div>
        );
      })}
      </div>
    </div>
  );
}