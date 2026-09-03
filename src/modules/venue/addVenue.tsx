"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BusinessHoursTab from "./BusinessHours";
import VenueSuccess from "./VenueSuccess";

type Tab = "profile" | "hours";
type DayHours = { open: string; close: string; closed: boolean };
type BusinessHours = Record<string, DayHours>;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CATEGORIES = [
  "Restaurant", "Bar", "Cafe", "Club", "Hotel", "Event Space", "Others",
];

const CURRENCIES = [
  "USD – US Dollar", "EUR – Euro", "GBP – British Pound",
  "CAD – Canadian Dollar", "AUD – Australian Dollar", "INR – Indian Rupee",
];

// ── Small reusable select ────────────────────────────────────
function SelectField({
  label, options, value, onChange, placeholder, accent = false,
}: {
  label: string; options: string[]; value: string;
  onChange: (v: string) => void; placeholder: string; accent?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 500, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
        {label}
      </label>
      <div ref={ref} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.2vh 1.1vw", border: "1px solid #E2E8F0", borderRadius: "30px",
            background: "#fff", fontSize: "0.85vw", color: value ? "rgba(18,18,18,1)" : "#94A3B8",
            cursor: "pointer", fontFamily: "Poppins", fontWeight: value ? 500 : 400,
            textAlign: "left",
          }}
        >
          {value || placeholder}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 0.4vh)", left: 0, right: 0,
            background: "#fff", borderRadius: "12px", zIndex: 200, overflow: "hidden",
            boxShadow: "0px 4px 16px rgba(0,0,0,0.12)",
          }}>
            {options.map((opt) => (
              <div
                key={opt}
                onMouseDown={() => { onChange(opt); setOpen(false); }}
                style={{
                  padding: "1vh 1.1vw", fontSize: "0.85vw", cursor: "pointer",
                  color: value === opt && accent ? "rgba(254, 110, 57, 1)" : "rgba(18,18,18,1)",
                  fontWeight: value === opt ? 600 : 400,
                  backgroundColor: "#fff",
                  fontFamily: "Poppins",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = value !== opt ? "rgba(254, 110, 57, 1)" : e.currentTarget.style.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = value === opt && accent ? "rgba(254, 110, 57, 1)" : "rgba(18,18,18,1)"; }}
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

// ── Text input ───────────────────────────────────────────────
function InputField({
  label, value, onChange, placeholder, type = "text", icon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 500, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && (
          <span style={{ position: "absolute", left: "1.1vw", display: "flex", alignItems: "center", color: "#94A3B8" }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: icon ? "1.2vh 1.1vw 1.2vh 2.8vw" : "1.2vh 1.1vw",
            border: `1px solid ${focused ? "#15223F" : "#E2E8F0"}`,
            borderRadius: "30px", fontSize: "0.85vw", color: "rgba(18,18,18,1)",
            outline: "none", background: "#fff", fontFamily: "Poppins",
            boxSizing: "border-box", transition: "border-color 0.2s",
          }}
        />
      </div>
    </div>
  );
}

// ── Textarea ─────────────────────────────────────────────────
function TextareaField({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 500, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "1.2vh 1.1vw",
          border: `1px solid ${focused ? "#15223F" : "#E2E8F0"}`,
          borderRadius: "16px", fontSize: "0.85vw", color: "rgba(18,18,18,1)",
          outline: "none", background: "#fff", fontFamily: "Poppins",
          resize: "none", boxSizing: "border-box", transition: "border-color 0.2s",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────
type VenueInitialData = {
  venueName?: string;
  phone?: string;
  description?: string;
  avgPrice?: string;
  scheduled?: string;
  category?: string;
  currency?: string;
  website?: string;
  address?: string;
  images?: string[];
};

export default function AddVenue({ isEdit = false, initialData = {} }: { isEdit?: boolean; initialData?: VenueInitialData }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>(searchParams?.get("tab") === "hours" ? "hours" : "profile");

  // Venue Profile state
  const [venueName, setVenueName] = useState(initialData.venueName ?? "");
  const [phone, setPhone] = useState(initialData.phone ?? "");
  const [description, setDescription] = useState(initialData.description ?? "");
  const [avgPrice, setAvgPrice] = useState(initialData.avgPrice ?? "");
  const [scheduled, setScheduled] = useState(initialData.scheduled ?? "");
  const [category, setCategory] = useState(initialData.category ?? "");
  const [currency, setCurrency] = useState(initialData.currency ?? "");
  const [website, setWebsite] = useState(initialData.website ?? "");
  const [address, setAddress] = useState(initialData.address ?? "");
  const [images, setImages] = useState<string[]>(initialData.images ?? []);
const [isDirty, setIsDirty] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Business Hours state
  const [hours, setHours] = useState<BusinessHours>({
    Mon: { open: "09:00", close: "21:00", closed: true },
    Tue: { open: "09:00", close: "21:00", closed: false },
    Wed: { open: "09:00", close: "21:00", closed: false },
    Thu: { open: "09:00", close: "21:00", closed: false },
    Fri: { open: "09:00", close: "23:00", closed: false },
    Sat: { open: "09:00", close: "23:00", closed: false },
    Sun: { open: "10:00", close: "23:00", closed: false },
  });

  const markDirty = () => setIsDirty(true);

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages((prev) => [...prev, ev.target?.result as string]);
        markDirty();
      };
      reader.readAsDataURL(file);
    });
  };

  const updateHours = (day: string, field: keyof DayHours, value: string | boolean) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const handleContinue = () => {
    if (activeTab === "profile") {
      setActiveTab("hours");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isSuccess) {
    return (
      <VenueSuccess
        venueName={venueName}
        phone={phone}
        address={address}
        category={category}
        onAddAnother={() => {
          setIsSuccess(false);
          setActiveTab("profile");
          setIsDirty(false);
        }}
      />
    );
  }

  return (
    <div style={{ padding: "2vh 2.2vw", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "2vh", overflowY: "auto" }}>

      {/* Back */}
      <button
        onClick={() => router.push("/venue")}
        style={{ display: "flex", alignItems: "center", gap: "0.5vw", background: "none", border: "none", cursor: "pointer", fontSize: "0.9vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", width: "fit-content" }}
      >
        <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Venues
      </button>

      {/* Title Row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.4vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", fontStyle: "normal", margin: 0 }}>{isEdit ? "Edit Venue" : "Add Venue"}</h1>
          <p style={{ fontSize: "0.82vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", marginTop: "0.4vh", fontWeight: 400 }}>
            {isEdit ? "Update the venue details below." : "Provide the venue details. All fields are required unless marked optional."}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.8vw" }}>
          <button
            onClick={() => setActiveTab("profile")}
            style={{
              padding: "1.2vh 1.6vw", borderRadius: "30px", border: activeTab === "profile" ? "none" : "1.5px solid #E2E8F0",
              background: activeTab === "profile" ? "var(--Primary, rgba(21, 34, 63, 1))" : "#fff",
              color: activeTab === "profile" ? "#fff" : "rgba(18,18,18,1)",
              fontSize: "0.88vw", fontWeight: 600, cursor: "pointer", fontFamily: "Poppins",
              transition: "all 0.2s",
            }}
          >
            Venue Profile
          </button>
          <button
            onClick={() => setActiveTab("hours")}
            style={{
              padding: "1.2vh 1.6vw", borderRadius: "30px", border: activeTab === "hours" ? "none" : "1.5px solid #E2E8F0",
              background: activeTab === "hours" ? "var(--Primary, rgba(21, 34, 63, 1))" : "#fff",
              color: activeTab === "hours" ? "#fff" : "rgba(18,18,18,1)",
              fontSize: "0.88vw", fontWeight: 600, cursor: "pointer", fontFamily: "Poppins",
              transition: "all 0.2s",
            }}
          >
            Business Hours
          </button>
        </div>
      </div>

      {/* ── VENUE PROFILE TAB ── */}
      {activeTab === "profile" && (
        <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "2.5vh 2vw", display: "flex", flexDirection: "column", gap: "2vh" }}>

          {/* Row 1: Name + Phone */}
          <div style={{ display: "flex", gap: "1.5vw" }}>
            <InputField label="Venue name" value={venueName} onChange={(v) => { setVenueName(v); markDirty(); }} placeholder="Enter venue name" />
            <InputField label="Phone" value={phone} onChange={(v) => { if (/^[0-9+\-()\s]*$/.test(v)) setPhone(v); markDirty(); }} placeholder="Enter phone number" type="tel" />

          </div>

          {/* Row 2: Description */}
          <TextareaField label="Description" value={description} onChange={(v) => { setDescription(v); markDirty(); }} placeholder="Enter venue description" />

          {/* Row 3: Avg Price + Scheduled */}
          <div style={{ display: "flex", gap: "1.5vw" }}>
            <InputField label="Average Price (USD)" value={avgPrice} onChange={(v) => { if (/^\d*$/.test(v)) setAvgPrice(v); markDirty(); }} placeholder="e.g. 50" type="text" icon={<span style={{ fontSize: "0.85vw", fontFamily: "Poppins", fontWeight: 500, color: "#94A3B8" }}>$</span>} />
            <InputField label="Scheduled" value={scheduled} onChange={(v) => { setScheduled(v); markDirty(); }} placeholder="Enter hours" />
          </div>

          {/* Row 4: Category + Currency */}
          <div style={{ display: "flex", gap: "1.5vw" }}>
            <SelectField label="Category" options={CATEGORIES} value={category} onChange={(v) => { setCategory(v); markDirty(); }} placeholder="Select category" accent={true} />
            <SelectField label="Currency" options={CURRENCIES} value={currency} onChange={(v) => { setCurrency(v); markDirty(); }} placeholder="Select currency" accent={true} />
          </div>

          {/* Row 5: Website */}
          <div>
            <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 500, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
              Add Your Website Link
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: "1.1vw", display: "flex", alignItems: "center" }}>
                <svg style={{ width: "1vw", height: "1vw" }} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <input
                type="url"
                value={website}
                onChange={(e) => { setWebsite(e.target.value); markDirty(); }}
                placeholder="Enter website URL"
                style={{
                  width: "100%", padding: "1.2vh 1.1vw 1.2vh 2.8vw",
                  border: "1px solid #E2E8F0", borderRadius: "30px",
                  fontSize: "0.85vw", color: "rgba(18,18,18,1)", outline: "none",
                  background: "#fff", fontFamily: "Poppins", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#15223F")}
                onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
              />
            </div>
          </div>

          {/* Row 6: Images */}
          <div>
            <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 500, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
              Images
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

          {/* Row 7: Address */}
          <div>
            <label style={{ display: "block", fontSize: "0.82vw", fontWeight: 500, color: "rgba(107,114,128,1)", marginBottom: "0.8vh", fontFamily: "Poppins" }}>
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => { setAddress(e.target.value); markDirty(); }}
              placeholder="Enter venue address"
              style={{
                width: "100%", padding: "1.2vh 1.1vw",
                border: "1px solid #E2E8F0", borderRadius: "30px",
                fontSize: "0.85vw", color: "rgba(18,18,18,1)", outline: "none",
                background: "#fff", fontFamily: "Poppins", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#15223F")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Row 8: Map */}
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "26vh", position: "relative", border: "1px solid #E2E8F0" }}>
            <iframe
              src="https://maps.google.com/maps?q=40.7128,-74.006&z=14&output=embed"
              style={{ width: "100%", height: "100%", border: "none" }}
              loading="lazy"
            />
            {/* Coordinate badge */}
            <div style={{ position: "absolute", top: "1.2vh", right: "1vw", background: "rgba(255,255,255,0.92)", borderRadius: "8px", padding: "0.5vh 0.8vw", fontSize: "0.75vw", fontFamily: "Poppins", fontWeight: 500, color: "rgba(18,18,18,1)", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
              40.7128, -74.0060
            </div>
          </div>
        </div>
      )}

      {/* ── BUSINESS HOURS TAB ── */}
      {activeTab === "hours" && (
        <BusinessHoursTab hours={hours} setHours={setHours} markDirty={markDirty} />
      )}

      {/* ── Bottom Action Bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1.2vw", padding: "1vh 0 0.5vh" }}>
        <button
          onClick={() => router.push("/venue")}
          style={{
            padding: "1.8vh 1.7vw", borderRadius: "30px", border: "1.5px solid #E2E8F0",
            background: "#fff", fontSize: "0.9vw", fontWeight: 500,
            color: "rgba(18,18,18,1)", cursor: "pointer", fontFamily: "Poppins",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#15223F")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
        >
          Cancel Job
        </button>
        <button
          onClick={handleContinue}
          style={{
            padding: "1.8vh 1.7vw", borderRadius: "30px", border: "none",
            background: "var(--Primary, rgba(21, 34, 63, 1))", fontSize: "0.9vw", fontWeight: 500,
            color: "#fff", cursor: "pointer", fontFamily: "Poppins",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {activeTab === "profile" ? (isDirty ? "Save Changes" : "Continue with Business Hours") : isEdit ? "Save Changes" : "Add Venue"}
        </button>
      </div>
    </div>
  );
}