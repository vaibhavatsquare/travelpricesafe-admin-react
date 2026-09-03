"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

const VENUES = ["Venue A", "Venue B", "Venue C"];
const CURRENCIES = ["USD – US Dollar", "EUR – Euro", "GBP – British Pound", "INR – Indian Rupee"];

function SelectField({ label, options, value, onChange, placeholder }: {
    label: string; options: string[]; value: string;
    onChange: (v: string) => void; placeholder: string;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 400, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
                {label}
            </label>
            <div style={{ position: "relative" }}>
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "1.2vh 1.1vw", border: "1px solid #E2E8F0", borderRadius: "30px",
                        background: "#fff", fontSize: "0.9vw", color: value ? "rgba(18,18,18,1)" : "#94A3B8",
                        cursor: "pointer", fontFamily: "Poppins", fontWeight: 400, textAlign: "left",
                    }}
                >
                    {value || placeholder}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                {open && (
                    <div style={{ position: "absolute", top: "calc(100% + 0.4vh)", left: 0, right: 0, background: "#fff", borderRadius: "12px", zIndex: 200, overflow: "hidden", boxShadow: "0px 4px 16px rgba(0,0,0,0.12)" }}>
                        {options.map((opt) => (
                            <div
                                key={opt}
                                onMouseDown={() => { onChange(opt); setOpen(false); }}
                                style={{ padding: "1vh 1.1vw", fontSize: "0.9vw", cursor: "pointer", color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(254,110,57,1)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(18,18,18,1)")}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function InputField({ label, value, onChange, placeholder, type = "text" }: {
    label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 400, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: "100%", padding: "1.2vh 1.1vw",
                    border: `1px solid ${focused ? "#15223F" : "#E2E8F0"}`,
                    borderRadius: "30px", fontSize: "0.9vw", color: "rgba(18,18,18,1)",
                    outline: "none", background: "#fff", fontFamily: "Poppins",
                    boxSizing: "border-box", transition: "border-color 0.2s",
                }}
            />
        </div>
    );
}

function DateTimeField({ label, placeholder, icon }: { label: string; placeholder: string; icon: React.ReactNode }) {
    const [val, setVal] = useState("");
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 400, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
                {label}
            </label>
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "1.2vh 1.1vw", border: `1px solid ${focused ? "#15223F" : "#E2E8F0"}`,
                borderRadius: "30px", background: "#fff", cursor: "pointer",
                transition: "border-color 0.2s",
            }}>
                <span style={{ fontSize: "0.9vw", color: val ? "rgba(18,18,18,1)" : "#94A3B8", fontFamily: "Poppins", fontWeight: 400 }}>
                    {val || placeholder}
                </span>
                <span style={{ color: "#94A3B8", display: "flex", alignItems: "center" }}>{icon}</span>
            </div>
        </div>
    );
}

const CalendarIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99609 2V5" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.0039 2V5" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.49609 9.08984H20.4961" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#000" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.9984 13.6992H12.0074" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.29529 13.6992H8.30427" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.29529 16.6992H8.30427" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ClockIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

type DealInitialData = {
    venue?: string;
    dealTitle?: string;
    description?: string;
    discount?: string;
    dealPrice?: string;
    currency?: string;
    images?: string[];
    startTime?: string;
    endTime?: string;
};

export default function AddDeal({ isEdit = false, initialData = {} }: { isEdit?: boolean; initialData?: DealInitialData }) {
    const [isEdited, setIsEdited] = useState(isEdit);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [venue, setVenue] = useState(initialData.venue ?? "");
    const [dealTitle, setDealTitle] = useState(initialData.dealTitle ?? "");
    const [description, setDescription] = useState(initialData.description ?? "");
    const [discount, setDiscount] = useState(initialData.discount ?? "");
    const [dealPrice, setDealPrice] = useState(initialData.dealPrice ?? "");
    const [currency, setCurrency] = useState(initialData.currency ?? "");
    const [images, setImages] = useState<string[]>(initialData.images ?? []);
    const [startTime, setStartTime] = useState(initialData.startTime ?? "09:00");
    const [endTime, setEndTime] = useState(initialData.endTime ?? "21:00");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImages((prev) => [...prev, ev.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div style={{ padding: "2vh 2.2vw", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "1.6vh", overflowY: "auto", height: "100%" }}>

            {/* ── Back ── */}
            <button
                onClick={() => router.push("/deals")}
                style={{ display: "flex", alignItems: "center", gap: "0.8vw", background: "none", border: "none", cursor: "pointer", fontSize: "0.9vw", fontWeight: 400, color: "rgba(18,18,18,1)", fontFamily: "Poppins", width: "fit-content", padding: 0 }}
            >
                <svg width="15" height="12" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.75 6.75H0.75M6.375 12.75L0.75 6.75L6.375 0.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Venues
            </button>

            {/* ── Page Title (outside card) ── */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                    <h1 style={{ fontSize: "1.4vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", fontStyle: "normal", margin: 0 }}>
                        {isEdited ? "Edit Deal" : "Add Deal"}
                    </h1>
                    <p style={{ fontSize: "0.82vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", marginTop: "0.5vh", marginBottom: "0.4vh", fontWeight: 400 }}>
                        {isEdited ? "Configure the details and validity for this deal. Ensure all information is accurate for traveler verification." : "Configure the details and validity for this deal. Ensure all information is accurate for traveler verification."}
                    </p>
                </div>
            </div>

            {/* ── Form Card ── */}
            <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "3vh 2vw", display: "flex", flexDirection: "column", gap: "2.4vh" }}>

                {/* Venue */}
                <SelectField label="Venue" options={VENUES} value={venue} onChange={(v) => { setVenue(v); setIsEdited(true); }} placeholder="Select Venue" />

                {/* Deal Title */}
                <InputField label="Deal Title" value={dealTitle} onChange={(v) => { setDealTitle(v); setIsEdited(true); }} placeholder="Enter Deal Title" />

                {/* Description */}
                <InputField label="Description" value={description} onChange={(v) => { setDescription(v); setIsEdited(true); }} placeholder="Enter deal description" />

                {/* Discount / Deal Price / Currency */}
                <div style={{ display: "flex", gap: "1.5vw" }}>
                    <InputField label="Discount %" value={discount} onChange={(v) => { if (/^\d*$/.test(v)) { setDiscount(v); setIsEdited(true); } }} placeholder="Enter Discount in %" />
                    <InputField label="Deal price" value={dealPrice} onChange={(v) => { if (/^\d*$/.test(v)) { setDealPrice(v); setIsEdited(true); } }} placeholder="Enter Deal price" />
                    <SelectField label="Currency" options={CURRENCIES} value={currency} onChange={(v) => { setCurrency(v); setIsEdited(true); }} placeholder="Select Currency" />
                </div>

                {/* Start Date / End Date / Start Time / End Time */}
                <div style={{ display: "flex", gap: "1.5vw" }}>
                    <DatePicker label="Start Date" value="" onChange={() => { }} />
                    <DatePicker label="End Date" value="" onChange={() => { }} />
                    <TimePicker label="Start Time" value={startTime} onChange={(v) => { setStartTime(v); setIsEdited(true); }} />
                    <TimePicker label="End Time" value={endTime} onChange={(v) => { setEndTime(v); setIsEdited(true); }} />
                </div>

                {/* Image Upload */}
                <div>
                    <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 400, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
                        Image
                    </label>
                    <div style={{ display: "flex", gap: "1vw", flexWrap: "wrap", alignItems: "flex-start" }}>

                        {/* Uploaded previews */}
                        {images.map((src, idx) => (
                            <div key={idx} style={{ position: "relative", width: "7vw", height: "7vw", borderRadius: "12px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
                                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                <button
                                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                                    style={{ position: "absolute", top: "0.4vh", right: "0.3vw", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "1.4vw", height: "1.4vw", cursor: "pointer", color: "#fff", fontSize: "0.7vw", display: "flex", alignItems: "center", justifyContent: "center" }}
                                >✕</button>
                            </div>
                        ))}

                        {/* Upload box */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                width: "7vw", height: "7vw", borderRadius: "12px",
                                border: "1.5px dashed #CBD5E1", background: "#FAFAFA",
                                display: "flex", flexDirection: "column", alignItems: "center",
                                justifyContent: "center", gap: "0.6vh", cursor: "pointer",
                                transition: "border-color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#15223F")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#CBD5E1")}
                        >
                            <svg style={{ width: "1.6vw", height: "1.6vw", color: "#94A3B8" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            <p style={{ fontSize: "0.72vw", color: "#94A3B8", fontFamily: "Poppins", fontWeight: 500, margin: 0, textAlign: "center" }}>Click to Upload</p>
                        </div>

                        <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleImageUpload} />
                    </div>
                </div>
            </div>

            {/* ── Actions (outside card, bottom right) ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1.2vw", paddingBottom: "1vh" }}>
                <button
                    onClick={() => router.push("/deals")}
                    style={{ padding: "1.4vh 2.2vw", borderRadius: "30px", border: "1.5px solid #E2E8F0", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(18,18,18,1)", cursor: "pointer", fontFamily: "Poppins", transition: "border-color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#15223F")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                >
                    Cancel
                </button>
                <button
                    style={{ padding: "1.4vh 2.2vw", borderRadius: "30px", border: "none", background: "rgba(21,34,63,1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins", transition: "opacity 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Save Deal
                </button>
            </div>
        </div>
    );
}