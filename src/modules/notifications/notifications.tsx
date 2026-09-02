"use client";

import { useState } from "react";
import DatePicker from "@/modules/deals/DatePicker";
import TimePicker from "@/modules/deals/TimePicker";

type NotificationStatus = "delivered" | "scheduled";
type HistoryFilter = "all" | "delivered" | "scheduled";

type NotificationItem = {
    id: number;
    title: string;
    message: string;
    date: string;
    audience: string;
    recipients: string;
    status: NotificationStatus;
};

const mockNotifications: NotificationItem[] = [
    { id: 1, title: "New deal in Miami", message: "Ocean Grill Miami just launched a 2-for-1 oyster tower deal.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "delivered" },
    { id: 2, title: "Weekly Safety Digest", message: "Your weekly summary of safety reports is ready to review.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "delivered" },
    { id: 3, title: "App update available", message: "Version 2.4 is now available with improved deal search.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "delivered" },
    { id: 4, title: "New venue: Pike Place Oysters", message: "Version 2.4 is now available with improved deal search.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "delivered" },
    { id: 5, title: "New deal in Miami", message: "Ocean Grill Miami just launched a 2-for-1 oyster tower deal.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "scheduled" },
    { id: 6, title: "Weekly Safety Digest", message: "Your weekly summary of safety reports is ready to review.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "scheduled" },
    { id: 7, title: "App update available", message: "Version 2.4 is now available with improved deal search.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "scheduled" },
    { id: 8, title: "Emma Davis left a 5-star review on Skyline Rooftop Bar", message: "Ocean Grill Miami just launched a 2-for-1 oyster tower deal.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "scheduled" },
    { id: 9, title: "New deal in Miami", message: "Ocean Grill Miami just launched a 2-for-1 oyster tower deal.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "delivered" },
    { id: 10, title: "Weekly Safety Digest", message: "Your weekly summary of safety reports is ready to review.", date: "2025-05-20 10:24", audience: "All Users", recipients: "12,450 recipients", status: "delivered" },
];

const audienceOptions = [
    "All Users (12,450)",
    "New Users",
    "Premium Users",
    "Inactive Users",
];

function BellIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <rect width="40" height="40" rx="20" fill="#FE6E39" />
            <path d="M20 14.9023V17.9548" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M20.018 10.834C16.6447 10.834 13.913 13.5657 13.913 16.939V18.864C13.913 19.4873 13.6563 20.4223 13.3355 20.954L12.1713 22.8973C11.4563 24.0982 11.9513 25.4365 13.2713 25.8765C17.653 27.334 22.3922 27.334 26.7738 25.8765C28.0113 25.464 28.543 24.0157 27.8738 22.8973L26.7097 20.954C26.3888 20.4223 26.1322 19.4782 26.1322 18.864V16.939C26.123 13.584 23.373 10.834 20.018 10.834Z" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M23.0542 26.252C23.0542 27.9295 21.6792 29.3045 20.0017 29.3045C19.1676 29.3045 18.3976 28.9561 17.8476 28.4061C17.2976 27.8561 16.9492 27.0861 16.9492 26.252" stroke="white" strokeWidth="1.3" strokeMiterlimit="10" />
        </svg>
    );
}

export default function Notifications() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [audience, setAudience] = useState(audienceOptions[0]);
    const [audienceOpen, setAudienceOpen] = useState(false);
    const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("all");
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("11:00");

    const filtered = mockNotifications.filter((n) => {
        if (historyFilter === "all") return true;
        return n.status === historyFilter;
    });

    const filterTabs: { label: string; value: HistoryFilter }[] = [
        { label: "All", value: "all" },
        { label: "Delivered", value: "delivered" },
        { label: "Scheduled", value: "scheduled" },
    ];

    return (
        <div style={{
            padding: "2vh 2vw",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            gap: "1.5vw",
            fontFamily: "Poppins",
            overflowY: "hidden",
        }}>

            {/* ── Left: Compose ── */}
            <div style={{
                width: "29vw", flexShrink: 0,
                backgroundColor: "#fff", borderRadius: "20px",
                border: "1px solid #F1F5F9", padding: "2vw",
                display: "flex", flexDirection: "column", gap: "1.2vh",
                boxSizing: "border-box", alignSelf: "flex-start",
            }}>
                <div>
                    <p style={{ fontSize: "1.3vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>
                        Compose
                    </p>
                    <p style={{ fontSize: "0.85vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0.4vh 0 0 0" }}>
                        Send a push notification to a target audience.
                    </p>
                </div>

                {/* Title */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh" }}>
                    <label style={{ fontSize: "0.85vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="A New Oyster Bar Just Opened In Seattle"
                        style={{
                            padding: "1.2vh 1vw",
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
                            fontSize: "0.85vw",
                            color: "rgba(18,18,18,1)",
                            fontFamily: "Poppins",
                            outline: "none",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#15223F")}
                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                    />
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh" }}>
                    <label style={{ fontSize: "0.85vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                        Message
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write A Clear, Friendly Message..."
                        rows={5}
                        style={{
                            padding: "1.2vh 1vw",
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
                            fontSize: "0.85vw",
                            color: "rgba(18,18,18,1)",
                            fontFamily: "Poppins",
                            outline: "none",
                            resize: "none",
                            boxSizing: "border-box",
                            width: "100%",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#15223F")}
                        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                    />
                </div>

                {/* Target Audience */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6vh", position: "relative" }}>
                    <label style={{ fontSize: "0.85vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                        Target audience
                    </label>
                    <button
                        onClick={() => setAudienceOpen(!audienceOpen)}
                        style={{
                            padding: "1.2vh 1vw",
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
                            fontSize: "0.85vw",
                            color: "rgba(18,18,18,1)",
                            fontFamily: "Poppins",
                            backgroundColor: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    >
                        {audience}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#1C1B17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                    {audienceOpen && (
                        <div style={{
                            position: "absolute", top: "100%", left: 0, right: 0,
                            backgroundColor: "#fff", border: "1px solid #F1F5F9",
                            borderRadius: "10px", zIndex: 999, overflow: "hidden",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                            marginTop: "0.4vh",
                        }}>
                            {audienceOptions.map((opt) => (
                                <div
                                    key={opt}
                                    onClick={() => { setAudience(opt); setAudienceOpen(false); }}
                                    style={{
                                        padding: "1vh 1vw",
                                        fontSize: "0.85vw",
                                        fontFamily: "Poppins",
                                        cursor: "pointer",
                                        color: audience === opt ? "#F26522" : "rgba(18,18,18,1)",
                                        backgroundColor: audience === opt ? "#FFF5F0" : "#fff",
                                        fontWeight: audience === opt ? 600 : 400,
                                    }}
                                    onMouseEnter={(e) => { if (audience !== opt) e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = audience === opt ? "#FFF5F0" : "#fff"; }}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1vh", marginTop: "0" }}>
                    {/* Send Button */}
                    <button style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5vw",
                        padding: "1.4vh 1vw",
                        border: "none", borderRadius: "30px",
                        backgroundColor: "rgba(26, 42, 79, 1)",
                        color: "#fff", fontSize: "0.95vw", fontWeight: 600,
                        fontFamily: "Poppins", cursor: "pointer",
                    }}>
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.92668 3.52584L15.06 7.09251C18.26 8.69251 18.26 11.3092 15.06 12.9092L7.92668 16.4758C3.12668 18.8758 1.16835 16.9092 3.56835 12.1175L4.29335 10.6758C4.47668 10.3092 4.47668 9.70084 4.29335 9.33418L3.56835 7.88418C1.16835 3.09251 3.13502 1.12584 7.92668 3.52584Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.53516 10H9.03516" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Send notification
                    </button>

                    {/* Schedule Button */}
                    <button
                        onClick={() => setScheduleOpen(!scheduleOpen)}
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5vw",
                            padding: "1.4vh 1vw",
                            border: "1px solid rgba(18,18,18,0.2)", borderRadius: "30px",
                            backgroundColor: "#fff",
                            color: "rgba(18,18,18,1)", fontSize: "0.95vw", fontWeight: 600,
                            fontFamily: "Poppins", cursor: "pointer",
                        }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="rgba(18,18,18,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Schedule
                    </button>
                </div>

                {/* Date & Time — shown when Schedule is clicked */}
                {scheduleOpen && (
                    <>
                        <DatePicker
                            label="Date"
                            value={scheduleDate}
                            onChange={setScheduleDate}
                        />
                        <TimePicker
                            label="Time"
                            value={scheduleTime}
                            onChange={setScheduleTime}
                        />
                    </>
                )}
            </div>

            {/* ── Right: History ── */}
            <div style={{
                flex: 1,
                backgroundColor: "#fff", borderRadius: "20px",
                border: "1px solid #F1F5F9", padding: "2vw",
                display: "flex", flexDirection: "column",
                boxSizing: "border-box", overflow: "hidden",
            }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.4vh" }}>
                    <div>
                        <p style={{ fontSize: "1.3vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>
                            History
                        </p>
                        <p style={{ fontSize: "0.85vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0.4vh 0 0 0" }}>
                            Recently sent and scheduled notifications.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div style={{
                        display: "flex", alignItems: "center",
                        backgroundColor: "#F1F5F9", borderRadius: "30px",
                        padding: "0.4vh 0.4vw", gap: "0.2vw",
                    }}>
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setHistoryFilter(tab.value)}
                                style={{
                                    padding: "0.9vh 1.4vw",
                                    borderRadius: "30px",
                                    border: "none",
                                    fontSize: "0.85vw",
                                    fontWeight: historyFilter === tab.value ? 600 : 400,
                                    fontFamily: "Poppins",
                                    cursor: "pointer",
                                    backgroundColor: historyFilter === tab.value ? "rgba(21, 34, 63, 1)" : "transparent",
                                    color: historyFilter === tab.value ? "#fff" : "rgba(107,114,128,1)",
                                    transition: "all 0.2s",
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div style={{ overflowY: "auto", marginTop: "2vh", display: "flex", flexDirection: "column", gap: "0.5vh", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {filtered.map((item, i) => (
                        <div key={item.id} style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "1.2vh 0",
                            borderBottom: "none",
                            gap: "1vw",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", flex: 1, minWidth: 0 }}>
                                <BellIcon />
                                <div style={{ minWidth: 0 }}>
                                    <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {item.title}
                                    </p>
                                    <p style={{ fontSize: "0.8vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0.2vh 0 0 0" }}>
                                        {item.message}
                                    </p>
                                    <p style={{ fontSize: "0.75vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", margin: "0.2vh 0 0 0" }}>
                                        {item.date} &nbsp;•&nbsp; {item.audience} &nbsp;•&nbsp; {item.recipients}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <span style={{
                                padding: "0.6vh 0.6vw",
                                borderRadius: "30px",
                                fontSize: "0.72vw",
                                fontWeight: 600,
                                fontFamily: "Poppins",
                                flexShrink: 0,
                                backgroundColor: item.status === "delivered" ? "rgba(13,139,71,0.08)" : "rgba(255,170,0,0.08)",
                                color: item.status === "delivered" ? "#0D8B47" : "rgba(255,170,0,1)",
                                border: item.status === "delivered" ? "1px solid rgba(13,139,71,0.4)" : "1px solid rgba(255,170,0,0.4)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}>
                                {item.status === "delivered" ? "Delivered" : "Schedule"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}