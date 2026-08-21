"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease" | "pending";
  icon: React.ReactNode;
  iconBg: string;
}

interface RecentUser {
  initials: string;
  avatarBg: string;
  name: string;
  joined: string;
  status: "Active" | "Blocked";
}

interface RecentExperience {
  initials: string;
  avatarBg: string;
  username: string;
  venue: string;
  rating: number;
  status: "New" | "Active";
}

interface RecentDeal {
  deal: string;
  venue: string;
  discount: string;
  price: string;
  status: "Active" | "Inactive";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const weeklyData = [
  { month: "May", users: 8200 },
  { month: "Jun", users: 4500 },
  { month: "Jul", users: 6800 },
  { month: "Aug", users: 5200 },
  { month: "Sep", users: 8500 },
  { month: "Oct", users: 9800 },
];

const monthlyData = [
  { month: "May", users: 30000 },
  { month: "Jun", users: 22000 },
  { month: "Jul", users: 28000 },
  { month: "Aug", users: 35000 },
  { month: "Sep", users: 40000 },
  { month: "Oct", users: 53009 },
];

const yearlyData = [
  { month: "2019", users: 15000 },
  { month: "2020", users: 25000 },
  { month: "2021", users: 32000 },
  { month: "2022", users: 41000 },
  { month: "2023", users: 48000 },
  { month: "2024", users: 53009 },
];

const recentUsers: RecentUser[] = [
  { initials: "MJ", avatarBg: "#4B5563", name: "Maria han", joined: "17-06-2025", status: "Blocked" },
  { initials: "MJ", avatarBg: "#7C3AED", name: "Maria han", joined: "17-06-2025", status: "Active" },
  { initials: "MJ", avatarBg: "#F97316", name: "Maria han", joined: "17-06-2025", status: "Active" },
  { initials: "MJ", avatarBg: "#10B981", name: "Maria han", joined: "17-06-2025", status: "Active" },
];

const recentExperiences: RecentExperience[] = [
  { initials: "MJ", avatarBg: "#3B82F6", username: "Reinhold39", venue: "Skyline Tour", rating: 4, status: "New" },
  { initials: "MJ", avatarBg: "#7C3AED", username: "Monica_Mueller31", venue: "Bayside Bar", rating: 4, status: "New" },
  { initials: "MJ", avatarBg: "#10B981", username: "Carley_Rath60", venue: "Downtown Cafe", rating: 4, status: "New" },
  { initials: "MJ", avatarBg: "#F97316", username: "Kaylin.Funk", venue: "Liberty Club", rating: 4, status: "New" },
];

const recentDeals: RecentDeal[] = [
  { deal: "Happy Hour Cocktails", venue: "Skyline Rooftop Bar", discount: "30%", price: "$18", status: "Active" },
  { deal: "Brunch Special", venue: "Brooklyn Brew Cafe", discount: "30%", price: "$18", status: "Active" },
  { deal: "Catch of the Day", venue: "Ocean Grill Miami", discount: "30%", price: "$18", status: "Active" },
  { deal: "Late Night Jazz Set", venue: "Sunset Tacos LA", discount: "30%", price: "$18", status: "Active" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StarRating = ({ rating, max = 5 }: { rating: number; max?: number }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {Array.from({ length: max }).map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={i < rating ? "#F59E0B" : "none"}
        stroke={i < rating ? "#F59E0B" : "#D1D5DB"}
        strokeWidth="2"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

const Avatar = ({ initials, bg, size = "2.2vw" }: { initials: string; bg: string; size?: string }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "0.8vw",
      fontWeight: 600,
      flexShrink: 0,
    }}
  >
    {initials}
  </div>
);

// ─── Icons ────────────────────────────────────────────────────────────────────

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5022 6.56301C16.4472 6.55384 16.383 6.55384 16.328 6.56301C15.063 6.51718 14.0547 5.48134 14.0547 4.19801C14.0547 2.88718 15.1089 1.83301 16.4197 1.83301C17.7305 1.83301 18.7847 2.89634 18.7847 4.19801C18.7755 5.48134 17.7672 6.51718 16.5022 6.56301Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5588 13.2365C16.8146 13.4473 18.1988 13.2273 19.1704 12.5765C20.4629 11.7148 20.4629 10.3032 19.1704 9.44149C18.1896 8.79066 16.7871 8.57065 15.5312 8.79065" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.47 6.56301C5.525 6.55384 5.58917 6.55384 5.64417 6.56301C6.90917 6.51718 7.9175 5.48134 7.9175 4.19801C7.9175 2.88718 6.86334 1.83301 5.5525 1.83301C4.24167 1.83301 3.1875 2.89634 3.1875 4.19801C3.19667 5.48134 4.205 6.51718 5.47 6.56301Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.41698 13.2365C5.16114 13.4473 3.77698 13.2273 2.80531 12.5765C1.51281 11.7148 1.51281 10.3032 2.80531 9.44149C3.78615 8.79066 5.18864 8.57065 6.44448 8.79065" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.9944 13.4107C10.9394 13.4015 10.8752 13.4015 10.8202 13.4107C9.55521 13.3648 8.54688 12.329 8.54688 11.0457C8.54688 9.73483 9.60104 8.68066 10.9119 8.68066C12.2227 8.68066 13.2769 9.744 13.2769 11.0457C13.2677 12.329 12.2594 13.374 10.9944 13.4107Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.32875 16.2981C7.03625 17.1598 7.03625 18.5714 8.32875 19.4331C9.79542 20.4139 12.1971 20.4139 13.6637 19.4331C14.9562 18.5714 14.9562 17.1598 13.6637 16.2981C12.2062 15.3264 9.79542 15.3264 8.32875 16.2981Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VenueIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9193 20.1668H4.58594C2.7526 20.1668 1.83594 19.2502 1.83594 17.4168V10.0835C1.83594 8.25016 2.7526 7.3335 4.58594 7.3335H9.16927V17.4168C9.16927 19.2502 10.0859 20.1668 11.9193 20.1668Z" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.27009 3.6665C9.19676 3.9415 9.16927 4.244 9.16927 4.58317V7.33317H4.58594V5.49984C4.58594 4.4915 5.41094 3.6665 6.41927 3.6665H9.27009Z" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.8359 7.3335V11.9168" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 7.3335V11.9168" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5859 15.5835H13.7526C13.2484 15.5835 12.8359 15.996 12.8359 16.5002V20.1668H16.5026V16.5002C16.5026 15.996 16.0901 15.5835 15.5859 15.5835Z" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 11.9165V15.5832" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.16406 17.4168V4.5835C9.16406 2.75016 10.0807 1.8335 11.9141 1.8335H17.4141C19.2474 1.8335 20.1641 2.75016 20.1641 4.5835V17.4168C20.1641 19.2502 19.2474 20.1668 17.4141 20.1668H11.9141C10.0807 20.1668 9.16406 19.2502 9.16406 17.4168Z" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DealsIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="46" rx="23" fill="#70A1E6"/>
    <path d="M16.0377 26.2325L20.1902 30.385C21.8952 32.09 24.6635 32.09 26.3777 30.385L30.4019 26.3608C32.1069 24.6558 32.1069 21.8875 30.4019 20.1733L26.2402 16.03C25.3694 15.1592 24.1685 14.6917 22.9402 14.7558L18.3569 14.9758C16.5235 15.0583 15.066 16.5158 14.9744 18.34L14.7544 22.9233C14.6994 24.1608 15.1669 25.3617 16.0377 26.2325Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.9245 23.2074C22.1901 23.2074 23.2161 22.1813 23.2161 20.9157C23.2161 19.65 22.1901 18.624 20.9245 18.624C19.6588 18.624 18.6328 19.65 18.6328 20.9157C18.6328 22.1813 19.6588 23.2074 20.9245 23.2074Z" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M24.1328 27.7907L27.7995 24.124" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExperiencesIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="46" rx="23" fill="rgba(240, 194, 116, 1)"/>
    <path d="M26.1043 16.776L27.3968 19.361C27.5709 19.7185 28.0384 20.0577 28.4326 20.131L30.7701 20.516C32.2643 20.7635 32.6126 21.8452 31.5401 22.9268L29.7159 24.751C29.4134 25.0535 29.2393 25.6493 29.3401 26.0802L29.8626 28.3352C30.2751 30.1135 29.3218 30.8102 27.7543 29.8752L25.5634 28.5735C25.1693 28.3352 24.5093 28.3352 24.1151 28.5735L21.9243 29.8752C20.3568 30.801 19.4034 30.1135 19.8159 28.3352L20.3385 26.0802C20.4393 25.6585 20.2651 25.0627 19.9626 24.751L18.1385 22.9268C17.066 21.8543 17.4143 20.7727 18.9085 20.516L21.2459 20.131C21.6401 20.0668 22.1076 19.7185 22.2818 19.361L23.5743 16.776C24.2618 15.3735 25.3985 15.3735 26.1043 16.776Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.3359 16.5835H13.8359" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5859 29.4165H13.8359" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.7526 23H13.8359" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="17" y2="7" />
    <polyline points="8,7 17,7 17,16" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="5" x2="17" y2="17" />
    <polyline points="17,8 17,17 8,17" />
  </svg>
);

// ─── Main Dashboard Component ─────────────────────────────────────────────────

export default function DashboardModule() {
  const [period, setPeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chartData =
    period === "Weekly" ? weeklyData : period === "Monthly" ? monthlyData : yearlyData;

  const statCards: StatCard[] = [
    {
      label: "Total users",
      value: "53,009",
      change: "12% increase from last month",
      changeType: "increase",
      icon: <UsersIcon />,
      iconBg: "rgba(211, 152, 231, 1)",
    },
    {
      label: "Total venues",
      value: "959",
      change: "10% decrease from last month",
      changeType: "decrease",
      icon: <VenueIcon />,
      iconBg: "rgba(232, 146, 113, 1)",
    },
    {
      label: "Active deals",
      value: "1022",
      change: "8% increase from last week",
      changeType: "increase",
      icon: <DealsIcon />,
      iconBg: "transparent",
    },
    {
      label: "Experiences",
      value: "10",
      change: "2 pending today",
      changeType: "pending",
      icon: <ExperiencesIcon />,
      iconBg: "transparent",
    },
  ];

  const iconColors: Record<string, string> = {
    "rgba(211, 152, 231, 1)": "#8B5CF6",
    "rgba(232, 146, 113, 1)": "#F97316",
    "rgba(112, 161, 229, 1)": "#3B82F6",
    "rgba(240, 194, 116, 1)": "#F59E0B",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5vw", padding: "1.5vw 2vw", background: "rgba(243, 243, 243, 1)", height: "100vh", overflowY: "auto" }}>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.2vw" }}>
        {statCards.map((card, i) => (
          <div
            key={card.label}
            style={{
              background: "#fff",
              borderRadius: "1.1vw",
              padding: `1.5vw ${i === statCards.length - 1 ? "1.8vw" : "1.2vw"} 1.5vw ${i === 0 ? "1.8vw" : "1.2vw"}`,
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              border: "1px solid #F1F5F9",
              display: "flex",
              flexDirection: "column",
              gap: "0.6vw",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: "3vw",
                height: "3vw",
                borderRadius: "50%",
                background: card.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: iconColors[card.iconBg],
              }}
            >
              {card.icon}
            </div>

            {/* Label */}
            <p style={{ margin: 0, fontSize: "0.87vw", color: "var(--Secondary, rgba(107,114,128,1))", marginTop: "0.2vw" }}>
              {card.label}
            </p>

            {/* Value */}
            <p style={{ margin: 0, fontSize: "2.1vw", fontWeight: 500, color: "#111827", lineHeight: 1, marginTop: "0.1vw", paddingBottom: "0.5vw" }}>
              {card.value}
            </p>

            {/* Change */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {card.changeType === "increase" && (
                <span style={{ color: "#10B981", display: "flex", alignItems: "center" }}>
                  <ArrowUpIcon />
                </span>
              )}
              {card.changeType === "decrease" && (
                <span style={{ color: "#EF4444", display: "flex", alignItems: "center" }}>
                  <ArrowDownIcon />
                </span>
              )}
              {card.changeType === "pending" && (
                <span style={{ color: "#10B981", display: "flex", alignItems: "center" }}>
                  <ArrowUpIcon />
                </span>
              )}
              <span
                style={{
                  fontSize: "0.75vw",
                  color: "#111827",
                }}
              >
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── User Growth Chart ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: "1.1vw",
          padding: "1.8vw 2vw",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          border: "1px solid #F1F5F9",
        }}
      >
        {/* Chart header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2vh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2vw" }}>
            <h2 style={{ margin: 0, fontSize: "1.5vw", fontWeight: 500, color: "#111827" }}>User Growth</h2>

            {/* Period dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4vw",
                  border: "none",
                  borderRadius: "0.5vw",
                  padding: "0.5vh 1vw",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "0.9vw",
                  color: "#374151",
                  fontWeight: 500,
                }}
              >
                {period}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    background: "#fff",
                    border: "none",
                    borderRadius: "0.5vw",
                    boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25), 0px 0px 2px 0px rgba(0,0,0,0.16)",
                    zIndex: 50,
                    minWidth: "8vw",
                    overflow: "hidden",
                  }}
                >
                  {(["Weekly", "Monthly", "Yearly"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setPeriod(opt);
                        setDropdownOpen(false);
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "0.7vh 1.1vw",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.9vw",
                        color: period === opt ? "#EF4444" : "#374151",
                        fontWeight: period === opt ? 600 : 400,
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4vw" }}>
            <div style={{ width: "0.6vw", height: "0.6vw", borderRadius: "50%", background: "#3B82F6" }} />
            <span style={{ fontSize: "0.85vw", color: "var(--Secondary, rgba(107,114,128,1))" }}>Last 6 months</span>
          </div>
        </div>

        {/* Recharts area chart */}
        <div style={{ width: "100%", height: "28vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={true} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: "0.8vw", fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: "0.75vw", fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "0.6vw",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontSize: "0.85vw",
              }}
              formatter={(value: any) => [value.toLocaleString(), "Users"]}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fill="url(#userGrowthGradient)"
              dot={false}
              activeDot={{ r: 5, fill: "#3B82F6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* ── Recent Users + Recent Experiences ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2vw" }}>

        {/* Recent Users */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1.1vw",
            padding: "1.5vw",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            border: "1px solid #F1F5F9",
          }}
        >
          <p style={{ margin: "0 0 2px", fontSize: 12, color: "var(--Secondary, rgba(107,114,128,1))" }}>
            Latest signups
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: "1.25vw", fontWeight: 600, color: "#111827", gridColumn: "1 / 4" }}>Recent Users</h3>
            <a href="/user-management" style={{ fontSize: 13, color: "#111827", fontWeight: 600, textDecoration: "underline", textAlign: "center" }}>
              View All
            </a>
          </div>

          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              paddingBottom: 10,
              borderBottom: "1px solid #F3F4F6",
              marginBottom: 4,
            }}
          >
            {["Profile", "User Name", "Joined", "Status"].map((h) => (
              <span key={h} style={{ fontSize: 13, fontWeight: 600, color: "#111827", textAlign: h === "Status" ? "center" : "center" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {recentUsers.map((user, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < recentUsers.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}><Avatar initials={user.initials} bg={user.avatarBg} /></div>
              <span style={{ fontSize: 14, color: "#374151", textAlign: "center" }}>{user.name}</span>
              <span style={{ fontSize: 13, color: "var(--Secondary, rgba(107,114,128,1))", textAlign: "center" }}>{user.joined}</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: user.status === "Active" ? "#10B981" : "#EF4444",
                  textAlign: "center",
                }}
              >
                {user.status}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Experiences */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1.1vw",
            padding: "1.5vw",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            border: "1px solid #F1F5F9",
          }}
        >
          <p style={{ margin: "0 0 2px", fontSize: 12, color: "var(--Secondary, rgba(107,114,128,1))" }}>
            Latest Ratings
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: "1.25vw", fontWeight: 600, color: "#111827", gridColumn: "1 / 5" }}>Recent Experiences</h3>
            <a href="/experiences" style={{ fontSize: 13, color: "#111827", fontWeight: 600, textDecoration: "underline", textAlign: "center" }}>
              View All
            </a>
          </div>

          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 8,
              justifyContent: "space-between",
              paddingBottom: 10,
              borderBottom: "1px solid #F3F4F6",
              marginBottom: 4,
            }}
          >
            {["Profile", "User Name", "Venue", "Rating", "Status"].map((h) => (
              <span key={h} style={{ fontSize: 13, fontWeight: 600, color: "#111827", textAlign: "center" }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {recentExperiences.map((exp, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 8,
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < recentExperiences.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}><Avatar initials={exp.initials} bg={exp.avatarBg} size="2vw" /></div>
              <span style={{ fontSize: 13, color: "#374151", textAlign: "center" }}>{exp.username}</span>
              <span style={{ fontSize: 12, color: "var(--Secondary, rgba(107,114,128,1))", textAlign: "center" }}>{exp.venue}</span>
              <div style={{ display: "flex", justifyContent: "center" }}><StarRating rating={exp.rating} /></div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#3B82F6", textAlign: "center" }}>{exp.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Deals ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: "1.1vw",
          padding: "1.5vw 1.8vw",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          border: "1px solid #F1F5F9",
        }}
      >
        <p style={{ margin: "0 0 2px", fontSize: 12, color: "var(--Secondary, rgba(107,114,128,1))" }}>
          Marketplace
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: "1.25vw", fontWeight: 600, color: "#111827" }}>Recent deals</h3>
          <a href="/deals" style={{ fontSize: 13, color: "#111827", fontWeight: 600, textDecoration: "underline" }}>
            View All
          </a>
        </div>

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 12,
            paddingBottom: 12,
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          {["Deal", "Venue", "Discount", "Price", "Status"].map((h) => (
            <span key={h} style={{ fontSize: 13, fontWeight: 600, color: "#111827", textAlign: ["Deal", "Venue"].includes(h) ? "center" : "center" }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {recentDeals.map((deal, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 12,
              alignItems: "center",
              padding: "16px 0",
              borderBottom: i < recentDeals.length - 1 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <span style={{ fontSize: 14, color: "#374151", textAlign: "center" }}>{deal.deal}</span>
            <span style={{ fontSize: 14, color: "#374151", textAlign: "center" }}>{deal.venue}</span>
            <span style={{ fontSize: 14, color: "#374151", textAlign: "center" }}>{deal.discount}</span>
            <span style={{ fontSize: 14, color: "#374151", textAlign: "center" }}>{deal.price}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#10B981", textAlign: "center" }}>{deal.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}