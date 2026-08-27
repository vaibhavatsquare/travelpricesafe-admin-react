"use client";

import { useState, useRef } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const AMPM = ["AM", "PM"];

function ScrollPicker({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  const idx = items.indexOf(value);
  const isAmPm = items.length === 2;

  const increment = () => { const next = (idx + 1) % items.length; onChange(items[next]); };
  const decrement = () => { const prev = (idx - 1 + items.length) % items.length; onChange(items[prev]); };

  const [inputVal, setInputVal] = useState(value);
  if (inputVal !== value && document.activeElement?.tagName !== "INPUT") setInputVal(value);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value.replace(/\D/g, ""));
  };

  const handleBlur = () => {
    const num = parseInt(inputVal);
    if (isNaN(num)) { setInputVal(value); return; }
    const formatted = String(Math.max(0, Math.min(num, items.length - 1))).padStart(2, "0");
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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.1vh", flexShrink: 0 }}>
        <button onClick={decrement} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.1vh 0", display: "flex" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(21,34,63,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "0.7vw", height: "0.7vw" }}>
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
        <button onClick={increment} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.1vh 0", display: "flex" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(21,34,63,1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "0.7vw", height: "0.7vw" }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function TimePicker({ label, value, onChange }: TimePickerProps) {
  const [hh, mm] = value.split(":");
  const [showModal, setShowModal] = useState(false);
  const [tempHH, setTempHH] = useState(hh || "09");
  const [tempMM, setTempMM] = useState(mm || "00");
  const [tempAmPm, setTempAmPm] = useState(parseInt(hh || "9") >= 12 ? "PM" : "AM");
  const iconRef = useRef<SVGSVGElement>(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  const openModal = () => {
    setTempHH(hh || "09");
    setTempMM(mm || "00");
    setTempAmPm(parseInt(hh || "9") >= 12 ? "PM" : "AM");
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setModalPos({
        left: rect.left - 320,
        top: rect.top - 210,
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

  const displayTime = value && value.includes(":") ? (() => {
    const h = parseInt(hh);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${String(h12).padStart(2, "0")}:${mm} ${ampm}`;
  })() : null;

  return (
    <>
      {/* Label */}
      <div style={{ flex: 1 }}>
        <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 400, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
          {label}
        </label>

        {/* Trigger */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.2vh 1.1vw", border: `1px solid ${showModal ? "#15223F" : "#E2E8F0"}`,
            borderRadius: "30px", background: "#fff", cursor: "pointer", transition: "border-color 0.2s",
          }}
        >
          <span style={{ fontSize: "0.9vw", color: displayTime ? "rgba(18,18,18,1)" : "#94A3B8", fontFamily: "Poppins", fontWeight: 400 }}>
            {displayTime || `Set ${label}`}
          </span>
          {/* Clock icon */}
          <svg
            ref={iconRef}
            onClick={openModal}
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ cursor: "pointer", flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1000 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{ position: "fixed", top: modalPos.top, left: modalPos.left, background: "#fff", borderRadius: "16px", padding: "2vh 1.5vw", width: "24vw", boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.06), 0px 12px 24px -8px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: "1.5vh", zIndex: 1001 }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "1vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>Set Time</p>
              <p style={{ fontSize: "0.85vw", fontWeight: 500, color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: 0 }}>{tempHH}:{tempMM} {tempAmPm}</p>
            </div>

            {/* Selectors */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1vw", width: "100%" }}>
              <div style={{ background: "rgba(243,245,253,1)", borderRadius: "12px", padding: "0.8vh 0.8vw", minWidth: 0 }}>
                <p style={{ fontSize: "0.75vw", fontWeight: 500, color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0 0 0.4vh" }}>Hour</p>
                <ScrollPicker items={HOURS} value={tempHH} onChange={setTempHH} />
              </div>
              <div style={{ background: "rgba(243,245,253,1)", borderRadius: "12px", padding: "0.8vh 0.8vw", minWidth: 0 }}>
                <p style={{ fontSize: "0.75vw", fontWeight: 500, color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0 0 0.4vh" }}>Minute</p>
                <ScrollPicker items={MINUTES} value={tempMM} onChange={setTempMM} />
              </div>
              <div style={{ background: "rgba(243,245,253,1)", borderRadius: "12px", padding: "0.8vh 0.8vw", minWidth: 0 }}>
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
                style={{ flex: 1, padding: "1.4vh 0", borderRadius: "12px", border: "none", background: "rgba(21,34,63,1)", fontSize: "0.9vw", fontWeight: 600, color: "#fff", fontFamily: "Poppins", cursor: "pointer" }}
              >Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}