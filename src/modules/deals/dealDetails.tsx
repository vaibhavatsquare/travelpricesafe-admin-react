"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Deal = {
    id: number;
    name: string;
    venue: string;
    status: "active" | "blocked" | "deleted";
    image: string;
    description: string;
    discount: string;
    price: string;
    currency: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
};

const allDeals = [
    { id: 1, name: "Skyline Rooftop Bar", venue: "The Hudson Restaurant", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "blocked" as const, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit! the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 2, name: "Skyline Rooftop Bar", venue: "Skyline Tour", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "blocked" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 3, name: "Skyline Rooftop Bar", venue: "Bayside Bar", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "active" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 4, name: "Skyline Rooftop Bar", venue: "Downtown Cafe", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "blocked" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 5, name: "Skyline Rooftop Bar", venue: "Liberty Club", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "blocked" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 6, name: "Skyline Rooftop Bar", venue: "Pearl Spa", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "blocked" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 7, name: "Skyline Rooftop Bar", venue: "Skyline Tour", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "deleted" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 8, name: "Skyline Rooftop Bar", venue: "Skyline Tour", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "active" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 9, name: "Skyline Rooftop Bar", venue: "Skyline Tour", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "active" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
    { id: 10, name: "Skyline Rooftop Bar", venue: "Brick & Mortar Shop", discount: "10%", price: "$42 USD", currency: "USD", startDate: "2026-05-01", endDate: "2026-07-31", startTime: "16:00", endTime: "19:00", status: "active" as const, image: "", description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!" },
];

const mockDeal: Deal = {
    id: 1,
    name: "Happy Hour Special",
    venue: "The Hudson Restaurant",
    status: "blocked",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    description:
        "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit! the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!",
    discount: "10%",
    price: "$23 USD",
    currency: "USD",
    startDate: "2026-05-31",
    endDate: "2026-07-31",
    startTime: "16:00",
    endTime: "19:00",
};

// ── Info Card ─────────────────────────────────────────────────
function InfoCard({ icon, label, value, dull }: { icon: React.ReactNode; label: string; value: string; dull?: boolean }) {
    return (
        <div style={{
            backgroundColor: dull ? "rgba(0, 0, 0, 0.01)" : "#fff", borderRadius: "16px",
            border: "1px solid rgba(0, 0, 0, 0.1)", padding: "1.6vh 1.4vw",
            display: "flex", alignItems: "center", gap: "0.5vw",
        }}>
            <div style={{
                width: "2.6vw", height: "2.6vw", borderRadius: "50%",
                backgroundColor: dull ? "rgba(230, 230, 230, 0.5)" : "transparent", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                opacity: dull ? 0.7 : 1,
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: "0.9vw", fontWeight: 400, color: dull ? "rgba(120, 120, 120, 1)" : "rgba(107, 114, 128, 1)", margin: 0, fontFamily: "Poppins" }}>
                    {label}
                </p>
                <p style={{ fontSize: "1.35vw", fontWeight: 500, color: dull ? "rgba(100, 100, 100, 1)" : "rgba(18, 18, 18, 1)", margin: "0.3vh 0 0", fontFamily: "Poppins" }}>
                    {value}
                </p>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────
export default function DealDetails({ params }: { params: { id: string } }) {
    const router = useRouter();
    const dealId = parseInt(params.id, 10);
    const deal = allDeals.find((d) => d.id === dealId) || mockDeal;
    const [isBlocked, setIsBlocked] = useState(() => deal.status === "blocked");
    const [isDeleted, setIsDeleted] = useState(() => deal.status === "deleted");
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const statusColor =
        deal.status === "active"
            ? { text: "#0D8B47", bg: "rgba(13,139,71,0.1)", border: "1px solid rgba(13,139,71,0.5)" }
            : deal.status === "blocked"
                ? { text: "#EF4444", bg: "#FEE2E2", border: "1px solid #EF4444" }
                : { text: "rgba(107,114,128,1)", bg: "#F3F4F6", border: "1px solid rgba(107,114,128,1)" };

    const infoRows = [
        [
            {
                label: "DISCOUNT",
                value: deal.discount,
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_discount)" />
                        <path d="M9.67063 18.9386L13.4456 22.7136C14.9956 24.2636 17.5123 24.2636 19.0706 22.7136L22.729 19.0553C24.279 17.5053 24.279 14.9886 22.729 13.4303L18.9456 9.66364C18.154 8.87197 17.0623 8.44697 15.9456 8.50531L11.779 8.70531C10.1123 8.78031 8.7873 10.1053 8.70396 11.7636L8.50396 15.9303C8.45396 17.0553 8.87896 18.147 9.67063 18.9386Z" stroke="#15223F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.1146 16.1882C15.2652 16.1882 16.1979 15.2554 16.1979 14.1048C16.1979 12.9542 15.2652 12.0215 14.1146 12.0215C12.964 12.0215 12.0312 12.9542 12.0312 14.1048C12.0312 15.2554 12.964 16.1882 14.1146 16.1882Z" stroke="#15223F" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M17.0312 20.3548L20.3646 17.0215" stroke="#15223F" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_discount" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
            {
                label: "PRICE",
                value: deal.price,
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_price)" />
                        <path d="M15.9984 17.1912C17.4344 17.1912 18.5984 16.0272 18.5984 14.5912C18.5984 13.1553 17.4344 11.9912 15.9984 11.9912C14.5625 11.9912 13.3984 13.1553 13.3984 14.5912C13.3984 16.0272 14.5625 17.1912 15.9984 17.1912Z" stroke="#15223F" strokeWidth="1.5" />
                        <path d="M9.0148 13.0753C10.6565 5.85866 21.3481 5.86699 22.9815 13.0837C23.9398 17.317 21.3065 20.9003 18.9981 23.117C17.3231 24.7337 14.6731 24.7337 12.9898 23.117C10.6898 20.9003 8.05646 17.3087 9.0148 13.0753Z" stroke="#15223F" strokeWidth="1.5" />
                        <defs>
                            <linearGradient id="paint0_linear_price" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
            {
                label: "START",
                value: deal.startDate,
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_start)" />
                        <path d="M12.6641 7.66699V10.167" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.3359 7.66699V10.167" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.91406 13.5752H23.0807" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23.5 13.0837V20.167C23.5 22.667 22.25 24.3337 19.3333 24.3337H12.6667C9.75 24.3337 8.5 22.667 8.5 20.167V13.0837C8.5 10.5837 9.75 8.91699 12.6667 8.91699H19.3333C22.25 8.91699 23.5 10.5837 23.5 13.0837Z" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.998 17.4167H16.0055" stroke="#15223F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.9121 17.4167H12.9196" stroke="#15223F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.9121 19.9167H12.9196" stroke="#15223F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_start" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
            {
                label: "END",
                value: deal.endDate,
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_end)" />
                        <path d="M12.6641 7.66699V10.167" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.3359 7.66699V10.167" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.91406 13.5752H23.0807" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23.5 13.0837V20.167C23.5 22.667 22.25 24.3337 19.3333 24.3337H12.6667C9.75 24.3337 8.5 22.667 8.5 20.167V13.0837C8.5 10.5837 9.75 8.91699 12.6667 8.91699H19.3333C22.25 8.91699 23.5 10.5837 23.5 13.0837Z" stroke="#15223F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.998 17.4167H16.0055" stroke="#15223F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.9121 17.4167H12.9196" stroke="#15223F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.9121 19.9167H12.9196" stroke="#15223F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_end" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
        ],
        [
            {
                label: "START TIME",
                value: deal.startTime,
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_starttime)" />
                        <path d="M24.3307 16.0003C24.3307 20.6003 20.5974 24.3337 15.9974 24.3337C11.3974 24.3337 7.66406 20.6003 7.66406 16.0003C7.66406 11.4003 11.3974 7.66699 15.9974 7.66699C20.5974 7.66699 24.3307 11.4003 24.3307 16.0003Z" stroke="#15223F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.0953 18.6505L16.512 17.1088C16.062 16.8421 15.6953 16.2005 15.6953 15.6755V12.2588" stroke="#15223F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_starttime" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
            {
                label: "END TIME",
                value: deal.endTime,
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_endtime)" />
                        <path d="M24.3307 16.0003C24.3307 20.6003 20.5974 24.3337 15.9974 24.3337C11.3974 24.3337 7.66406 20.6003 7.66406 16.0003C7.66406 11.4003 11.3974 7.66699 15.9974 7.66699C20.5974 7.66699 24.3307 11.4003 24.3307 16.0003Z" stroke="#15223F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.0953 18.6505L16.512 17.1088C16.062 16.8421 15.6953 16.2005 15.6953 15.6755V12.2588" stroke="#15223F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_endtime" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
            {
                label: "CURRENCY",
                value: deal.currency,
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_currency)" />
                        <path d="M17.1648 20.5167H15.0732C13.7065 20.5167 12.5982 19.3667 12.5982 17.9501C12.5982 17.6084 12.8815 17.3251 13.2232 17.3251C13.5648 17.3251 13.8482 17.6084 13.8482 17.9501C13.8482 18.6751 14.3982 19.2667 15.0732 19.2667H17.1648C17.7065 19.2667 18.1565 18.7834 18.1565 18.2001C18.1565 17.4751 17.8982 17.3334 17.4732 17.1834L14.1148 16.0001C13.4648 15.7751 12.5898 15.2917 12.5898 13.8001C12.5898 12.5167 13.5982 11.4834 14.8315 11.4834H16.9232C18.2898 11.4834 19.3982 12.6334 19.3982 14.0501C19.3982 14.3917 19.1148 14.6751 18.7732 14.6751C18.4315 14.6751 18.1482 14.3917 18.1482 14.0501C18.1482 13.3251 17.5982 12.7334 16.9232 12.7334H14.8315C14.2898 12.7334 13.8398 13.2167 13.8398 13.8001C13.8398 14.5251 14.0982 14.6667 14.5232 14.8167L17.8815 16.0001C18.5315 16.2251 19.4065 16.7084 19.4065 18.2001C19.3982 19.4751 18.3982 20.5167 17.1648 20.5167Z" fill="#15223F" />
                        <path d="M16 21.625C15.6583 21.625 15.375 21.3417 15.375 21V11C15.375 10.6583 15.6583 10.375 16 10.375C16.3417 10.375 16.625 10.6583 16.625 11V21C16.625 21.3417 16.3417 21.625 16 21.625Z" fill="#15223F" />
                        <path d="M16.0013 24.9587C11.0596 24.9587 7.04297 20.942 7.04297 16.0003C7.04297 11.0587 11.0596 7.04199 16.0013 7.04199C20.943 7.04199 24.9596 11.0587 24.9596 16.0003C24.9596 20.942 20.943 24.9587 16.0013 24.9587ZM16.0013 8.29199C11.7513 8.29199 8.29297 11.7503 8.29297 16.0003C8.29297 20.2503 11.7513 23.7087 16.0013 23.7087C20.2513 23.7087 23.7096 20.2503 23.7096 16.0003C23.7096 11.7503 20.2513 8.29199 16.0013 8.29199Z" fill="#15223F" />
                        <defs>
                            <linearGradient id="paint0_linear_currency" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
            {
                label: "STATUS",
                value: deal.status.charAt(0).toUpperCase() + deal.status.slice(1),
                icon: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="10" fill="url(#paint0_linear_status)" />
                        <path d="M13.474 24.3337H18.474C22.6406 24.3337 24.3073 22.667 24.3073 18.5003V13.5003C24.3073 9.33366 22.6406 7.66699 18.474 7.66699H13.474C9.30729 7.66699 7.64062 9.33366 7.64062 13.5003V18.5003C7.64063 22.667 9.30729 24.3337 13.474 24.3337Z" stroke="#49B32B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.64062 16.5831L12.6406 16.5664C13.2656 16.5664 13.9656 17.0414 14.199 17.6248L15.149 20.0248C15.3656 20.5664 15.7073 20.5664 15.924 20.0248L17.8323 15.1831C18.0156 14.7164 18.3573 14.6998 18.5906 15.1414L19.4573 16.7831C19.7156 17.2748 20.3823 17.6748 20.9323 17.6748H24.3156" stroke="#49B32B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_status" x1="6.5" y1="5.5" x2="28" y2="27.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#EAF2FE" />
                                <stop offset="1" stopColor="#D8E5FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                ),
            },
        ],
    ];

    return (
        <div style={{ padding: "2vh 2.2vw", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>

            {/* Top Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5vh" }}>
                {/* Back */}
                <button
                    onClick={() => router.back()}
                    style={{
                        display: "flex", alignItems: "center", gap: "0.5vw",
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: "0.97vw", fontWeight: 500, color: deal.status === "blocked" || deal.status === "deleted" ? "rgba(100, 100, 100, 1)" : "#1C1B17", fontFamily: "Poppins",
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back to Venues
                </button>

                {/* Block + Delete */}
                <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
                    <button
                        onClick={() => isDeleted ? undefined : isBlocked ? setIsBlocked(false) : setShowBlockModal(true)}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.4vw",
                            padding: "1.2vh 1vw", borderRadius: "30px",
                            border: "1px solid rgba(107, 114, 128, 1)", backgroundColor: isBlocked ? "rgba(0, 0, 0, 0.1)" : "#fff",
                            fontSize: "14px", lineHeight: "20px", fontWeight: 600,
                            color: "#1C1B17", cursor: isDeleted ? "not-allowed" : "pointer", fontFamily: "Poppins",
                        }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4596 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill="#1C1B17" />
                            <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill="#1C1B17" />
                        </svg>
                        {isBlocked ? "Unblock" : "Block"}
                    </button>

                    <button
                        onClick={() => isDeleted ? undefined : setShowDeleteModal(true)}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.5vw",
                            padding: "1.2vh 1.4vw", borderRadius: "30px",
                            border: "none", backgroundColor: "#EF4444",
                            fontSize: "14px", lineHeight: "20px", fontWeight: 600,
                            color: "#fff", cursor: isDeleted ? "not-allowed" : "pointer", fontFamily: "Poppins",
                        }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                        {isDeleted ? "Deleted" : "Delete"}
                    </button>
                </div>

            </div>

            {/* Main Info Card */}
            <div style={{
                backgroundColor: isBlocked || isDeleted ? "rgba(0, 0, 0, 0.1)" : "#fff", borderRadius: "24px",
                border: "1px solid #F1F5F9", padding: "1.2vh 1.2vw",
                display: "flex", alignItems: "flex-start", gap: "1.4vw",
                marginBottom: "3vh",
            }}>
                {/* Image */}
                <div style={{
                    width: "20vw", height: "22vh", borderRadius: "16px", margin: "0.8vh 0",
                    overflow: "hidden", flexShrink: 0, backgroundColor: "#CBD5E1",
                }}>
                    {deal.image
                        ? <img src={deal.image} alt={deal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ width: "100%", height: "100%", backgroundColor: "#94A3B8" }} />
                    }
                </div>

                {/* Content */}
                <div style={{ flex: 1, color: isBlocked || isDeleted ? "rgba(107, 114, 128, 1)" : "rgba(18, 18, 18, 1)" }}>
                    {/* Name + Status + Edit */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1vh" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
                            <h2 style={{ fontSize: "1.32vw", fontWeight: 600, color: isBlocked || isDeleted ? "rgba(100, 100, 100, 1)" : "#1C1B17", margin: 0, fontFamily: "Poppins", lineHeight: "3.7vh" }}>
                                {deal.name}
                            </h2>
                            {deal.status !== "deleted" && (
                                <span style={{ padding: "0.5vh 0.6vw", borderRadius: "30px", fontSize: "0.75vw", fontWeight: 600, fontFamily: "Poppins", backgroundColor: statusColor.bg, color: statusColor.text, border: statusColor.border, textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block" }}>
                                    {deal.status}
                                </span>
                            )}
                        </div>

                        {/* Edit */}
                        <button onClick={() => router.push(`/deals/${deal.id}/edit`)} style={{
                            display: "flex", alignItems: "center", gap: "0.4vw",
                            background: "none", border: "none", cursor: "pointer",
                            fontSize: "14px", fontWeight: 500, color: "#1C1B17", fontFamily: "Poppins",
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13.26 3.6L5.05 12.29C4.74 12.62 4.44 13.27 4.38 13.72L4.01 16.96C3.88 18.13 4.72 18.93 5.88 18.73L9.1 18.18C9.55 18.1 10.18 17.77 10.49 17.43L18.7 8.74C20.12 7.24 20.76 5.53 18.55 3.44C16.35 1.37 14.68 2.1 13.26 3.6Z" />
                                <path d="M11.89 5.05C12.32 7.81 14.56 9.92 17.34 10.2" />
                                <path d="M3 22H21" />
                            </svg>
                            Edit
                        </button>
                    </div>

                    {/* Venue */}
                    <p style={{ fontSize: "0.97vw", fontWeight: 400, color: isBlocked || isDeleted ? "rgba(100, 100, 100, 1)" : "#1C1B17", margin: "0 0 1.2vh", fontFamily: "Poppins", lineHeight: "3.7vh" }}>
                        <span style={{ fontWeight: 600, fontSize: "1.1vw", lineHeight: "3.7vh" }}>Venue:</span>{" "}
                        {deal.venue}{"  "}
                        <a href="#" style={{ color: "rgba(254, 110, 57, 1)", textDecoration: "underline", fontWeight: 500, paddingLeft: "0.7vw" }}>
                            View Venue Details →
                        </a>
                    </p>

                    {/* Description */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8vw" }}>
                        <div style={{ flexShrink: 0, marginTop: "2px" }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 5.83366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V5.83366C2.5 3.33366 3.75 1.66699 6.66667 1.66699H13.3333C16.25 1.66699 17.5 3.33366 17.5 5.83366Z" stroke="#121212" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.082 3.75V5.41667C12.082 6.33333 12.832 7.08333 13.7487 7.08333H15.4154" stroke="#121212" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.66797 10.833H10.0013" stroke="#121212" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6.66797 14.167H13.3346" stroke="#121212" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p style={{ fontSize: "0.9vw", fontWeight: 400, color: isBlocked || isDeleted ? "rgba(120, 120, 120, 1)" : "rgba(18, 18, 18, 1)", margin: 0, fontFamily: "Poppins", lineHeight: "2.9vh" }}>
                            {deal.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div style={{ backgroundColor: isBlocked || isDeleted ? "rgba(0, 0, 0, 0.1)" : "#fff", borderRadius: "24px", border: "1px solid #F1F5F9", padding: "2vh 2vw" }}>
                {infoRows.map((row, rowIdx) => (
                    <div
                        key={rowIdx}
                        style={{
                            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "1.2vw", marginBottom: rowIdx === 0 ? "1.2vw" : 0,
                        }}
                    >
                        {row.map((item) => (
                            <InfoCard key={item.label} icon={item.icon} label={item.label} value={item.value} dull={isBlocked || isDeleted} />
                        ))}
                    </div>
                ))}
            </div>

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
                            Are you sure you want to Block<br />this deal?
                        </p>
                        <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
                            <button onClick={() => setShowBlockModal(false)} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}>Cancel</button>
                            <button onClick={() => { setIsBlocked(true); setShowBlockModal(false); }} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}>Block</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "5vh 2vw 4vh", width: "22vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>
                        <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5vh" }}>
                            <svg style={{ width: "2.2vw", height: "2.2vw" }} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_deal_delete)">
                                    <path d="M18.8359 14.3743V14.5827H22.1693V14.3743C22.1693 13.9323 21.9937 13.5084 21.6811 13.1958C21.3686 12.8833 20.9446 12.7077 20.5026 12.7077C20.0606 12.7077 19.6367 12.8833 19.3241 13.1958C19.0115 13.5084 18.8359 13.9323 18.8359 14.3743ZM17.7943 14.5827V14.3743C17.7943 13.6561 18.0796 12.9672 18.5875 12.4593C19.0954 11.9514 19.7843 11.666 20.5026 11.666C21.2209 11.666 21.9098 11.9514 22.4177 12.4593C22.9256 12.9672 23.2109 13.6561 23.2109 14.3743V14.5827H27.8984C28.0366 14.5827 28.169 14.6376 28.2667 14.7352C28.3644 14.8329 28.4193 14.9654 28.4193 15.1035C28.4193 15.2416 28.3644 15.3741 28.2667 15.4718C28.169 15.5695 28.0366 15.6243 27.8984 15.6243H26.683L25.8497 25.5643C25.7864 26.3192 25.4418 27.0227 24.8842 27.5354C24.3266 28.0482 23.5968 28.3327 22.8393 28.3327H18.1659C17.4085 28.3326 16.6788 28.048 16.1213 27.5353C15.5638 27.0226 15.2192 26.3191 15.1559 25.5643L14.3226 15.6243H13.1068C12.9686 15.6243 12.8362 15.5695 12.7385 15.4718C12.6408 15.3741 12.5859 15.2416 12.5859 15.1035C12.5859 14.9654 12.6408 14.8329 12.7385 14.7352C12.8362 14.6376 12.9686 14.5827 13.1068 14.5827H17.7943ZM16.1939 25.4773C16.2353 25.9718 16.4611 26.4327 16.8263 26.7686C17.1916 27.1045 17.6697 27.291 18.1659 27.291H22.8393C23.3356 27.2911 23.8138 27.1047 24.1792 26.7687C24.5445 26.4328 24.7703 25.9718 24.8118 25.4773L25.6376 15.6243H15.3676L16.1939 25.4773ZM19.4609 18.4368C19.4609 18.2985 19.4059 18.1659 19.3082 18.0682C19.2105 17.9705 19.0779 17.9155 18.9396 17.9155C18.8014 17.9155 18.6688 17.9705 18.5711 18.0682C18.4734 18.1659 18.4184 18.2985 18.4184 18.4368V24.4785C18.4184 24.6167 18.4734 24.7493 18.5711 24.847C18.6688 24.9447 18.8014 24.9997 18.9396 24.9997C19.0779 24.9997 19.2105 24.9447 19.3082 24.847C19.4059 24.7493 19.4609 24.6167 19.4609 24.4785V18.4368ZM22.0651 17.916C21.7776 17.916 21.5443 18.1493 21.5443 18.4368V24.4785C21.5443 24.6166 21.5991 24.7491 21.6968 24.8468C21.7945 24.9445 21.927 24.9993 22.0651 24.9993C22.2032 24.9993 22.3357 24.9445 22.4334 24.8468C22.5311 24.7491 22.5859 24.6166 22.5859 24.4785V18.4368C22.5859 18.1493 22.3526 17.916 22.0651 17.916Z" fill="#FF4444" />
                                </g>
                                <path d="M15.0026 36.6663H25.0026C33.3359 36.6663 36.6693 33.333 36.6693 24.9997V14.9997C36.6693 6.66634 33.3359 3.33301 25.0026 3.33301H15.0026C6.66927 3.33301 3.33594 6.66634 3.33594 14.9997V24.9997C3.33594 33.333 6.66927 36.6663 15.0026 36.6663Z" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <clipPath id="clip0_deal_delete">
                                        <rect width="20" height="20" fill="white" transform="translate(10.5 10)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
                            Are you sure you want to Delete<br />this deal?
                        </p>
                        <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
                            <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}>Cancel</button>
                            <button onClick={() => { setIsDeleted(true); setShowDeleteModal(false); }} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}