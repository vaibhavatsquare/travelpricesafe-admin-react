"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

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
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6vw",
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
        </div>
      </div>
    </div>
  );
}