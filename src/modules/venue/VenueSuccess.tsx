"use client";

import { useRouter } from "next/navigation";

interface VenueSuccessProps {
  venueName: string;
  phone: string;
  address: string;
  category: string;
  onAddAnother: () => void;
}

export default function VenueSuccess({ venueName, phone, address, category, onAddAnother }: VenueSuccessProps) {
  const router = useRouter();

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

      {/* Success card */}
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "4vh 2vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "2vh" }}>

        {/* Check icon */}
        <div style={{ width: "5vw", height: "5vw", borderRadius: "50%", background: "rgba(220, 252, 231, 1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(34, 197, 94, 1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "2.2vw", height: "2.2vw" }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontSize: "1.6vw", fontWeight: 700, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>Venue Added Successfully!</h1>
        <p style={{ fontSize: "0.85vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: 0, textAlign: "center" }}>
          The venue has been created and is now visible to travelers. You can edit the details anytime from the Venue Management page.
        </p>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px", background: "#F1F5F9" }} />

        {/* Summary card */}
        <div style={{ width: "100%", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "2vh 1.5vw" }}>
          <p style={{ fontSize: "0.95vw", fontWeight: 700, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: "0 0 2vh" }}>Venue Summary Details</p>

          {[
            { label: "Venue Name", value: venueName },
            { label: "Mobile number", value: phone },
            { label: "Address", value: address },
            { label: "Category", value: category },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2vh 0", borderBottom: "1px solid #F1F5F9" }}>
              <p style={{ fontSize: "0.85vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: 0 }}>{label}</p>
              <p style={{ fontSize: "0.85vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>{value || "—"}</p>
            </div>
          ))}

          {/* Business Hours Status */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2vh 0" }}>
            <p style={{ fontSize: "0.85vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: 0 }}>Business Hours Status</p>
            <p style={{ fontSize: "0.85vw", fontWeight: 600, color: "rgba(34,197,94,1)", fontFamily: "Poppins", margin: 0 }}>
              • Configured (Mon – Sun, 09:00 – 21:00)
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "1.2vw", justifyContent: "flex-end", width: "100%", marginTop: "1vh" }}>
          <button
            onClick={onAddAnother}
            style={{ padding: "1.8vh 2vw", borderRadius: "30px", border: "1.5px solid #E2E8F0", background: "#fff", fontSize: "0.9vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#15223F")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
          >
            Add Another Venue
          </button>
          <button
            onClick={() => router.push("/venue")}
            style={{ padding: "1.8vh 2vw", borderRadius: "30px", border: "none", background: "rgba(21, 34, 63, 1)", fontSize: "0.9vw", fontWeight: 500, color: "#fff", fontFamily: "Poppins", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View Venue Details
          </button>
        </div>
      </div>
    </div>
  );
}