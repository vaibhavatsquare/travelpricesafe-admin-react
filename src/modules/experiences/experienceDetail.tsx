"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type ExperienceDetail = {
    id: string;
    venue: {
        name: string;
        address: string;
        type: string;
        status: "ACTIVE" | "INACTIVE";
    };
    review: {
        user: { initials: string; name: string; email: string; avatarColor: string };
        date: string;
        rating: number;
        text: string;
        pricePaid: string;
        itemName: string;
        category: string;
    };
    safety: {
        rating: number;
        tag: string;
        text: string;
        photos: string[];
    };
    uploadedPhotos: string[];
    summary: {
        rating: number;
        venue: string;
        photosCount: number;
        priceUpdate: boolean;
        vibeCheckIns: boolean;
        safetyReport: boolean;
        submissionDate: string;
        status: "Pending Review" | "Approved" | "Rejected";
    };
    vibeCheckIn: {
        crowdLevel: "Quite" | "Normal" | "Busy";
        mood: string;
        musicGenre: string;
    };
    travellerTip: string;
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockData: ExperienceDetail = {
    id: "8421",
    venue: {
        name: "The Hudson Restaurant",
        address: "412 Congress Ave, Houston, TX",
        type: "Restaurant",
        status: "ACTIVE",
    },
    review: {
        user: {
            initials: "MJ",
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            avatarColor: "#E8472A",
        },
        date: "May 15, 2026",
        rating: 4,
        text: '"Great vibes, prices are fair. Try the brisket."',
        pricePaid: "$5.00",
        itemName: "Craft Beer",
        category: "Drink",
    },
    safety: {
        rating: 4,
        tag: "THRIFT",
        text: '"Wallet was stolen while dining. Recommend keeping valuables secure and within sight."',
        photos: [""],
    },
    uploadedPhotos: ["", "", "", ""],
    summary: {
        rating: 4.5,
        venue: "The Hudson Restaurant",
        photosCount: 3,
        priceUpdate: true,
        vibeCheckIns: true,
        safetyReport: true,
        submissionDate: "May 15, 2026",
        status: "Pending Review",
    },
    vibeCheckIn: { crowdLevel: "Busy", mood: "Lively", musicGenre: "Rock" },
    travellerTip: '"Best time to visit is sunset"',
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function StarRating({ rating, size = "1vw" }: { rating: number; size?: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.2vw" }}>
            {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} style={{ width: size, height: size }} viewBox="0 0 20 20"
                    fill={s <= Math.round(rating) ? "#F59E0B" : "#E2E8F0"}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

function PhotoThumb() {
    return (
        <div style={{
            width: "5.5vw", height: "5.5vw", borderRadius: "10px",
            backgroundColor: "#CBD5E1", flexShrink: 0, overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#94A3B8" strokeWidth="1.5" opacity="0.7">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ExperienceDetail({ id, status: statusProp }: { id?: string; status?: string }) {
    const router = useRouter();
    const data = mockData; // replace with real fetch using `id`
    const [isBlocked, setIsBlocked] = useState(() => statusProp === "rejected" || statusProp === "blocked");
    const [isDeleted, setIsDeleted] = useState(() => statusProp === "deleted");
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const normalizedStatus = ((): "Pending Review" | "Approved" | "Rejected" => {
        if (statusProp === "approved") return "Approved";
        if (statusProp === "rejected" || statusProp === "deleted") return "Rejected";
        return "Pending Review";
    })();

    const showOverlay = isBlocked;

    const statusBadge = {
        "Pending Review": { bg: "rgba(255, 170, 0, 0.1)", color: "rgba(255, 170, 0, 1)", border: "1px solid rgba(255, 170, 0, 0.5)" },
        Approved: { bg: "rgba(13,139,71,0.10)", color: "#0D8B47", border: "1px solid rgba(13,139,71,0.5)" },
        Rejected: { bg: "#FEE2E2", color: "#EF4444", border: "1px solid #EF4444" },
    }[normalizedStatus];

    const crowdLevels = ["Quite", "Normal", "Busy"] as const;

    return (
        <div style={{
            padding: "2vh 1.2vw",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "2vh",
            overflowY: "auto",
            fontFamily: "Poppins",
        }}>

            {/* ── Top bar ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                {/* Back */}
                <button
                    onClick={() => router.push("/experiences")}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.5vw",
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "0.9vw", fontWeight: 500, color: "rgba(18,18,18,1)",
                        fontFamily: "Poppins",
                    }}
                >
                    <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to Experiences
                </button>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>

                    {normalizedStatus === "Rejected" && isBlocked ? (
                        <>
                            {statusProp === "deleted" ? (
                                <>
                                    {/* Deleted (disabled) */}
                                    <button disabled style={{
                                        display: "flex", alignItems: "center", gap: "0.5vw",
                                        padding: "1.2vh 1vw", border: "none", borderRadius: "30px",
                                        background: "rgba(255, 68, 68, 1)", fontSize: "1.05vw", fontWeight: 500,
                                        color: "#fff", cursor: "not-allowed", fontFamily: "Poppins", opacity: 1,
                                    }}>
                                        <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none"
                                            stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                        </svg>
                                        Deleted
                                    </button>

                                    {/* Block (disabled for deleted) */}
                                    <button disabled style={{
                                        display: "flex", alignItems: "center", gap: "0.5vw",
                                        padding: "1.2vh 1vw", border: "1px solid rgba(230,230,230,1)", borderRadius: "30px",
                                        background: "#fff", fontSize: "1.05vw", fontWeight: 500,
                                        color: "#1C1B17", cursor: "not-allowed", fontFamily: "Poppins",
                                    }}>
                                        <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                        </svg>
                                        Block
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Delete Review */}
                                    <button onClick={() => setShowDeleteModal(true)} style={{
                                        display: "flex", alignItems: "center", gap: "0.5vw",
                                        padding: "1.2vh 1vw", border: "none", borderRadius: "30px",
                                        background: "rgba(255, 68, 68, 1)", fontSize: "1.05vw", fontWeight: 500,
                                        color: "#fff", cursor: "pointer", fontFamily: "Poppins",
                                    }}>
                                        <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none"
                                            stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                            <path d="M10 11v6M14 11v6" />
                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                        </svg>
                                        Delete Review
                                    </button>

                                    {/* Block / Unblock toggle */}
                                    <button
                                        onClick={() => isBlocked ? setIsBlocked(false) : setShowBlockModal(true)}
                                        style={{
                                            display: "flex", alignItems: "center", gap: "0.5vw",
                                            padding: "1.2vh 1vw",
                                            border: "1px solid rgba(107, 114, 128, 1)", borderRadius: "30px",
                                            background: isBlocked ? "rgba(0, 0, 0, 0.1)" : "#fff",
                                            fontSize: "1.05vw", fontWeight: 500,
                                            color: "#1C1B17", cursor: "pointer", fontFamily: "Poppins",
                                        }}>
                                        <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                        </svg>
                                        {isBlocked ? "Unblock" : "Block"}
                                    </button>
                                </>
                            )}
                        </>
                    ) : isBlocked ? (
                        <>
                            {/* Delete Review (blocked state) */}
                            <button onClick={() => setShowDeleteModal(true)} style={{
                                display: "flex", alignItems: "center", gap: "0.5vw",
                                padding: "1.2vh 1vw", border: "none", borderRadius: "30px",
                                background: "rgba(255, 68, 68, 1)", fontSize: "1.05vw", fontWeight: 500,
                                color: "#fff", cursor: "pointer", fontFamily: "Poppins",
                            }}>
                                <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none"
                                    stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                                Delete Review
                            </button>

                            {/* Unblock */}
                            <button
                                onClick={() => setIsBlocked(false)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.5vw",
                                    padding: "1.2vh 1vw",
                                    border: "1px solid rgba(107, 114, 128, 1)", borderRadius: "30px",
                                    background: "rgba(0, 0, 0, 0.1)",
                                    fontSize: "1.05vw", fontWeight: 500,
                                    color: "#1C1B17", cursor: "pointer", fontFamily: "Poppins",
                                }}>
                                <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                </svg>
                                Unblock
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Delete */}
                            <button onClick={() => setShowDeleteModal(true)} style={{
                                display: "flex", alignItems: "center", gap: "0.5vw",
                                padding: "1.2vh 1vw", border: "none", borderRadius: "30px",
                                background: "rgba(255, 68, 68, 1)", fontSize: "1.05vw", fontWeight: 500,
                                color: "#fff", cursor: "pointer", fontFamily: "Poppins",
                            }}>
                                <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none"
                                    stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6M14 11v6" />
                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                                Delete
                            </button>

                            {/* Block */}
                            <button onClick={() => isBlocked ? setIsBlocked(false) : setShowBlockModal(true)} style={{
                                display: "flex", alignItems: "center", gap: "0.5vw",
                                padding: "1.2vh 1vw", border: "1px solid rgba(107, 114, 128, 1)", borderRadius: "30px",
                                background: isBlocked ? "rgba(0, 0, 0, 0.1)" : "#fff", fontSize: "1.05vw", fontWeight: 500,
                                color: "#1C1B17", cursor: "pointer", fontFamily: "Poppins",
                            }}>
                                <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4596 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill="currentColor" />
                                    <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill="currentColor" />
                                </svg>
                                {isBlocked ? "Unblock" : "Block"}
                            </button>

                            {/* Reject Review */}
                            <button style={{
                                display: "flex", alignItems: "center", gap: "0.6vw",
                                padding: "1.2vh 1vw", border: "1px solid rgba(230,230,230,1)",
                                borderRadius: "30px", background: "#fff", fontSize: "1.05vw",
                                fontWeight: 500, color: "#1C1B17", cursor: "pointer", fontFamily: "Poppins",
                            }}>
                                <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.17188 14.8299L14.8319 9.16992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.8319 14.8299L9.17188 9.16992" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Reject Review
                            </button>

                            {/* Approve Review */}
                            <button style={{
                                display: "flex", alignItems: "center", gap: "0.5vw",
                                padding: "1.2vh 1vw", border: "none", borderRadius: "30px",
                                background: "var(--Primary, rgba(21, 34, 63, 1))", fontSize: "1.05vw", fontWeight: 500,
                                color: "#fff", cursor: "pointer", fontFamily: "Poppins",
                            }}>
                                <svg style={{ width: "1.3vw", height: "1.3vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.75 11.9999L10.58 14.8299L16.25 9.16992" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Approve Review
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "5vh 2vw 4vh", width: "22vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>
                        <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5vh" }}>
                            <svg style={{ width: "2.2vw", height: "2.2vw" }} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_exp_delete)">
                                    <path d="M18.8359 14.3743V14.5827H22.1693V14.3743C22.1693 13.9323 21.9937 13.5084 21.6811 13.1958C21.3686 12.8833 20.9446 12.7077 20.5026 12.7077C20.0606 12.7077 19.6367 12.8833 19.3241 13.1958C19.0115 13.5084 18.8359 13.9323 18.8359 14.3743ZM17.7943 14.5827V14.3743C17.7943 13.6561 18.0796 12.9672 18.5875 12.4593C19.0954 11.9514 19.7843 11.666 20.5026 11.666C21.2209 11.666 21.9098 11.9514 22.4177 12.4593C22.9256 12.9672 23.2109 13.6561 23.2109 14.3743V14.5827H27.8984C28.0366 14.5827 28.169 14.6376 28.2667 14.7352C28.3644 14.8329 28.4193 14.9654 28.4193 15.1035C28.4193 15.2416 28.3644 15.3741 28.2667 15.4718C28.169 15.5695 28.0366 15.6243 27.8984 15.6243H26.683L25.8497 25.5643C25.7864 26.3192 25.4418 27.0227 24.8842 27.5354C24.3266 28.0482 23.5968 28.3327 22.8393 28.3327H18.1659C17.4085 28.3326 16.6788 28.048 16.1213 27.5353C15.5638 27.0226 15.2192 26.3191 15.1559 25.5643L14.3226 15.6243H13.1068C12.9686 15.6243 12.8362 15.5695 12.7385 15.4718C12.6408 15.3741 12.5859 15.2416 12.5859 15.1035C12.5859 14.9654 12.6408 14.8329 12.7385 14.7352C12.8362 14.6376 12.9686 14.5827 13.1068 14.5827H17.7943ZM16.1939 25.4773C16.2353 25.9718 16.4611 26.4327 16.8263 26.7686C17.1916 27.1045 17.6697 27.291 18.1659 27.291H22.8393C23.3356 27.2911 23.8138 27.1047 24.1792 26.7687C24.5445 26.4328 24.7703 25.9718 24.8118 25.4773L25.6376 15.6243H15.3676L16.1939 25.4773ZM19.4609 18.4368C19.4609 18.2985 19.4059 18.1659 19.3082 18.0682C19.2105 17.9705 19.0779 17.9155 18.9396 17.9155C18.8014 17.9155 18.6688 17.9705 18.5711 18.0682C18.4734 18.1659 18.4184 18.2985 18.4184 18.4368V24.4785C18.4184 24.6167 18.4734 24.7493 18.5711 24.847C18.6688 24.9447 18.8014 24.9997 18.9396 24.9997C19.0779 24.9997 19.2105 24.9447 19.3082 24.847C19.4059 24.7493 19.4609 24.6167 19.4609 24.4785V18.4368ZM22.0651 17.916C21.7776 17.916 21.5443 18.1493 21.5443 18.4368V24.4785C21.5443 24.6166 21.5991 24.7491 21.6968 24.8468C21.7945 24.9445 21.927 24.9993 22.0651 24.9993C22.2032 24.9993 22.3357 24.9445 22.4334 24.8468C22.5311 24.7491 22.5859 24.6166 22.5859 24.4785V18.4368C22.5859 18.1493 22.3526 17.916 22.0651 17.916Z" fill="#FF4444" />
                                </g>
                                <path d="M15.0026 36.6663H25.0026C33.3359 36.6663 36.6693 33.333 36.6693 24.9997V14.9997C36.6693 6.66634 33.3359 3.33301 25.0026 3.33301H15.0026C6.66927 3.33301 3.33594 6.66634 3.33594 14.9997V24.9997C3.33594 33.333 6.66927 36.6663 15.0026 36.6663Z" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <clipPath id="clip0_exp_delete">
                                        <rect width="20" height="20" fill="white" transform="translate(10.5 10)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
                            Are you sure you want to Delete<br />this review?
                        </p>
                        <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
                            <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}>Cancel</button>
                            <button onClick={() => { setIsDeleted(true); setShowDeleteModal(false); }} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Block Modal */}
            {showBlockModal && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "5vh 2vw 4vh", width: "22vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>
                        <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5vh" }}>
                            <svg style={{ width: "2.2vw", height: "2.2vw" }} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5104 27.4657H18.4826C17.8646 27.4657 17.0729 27.1393 16.6424 26.7018L13.7951 23.8546C13.3576 23.4171 13.0312 22.6254 13.0312 22.0143V17.9865C13.0312 17.3685 13.3576 16.5768 13.7951 16.1463L16.6424 13.299C17.0799 12.8615 17.8715 12.5352 18.4826 12.5352H22.5104C23.1285 12.5352 23.9201 12.8615 24.3507 13.299L27.1979 16.1463C27.6354 16.5838 27.9618 17.3754 27.9618 17.9865V22.0143C27.9618 22.6324 27.6354 23.424 27.1979 23.8546L24.3507 26.7018C23.9132 27.1393 23.1285 27.4657 22.5104 27.4657ZM18.4826 13.5768C18.1424 13.5768 17.6146 13.7921 17.3785 14.0352L14.5313 16.8824C14.2951 17.1254 14.0729 17.6463 14.0729 17.9865V22.0143C14.0729 22.3546 14.2882 22.8824 14.5313 23.1185L17.3785 25.9657C17.6215 26.2018 18.1424 26.424 18.4826 26.424H22.5104C22.8507 26.424 23.3785 26.2088 23.6146 25.9657L26.4618 23.1185C26.6979 22.8754 26.9201 22.3546 26.9201 22.0143V17.9865C26.9201 17.6463 26.7049 17.1185 26.4618 16.8824L23.6146 14.0352C23.3715 13.799 22.8507 13.5768 22.5104 13.5768H18.4826Z" fill="#FF4444" />
                                <path d="M15.5972 25.4375C15.4653 25.4375 15.3333 25.3889 15.2292 25.2847C15.0278 25.0833 15.0278 24.75 15.2292 24.5486L25.0486 14.7292C25.25 14.5278 25.5833 14.5278 25.7847 14.7292C25.9861 14.9306 25.9861 15.2639 25.7847 15.4653L15.9653 25.2847C15.8611 25.3889 15.7292 25.4375 15.5972 25.4375Z" fill="#FF4444" />
                                <path d="M15.0026 36.6663H25.0026C33.3359 36.6663 36.6693 33.333 36.6693 24.9997V14.9997C36.6693 6.66634 33.3359 3.33301 25.0026 3.33301H15.0026C6.66927 3.33301 3.33594 6.66634 3.33594 14.9997V24.9997C3.33594 33.333 6.66927 36.6663 15.0026 36.6663Z" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
                            Are you sure you want to Block<br />this review?
                        </p>
                        <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
                            <button onClick={() => setShowBlockModal(false)} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}>Cancel</button>
                            <button onClick={() => { setIsBlocked(true); setShowBlockModal(false); }} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}>Block</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Page title ── */}
            <p style={{ fontSize: "1.25vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: 0 }}>
                Review Detail #{data.id}
            </p>

            {/* ── Body: left + right ── */}
            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>

                {/* ══ Left column ══ */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5vh", minWidth: 0 }}>

                    {/* Venue Information */}
                    {/* <div style={{
                        backgroundColor: data.summary.status === "Rejected"
                            ? "rgba(0, 0, 0, 0.1)"
                            : "#fff",
                        borderRadius: "20px",
                        border: "1px solid #F1F5F9",
                        padding: "1.5vw",
                    }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.4vh" }}>
                            <span style={{ fontSize: "0.85vw", fontWeight: 500, color: "#F26522", fontFamily: "Poppins" }}>
                                Venue information
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                                <svg width="56" height="27" viewBox="0 0 56 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="56" height="27" rx="13.5" fill="#0D8B47" fillOpacity="0.1" />
                                    <rect x="0.5" y="0.5" width="55" height="26" rx="13" stroke="#0D8B47" strokeOpacity="0.5" />
                                    <path d="M14.97 15.67H12.19L11.73 17H10.26L12.77 10.01H14.4L16.91 17H15.43L14.97 15.67ZM14.59 14.55L13.58 11.63L12.57 14.55H14.59ZM17.5082 13.5C17.5082 12.8133 17.6615 12.2 17.9682 11.66C18.2815 11.1133 18.7049 10.69 19.2382 10.39C19.7782 10.0833 20.3815 9.93 21.0482 9.93C21.8282 9.93 22.5115 10.13 23.0982 10.53C23.6849 10.93 24.0949 11.4833 24.3282 12.19H22.7182C22.5582 11.8567 22.3315 11.6067 22.0382 11.44C21.7515 11.2733 21.4182 11.19 21.0382 11.19C20.6315 11.19 20.2682 11.2867 19.9482 11.48C19.6349 11.6667 19.3882 11.9333 19.2082 12.28C19.0349 12.6267 18.9482 13.0333 18.9482 13.5C18.9482 13.96 19.0349 14.3667 19.2082 14.72C19.3882 15.0667 19.6349 15.3367 19.9482 15.53C20.2682 15.7167 20.6315 15.81 21.0382 15.81C21.4182 15.81 21.7515 15.7267 22.0382 15.56C22.3315 15.3867 22.5582 15.1333 22.7182 14.8H24.3282C24.0949 15.5133 23.6849 16.07 23.0982 16.47C22.5182 16.8633 21.8349 17.06 21.0482 17.06C20.3815 17.06 19.7782 16.91 19.2382 16.61C18.7049 16.3033 18.2815 15.88 17.9682 15.34C17.6615 14.8 17.5082 14.1867 17.5082 13.5ZM30.274 10.02V11.15H28.414V17H27.014V11.15H25.154V10.02H30.274ZM32.6955 10.02V17H31.2955V10.02H32.6955ZM40.3487 10.02L37.7887 17H36.0887L33.5287 10.02H35.0287L36.9487 15.57L38.8587 10.02H40.3487ZM42.588 11.15V12.9H44.938V14.01H42.588V15.86H45.238V17H41.188V10.01H45.238V11.15H42.588Z" fill="#0D8B47" />
                                </svg>
                                <button style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    fontSize: "0.85vw", fontWeight: 500, color: "var(--Primary, rgba(21, 34, 63, 1))",
                                    fontFamily: "Poppins", textDecoration: "underline",
                                }}>
                                    View Venue
                                </button>
                            </div>
                        </div>

                        <p style={{ fontSize: "1.1vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", marginBottom: "0.4vh", marginTop: 0 }}>
                            {data.venue.name}
                        </p>
                        <p style={{ fontSize: "0.9vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", fontWeight: 400, marginBottom: "1.2vh" }}>
                            {data.venue.address}
                        </p>

                        <div style={{ marginTop: "3vh" }}>
                            <p style={{ fontSize: "0.72vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", letterSpacing: "0.05em", marginBottom: "0.2vh" }}>
                                Venue Type
                            </p>
                            <p style={{ fontSize: "1vw", fontWeight: 400, color: "rgba(18,18,18,1)", fontFamily: "Poppins", marginBottom: "-1vh" }}>
                                {data.venue.type}
                            </p>
                        </div>
                    </div> */}


                    {/* Venue Information */}
                    <div
                        style={{
                            position: "relative",
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                            border: "1px solid #F1F5F9",
                            padding: "1.5vw",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                marginBottom: "0.4vh",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "0.85vw",
                                    fontWeight: 500,
                                    color: "#F26522",
                                    fontFamily: "Poppins",
                                }}
                            >
                                Venue information
                            </span>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.8vw",
                                }}
                            >
                                {statusProp !== "deleted" && !isBlocked && (
                                    <svg
                                        width="56"
                                        height="27"
                                        viewBox="0 0 56 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            width="56"
                                            height="27"
                                            rx="13.5"
                                            fill="#0D8B47"
                                            fillOpacity="0.1"
                                        />
                                        <rect
                                            x="0.5"
                                            y="0.5"
                                            width="55"
                                            height="26"
                                            rx="13"
                                            stroke="#0D8B47"
                                            strokeOpacity="0.5"
                                        />
                                        <path
                                            d="M14.97 15.67H12.19L11.73 17H10.26L12.77 10.01H14.4L16.91 17H15.43L14.97 15.67ZM14.59 14.55L13.58 11.63L12.57 14.55H14.59ZM17.5082 13.5C17.5082 12.8133 17.6615 12.2 17.9682 11.66C18.2815 11.1133 18.7049 10.69 19.2382 10.39C19.7782 10.0833 20.3815 9.93 21.0482 9.93C21.8282 9.93 22.5115 10.13 23.0982 10.53C23.6849 10.93 24.0949 11.4833 24.3282 12.19H22.7182C22.5582 11.8567 22.3315 11.6067 22.0382 11.44C21.7515 11.2733 21.4182 11.19 21.0382 11.19C20.6315 11.19 20.2682 11.2867 19.9482 11.48C19.6349 11.6667 19.3882 11.9333 19.2082 12.28C19.0349 12.6267 18.9482 13.0333 18.9482 13.5C18.9482 13.96 19.0349 14.3667 19.2082 14.72C19.3882 15.0667 19.6349 15.3367 19.9482 15.53C20.2682 15.7167 20.6315 15.81 21.0382 15.81C21.4182 15.81 21.7515 15.7267 22.0382 15.56C22.3315 15.3867 22.5582 15.1333 22.7182 14.8H24.3282C24.0949 15.5133 23.6849 16.07 23.0982 16.47C22.5182 16.8633 21.8349 17.06 21.0482 17.06C20.3815 17.06 19.7782 16.91 19.2382 16.61C18.7049 16.3033 18.2815 15.88 17.9682 15.34C17.6615 14.8 17.5082 14.1867 17.5082 13.5ZM30.274 10.02V11.15H28.414V17H27.014V11.15H25.154V10.02H30.274ZM32.6955 10.02V17H31.2955V10.02H32.6955ZM40.3487 10.02L37.7887 17H36.0887L33.5287 10.02H35.0287L36.9487 15.57L38.8587 10.02H40.3487ZM42.588 11.15V12.9H44.938V14.01H42.588V15.86H45.238V17H41.188V10.01H45.238V11.15H42.588Z"
                                            fill="#0D8B47"
                                        />
                                    </svg>
                                )}

                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "0.85vw",
                                        fontWeight: 500,
                                        color: statusProp === "deleted" || isBlocked
                                            ? "rgba(18,18,18,0.8)"
                                            : "rgba(18,18,18,1)",
                                        fontFamily: "Poppins",
                                        textDecoration: "underline",
                                    }}
                                >
                                    View Venue
                                </button>
                            </div>
                        </div>

                        <p
                            style={{
                                fontSize: "1.1vw",
                                fontWeight: 600,
                                color: showOverlay
                                    ? "rgba(18,18,18,0.8)"
                                    : "rgba(18,18,18,1)",
                                fontFamily: "Poppins",
                                marginBottom: "0.4vh",
                                marginTop: 0,
                            }}
                        >
                            {data.venue.name}
                        </p>

                        <p
                            style={{
                                fontSize: "0.9vw",
                                color: normalizedStatus === "Rejected"
                                    ? "rgba(18,18,18,0.8)"
                                    : "rgba(18,18,18,1)",
                                fontFamily: "Poppins",
                                fontWeight: 400,
                                marginBottom: "1.2vh",
                            }}
                        >
                            {data.venue.address}
                        </p>

                        <div style={{ marginTop: "3vh" }}>
                            <p
                                style={{
                                    fontSize: "0.72vw",
                                    color: normalizedStatus === "Rejected"
                                        ? "rgba(18,18,18,0.8)"
                                        : "rgba(18,18,18,1)",
                                    fontFamily: "Poppins",
                                    letterSpacing: "0.05em",
                                    marginBottom: "0.2vh",
                                }}
                            >
                                Venue Type
                            </p>

                            <p
                                style={{
                                    fontSize: "1vw",
                                    fontWeight: 400,
                                    color: normalizedStatus === "Rejected"
                                        ? "rgba(18,18,18,0.8)"
                                        : "rgba(18,18,18,1)",
                                    fontFamily: "Poppins",
                                    marginBottom: "-1vh",
                                }}
                            >
                                {data.venue.type}
                            </p>
                        </div>

                        {/* Rejected Overlay */}
                        {showOverlay && (
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    borderRadius: "20px",
                                    zIndex: 10,
                                    pointerEvents: "none",
                                }}
                            />
                        )}
                    </div>
                    {/* Review Submitted */}
                    <div style={{
                        backgroundColor: "#fff", borderRadius: "20px",
                        border: "1px solid #F1F5F9", padding: "1.5vw",
                        position: "relative", overflow: "hidden",
                    }}>
                        <span style={{ fontSize: "0.85vw", fontWeight: 500, color: "rgba(254, 110, 57, 1)", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Poppins" }}>
                            Review Submitted
                        </span>

                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: "1.2vh" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.7vw" }}>
                                <div style={{
                                    width: "2.4vw", height: "2.4vw", borderRadius: "50%",
                                    backgroundColor: data.review.user.avatarColor,
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                }}>
                                    <span style={{ fontSize: "0.75vw", fontWeight: 700, color: "#fff", fontFamily: "Poppins" }}>
                                        {data.review.user.initials}
                                    </span>
                                </div>
                                <div>
                                    <p style={{ fontSize: "1.1vw", fontWeight: 400, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                                        {data.review.user.name}
                                    </p>
                                    <p style={{ fontSize: "0.85vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", }}>
                                        {data.review.user.email} • {data.review.date}
                                    </p>
                                </div>
                            </div>
                            <StarRating rating={data.review.rating} size="1vw" />
                        </div>

                        <p style={{ fontSize: "1.1vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", margin: "1.7vh 0" }}>
                            {data.review.text}
                        </p>

                        <div style={{ height: "1px", backgroundColor: "rgba(230,230,230,1)", margin: "1.2vh 0" }} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1vw", marginTop: "2.5vh" }}>
                            {[
                                { label: "Price Paid", value: data.review.pricePaid },
                                { label: "Item Name", value: data.review.itemName },
                                { label: "Category", value: data.review.category },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p style={{ fontSize: "0.56em", color: "rgba(107,114,128,1)", fontFamily: "Poppins", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3vh" }}>
                                        {label}
                                    </p>
                                    <p style={{ fontSize: "0.9em", fontWeight: 400, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {showOverlay && (
                            <div style={{
                                position: "absolute", inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "20px", zIndex: 10,
                                pointerEvents: "none",
                            }} />
                        )}
                    </div>

                    {/* Safety Information */}
                    <div style={{
                        backgroundColor: "#fff", borderRadius: "20px",
                        border: "1px solid rgba(207, 196, 197, 1)", padding: "1.5vw",
                        position: "relative", overflow: "hidden",
                    }}>
                        <span style={{ fontSize: "0.88vw", fontWeight: 500, color: "#F26522", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Poppins", marginTop: 0, display: "block" }}>
                            Safety Information
                        </span>

                        <div style={{ marginTop: "1.2vh", display: "flex", alignItems: "center", gap: "0.8vw" }}>
                            <p style={{ fontSize: "0.72vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                                Rating
                            </p>
                            <StarRating rating={data.safety.rating} size="1vw" />
                        </div>
                        <div style={{ height: "1px", backgroundColor: "rgba(230,230,230,1)", margin: "1.2vh 0" }} />

                        <div style={{ marginTop: "1.4vh", marginBottom: "1.4vh" }}>
                            <span style={{
                                display: "inline-block", padding: "0.4vh 0.7vw", borderRadius: "30px",
                                fontSize: "0.7vw", fontWeight: 600, fontFamily: "Poppins",
                                color: "rgba(255, 68, 68, 1)", border: "1px solid rgba(255, 68, 68, 1)",
                                backgroundColor: "rgba(255, 68, 68, 0.1)", textTransform: "uppercase",
                            }}>
                                {data.safety.tag}
                            </span>
                        </div>

                        <p style={{ fontSize: "1.1vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", lineHeight: 1.6, letterSpacing: "0.1px", margin: "1vh 0 1.2vh" }}>
                            {data.safety.text}
                        </p>

                        <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.6vh" }}>
                            <p style={{ fontSize: "0.7vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                                Uploaded Photos
                            </p>
                            <div style={{ display: "inline-flex", gap: "0.6vw" }}>
                                {data.safety.photos.map((_, i) => <PhotoThumb key={i} />)}
                            </div>
                        </div>
                        {showOverlay && (
                            <div style={{
                                position: "absolute", inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "20px", zIndex: 10,
                                pointerEvents: "none",
                            }} />
                        )}
                    </div>

                    {/* Uploaded Photos */}
                    <div style={{
                        backgroundColor: "#fff", borderRadius: "20px",
                        border: "1px solid rgba(207, 196, 197, 1)", padding: "1.5vw",
                        position: "relative", overflow: "hidden",
                    }}>
                        <p style={{ fontSize: "0.88vw", color: "var(--Sub-text, rgba(107, 114, 128, 1))", fontFamily: "Poppins", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.8vh" }}>
                            Uploaded Photos
                        </p>
                        <div style={{ display: "flex", gap: "0.6vw", flexWrap: "wrap" }}>
                            {data.uploadedPhotos.map((_, i) => <PhotoThumb key={i} />)}
                        </div>
                        {showOverlay && (
                            <div style={{
                                position: "absolute", inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "20px", zIndex: 10,
                                pointerEvents: "none",
                            }} />
                        )}
                    </div>
                </div>

                {/* ══ Right sidebar ══ */}
                <div style={{ width: "24vw", flexShrink: 0, display: "flex", flexDirection: "column", gap: "1.5vh" }}>

                    {/* Quick Summary */}
                    <div style={{
                        backgroundColor: "#fff", borderRadius: "20px",
                        border: "1px solid #F1F5F9", padding: "1.5vw",
                        position: "relative", overflow: "hidden",
                    }}>
                        <p style={{ fontSize: "1vw", fontWeight: 500, letterSpacing: '0.3px', color: "rgba(18,18,18,1)", fontFamily: "Poppins", marginBottom: "0.5vh" }}>
                            Quick Summary
                        </p>

                        {[
                            { label: "Rating", node: <StarRating rating={data.summary.rating} size="1vw" /> },
                            { label: "Venue", text: data.summary.venue },
                            { label: "Photos Count", text: String(data.summary.photosCount) },
                            { label: "Price Update", text: data.summary.priceUpdate ? "Yes" : "No" },
                            { label: "Vibe Check-Ins", text: data.summary.vibeCheckIns ? "Yes" : "No" },
                            { label: "Safety Report", text: data.summary.safetyReport ? "Yes" : "No" },
                            { label: "Submission Date", text: data.summary.submissionDate },
                            {
                                label: "Status",
                                node: (
                                    <span style={{
                                        display: "inline-block", padding: "0.4vh 0.7vw", borderRadius: "30px",
                                        fontSize: "0.75vw", fontWeight: 600, fontFamily: "Poppins",
                                        backgroundColor: statusBadge.bg, color: statusBadge.color,
                                        border: statusBadge.border,
                                    }}>
                                        {normalizedStatus}
                                    </span>
                                ),
                            },
                        ].map(({ label, text, node }, i, arr) => (
                            <div key={label} style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: i < arr.length - 1 ? "1.6vh 0" : "1.6vh 0 0 0",
                                borderBottom: i < arr.length - 1 ? "1px solid rgba(230,230,230,1)" : "none",
                            }}>
                                <p style={{ fontSize: "0.82vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins" }}>{label}</p>
                                {node ?? (
                                    <p style={{ fontSize: "0.82vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", textAlign: "right", maxWidth: "55%" }}>
                                        {text}
                                    </p>
                                )}
                            </div>
                        ))}
                        {showOverlay && (
                            <div style={{
                                position: "absolute", inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "20px", zIndex: 10,
                                pointerEvents: "none",
                            }} />
                        )}
                    </div>

                    {/* Vibe Check-in */}
                    <div style={{
                        backgroundColor: "#fff", borderRadius: "20px",
                        border: "1px solid #F1F5F9", padding: "1.5vw",
                        position: "relative", overflow: "hidden",
                    }}>
                        <p style={{ fontSize: "1vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", marginBottom: "1.2vh" }}>
                            Vibe check-in
                        </p>

                        <div style={{ marginBottom: "1.4vh", marginTop: '1.5vh' }}>
                            <p style={{ fontSize: "0.72vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", textTransform: "capitalize", letterSpacing: "0.02em", marginBottom: "0.6vh" }}>
                                Crowd level
                            </p>
                            <div style={{ display: "flex", gap: "0.4vw", }}>
                                {crowdLevels.map((level) => (
                                    <span key={level} style={{
                                        padding: "0.5vh 0.7vw", borderRadius: "30px",
                                        fontSize: "0.75vw", fontWeight: 600, fontFamily: "Poppins",
                                        backgroundColor: data.vibeCheckIn.crowdLevel === level ? "rgba(254, 110, 57, 0.1)" : "rgba(107, 114, 128, 0.1)",
                                        color: data.vibeCheckIn.crowdLevel === level ? "rgba(254, 110, 57, 1)" : "rgba(107, 114, 128, 1)",
                                        border: data.vibeCheckIn.crowdLevel === level ? "1px solid rgba(254, 110, 57, 0.5)" : "",
                                    }}>
                                        {level}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: "3vh" }}>
                            <p style={{ fontSize: "0.72vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", textTransform: "capitalize", marginBottom: "0.1vh" }}>
                                Mood
                            </p>
                            <p style={{ fontSize: "0.88vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                                {data.vibeCheckIn.mood}
                            </p>
                        </div>

                        <div style={{ marginTop: "3vh" }}>
                            <p style={{ fontSize: "0.72vw", color: "rgba(107,114,128,1)", fontFamily: "Poppins", textTransform: "capitalize", marginBottom: "0.1vh" }}>
                                Music genre
                            </p>
                            <p style={{ fontSize: "0.88vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                                {data.vibeCheckIn.musicGenre}
                            </p>
                        </div>
                        {showOverlay && (
                            <div style={{
                                position: "absolute", inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "20px", zIndex: 10,
                                pointerEvents: "none",
                            }} />
                        )}
                    </div>

                    {/* Traveller Tip */}
                    <div style={{ borderRadius: "20px", overflow: "hidden", position: "relative" }}>
                        <img
                            src="/image_103__1_.svg"
                            alt=""
                            style={{ width: "100%", display: "block", borderRadius: "20px" }}
                        />

                        {showOverlay && (
                            <div style={{
                                position: "absolute", inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                borderRadius: "20px", zIndex: 10,
                                pointerEvents: "none",
                            }} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}