"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const pageConfig: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":      { title: "Dashboard",         subtitle: "" },
  "/user-management": { title: "User Management",   subtitle: "Manage traveler accounts, review contributions, and moderate activity." },
  "/venue":          { title: "Venue Management",  subtitle: "Manage and curate special offers, discounts, and promotions across featured venues." },
  "/deals":          { title: "Deals",             subtitle: "Manage deals and offers for travelers." },
  "/experiences":    { title: "Experiences",       subtitle: "Curate and manage traveler experiences." },
  "/notifications":  { title: "Notifications",     subtitle: "Manage all system and user notifications." },
};

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const page = Object.entries(pageConfig).find(([key]) => pathname === key || pathname.startsWith(key + "/"))?.[1] ?? { title: "Admin Panel", subtitle: "" };

  return (
    <div
      style={{
        height: "11vh",
        minHeight: "68px",
        backgroundColor: "rgba(243, 243, 243, 1)",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.2vw",
        position: "sticky",
        top: 0,
        zIndex: 40,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Left — Page Title */}
      <div>
        <p style={{ fontSize: "1.4vw", fontWeight: 600, color: "#1C1B17", lineHeight: 1.2, whiteSpace: "nowrap" }}>
          {page.title}
        </p>
        {page.subtitle && (
          <p style={{ fontSize: "0.9vw", color: "var(--Secondary, rgba(107, 114, 128, 1))", marginTop: "0.3vh", whiteSpace: "nowrap" }}>
            {page.subtitle}
          </p>
        )}
      </div>

      {/* Right — Profile */}
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6vw",
            cursor: "pointer",
            border: "1px solid #F1F5F9",
            borderRadius: "2vw",
            padding: "0.7vh 1vw",
            backgroundColor: "#fff",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "2.5vw",
              height: "2.5vw",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#E2E8F0",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/auth/Frame_2147236144.jpg"
              alt="Admin"
              width={40}
              height={40}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              onError={(e) => {
                // Fallback to initials if image fails
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Name & Email */}
          <div>
            <p style={{ fontSize: "0.95vw", fontWeight: 500, color: "#1C1B17", lineHeight: 1.3, whiteSpace: "nowrap" }}>
              Joseph meian
            </p>
            <p style={{ fontSize: "0.8vw", color: "#94A3B8", whiteSpace: "nowrap" }}>
              admin@travelpricesafe.com
            </p>
          </div>

          {/* Chevron */}
          <svg
            viewBox="0 0 24 24" fill="none"
            stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ width: "1.1vw", height: "1.1vw", transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 1vh)",
              right: 0,
              backgroundColor: "rgba(243, 243, 243, 1)",
              border: "1px solid #F1F5F9",
              borderRadius: "0.7vw",
              boxShadow: "0 0.5vh 1.5vw rgba(0,0,0,0.08)",
              width: "12.5vw",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            <div
              onClick={() => {
                setDropdownOpen(false);
                // handleLogout();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7vw",
                padding: "1.3vh 1.1vw",
                cursor: "pointer",
                fontSize: "1vw",
                color: "#EF4444",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}