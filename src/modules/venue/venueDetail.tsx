"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Deal = {
  id: number;
  name: string;
  discount: string;
  price: string;
  time: string;
  status: "active" | "inactive";
};

type Review = {
  id: number;
  name: string;
  initials: string;
  color: string;
  date: string;
  rating: number;
  text: string;
};

type BusinessHours = {
  day: string;
  hours: string;
};

type VenueData = {
  id: string;
  name: string;
  status: "active" | "blocked" | "deleted";
  address: string;
  website: string;
  description: string;
  avg_price: number;
  images: string[];
  deals: Deal[];
  reviews: Review[];
  rating: number;
  business_hours: BusinessHours[];
  lat: number;
  lng: number;
};

const mockVenues: VenueData[] = [
  {
    id: "v1",
    name: "The Hudson Restaurant",
    status: "active",
  address: "1250 Market Street, Apt 8B",
  website: "www.thehudson.com",
  description:
    "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit! the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!",
  avg_price: 25,
  images: ["", "", ""],
  deals: [
    { id: 1, name: "Happy Hour Special", discount: "10% off", price: "$23", time: "16:00–19:00", status: "active" },
    { id: 2, name: "Happy Hour Special", discount: "10% off", price: "$23", time: "16:00–19:00", status: "active" },
    { id: 3, name: "Weekend Brunch Deal", discount: "15% off", price: "$18", time: "10:00–13:00", status: "active" },
    { id: 4, name: "Early Bird Special", discount: "20% off", price: "$15", time: "09:00–11:00", status: "active" },
    { id: 5, name: "Lunch Combo Offer", discount: "12% off", price: "$20", time: "12:00–15:00", status: "active" },
    { id: 6, name: "Date Night Special", discount: "10% off", price: "$45", time: "19:00–22:00", status: "active" },
    { id: 7, name: "Family Feast Deal", discount: "18% off", price: "$60", time: "17:00–20:00", status: "active" },
  ],
  reviews: [
    { id: 1, name: "James Smith", initials: "JS", color: "#6366F1", date: "March 2024", rating: 4, text: "The atmosphere here is unmatched. We had the Golden Hour tasting and every course was a masterpiece. The staff was incredibly attentive without being overbearing. A must visit!" },
    { id: 2, name: "James Smith", initials: "JS", color: "#6366F1", date: "March 2024", rating: 4, text: "The atmosphere here is unmatched. We had the Golden Hour tasting and every course was a masterpiece. The staff was incredibly attentive without being overbearing. A must visit!" },
    { id: 3, name: "Sarah Johnson", initials: "SJ", color: "#0EA5E9", date: "April 2024", rating: 5, text: "Absolutely fantastic experience from start to finish. The food was exceptional and the service was top notch. Will definitely be coming back again soon!" },
    { id: 4, name: "Michael Brown", initials: "MB", color: "#10B981", date: "April 2024", rating: 4, text: "Great ambiance and wonderful food. The tasting menu was a highlight. Staff were attentive and knowledgeable about every dish they served." },
    { id: 5, name: "Emily Davis", initials: "ED", color: "#F59E0B", date: "May 2024", rating: 5, text: "One of the best dining experiences I have had in the city. Every dish was thoughtfully prepared and presented beautifully. Highly recommend!" },
    { id: 6, name: "Robert Wilson", initials: "RW", color: "#EF4444", date: "May 2024", rating: 3, text: "Good food overall but service was a bit slow during peak hours. The desserts were outstanding though and made up for the wait." },
  ],
  rating: 3.8,
  business_hours: [
    { day: "Mon", hours: "Closed" },
    { day: "Tue", hours: "09:00 – 21:00" },
    { day: "Wed", hours: "09:00 – 21:00" },
    { day: "Thu", hours: "09:00 – 21:00" },
    { day: "Fri", hours: "09:00 – 23:00" },
    { day: "Sat", hours: "09:00 – 23:00" },
    { day: "Sun", hours: "10:00 – 23:00" },
  ],
  lat: 40.7128,
  lng: -74.006,
  },
  {
    id: "v2",
    name: "The Hudson Restaurant",
    status: "blocked",
    address: "1250 Market Street, Apt 8B",
    website: "www.thehudson.com",
    description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!",
    avg_price: 25,
    images: ["", "", ""],
    deals: [
      { id: 1, name: "Happy Hour Special", discount: "10% off", price: "$23", time: "16:00–19:00", status: "active" },
      { id: 2, name: "Happy Hour Special", discount: "10% off", price: "$23", time: "16:00–19:00", status: "active" },
    ],
    reviews: [],
    rating: 3.8,
    business_hours: [
      { day: "Mon", hours: "Closed" },
      { day: "Tue", hours: "09:00 – 21:00" },
      { day: "Wed", hours: "09:00 – 21:00" },
      { day: "Thu", hours: "09:00 – 21:00" },
      { day: "Fri", hours: "09:00 – 23:00" },
      { day: "Sat", hours: "09:00 – 23:00" },
      { day: "Sun", hours: "10:00 – 23:00" },
    ],
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "v3",
    name: "The Hudson Restaurant",
    status: "deleted",
    address: "1250 Market Street, Apt 8B",
    website: "www.thehudson.com",
    description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece. the staff was incredibly attentive without being overbearing. a must visit!",
    avg_price: 25,
    images: ["", "", ""],
    deals: [
      { id: 1, name: "Happy Hour Special", discount: "10% off", price: "$23", time: "16:00–19:00", status: "active" },
    ],
    reviews: [],
    rating: 3.8,
    business_hours: [
      { day: "Mon", hours: "Closed" },
      { day: "Tue", hours: "09:00 – 21:00" },
      { day: "Wed", hours: "09:00 – 21:00" },
      { day: "Thu", hours: "09:00 – 21:00" },
      { day: "Fri", hours: "09:00 – 23:00" },
      { day: "Sat", hours: "09:00 – 23:00" },
      { day: "Sun", hours: "10:00 – 23:00" },
    ],
    lat: 40.7128,
    lng: -74.006,
  },
];

function StarRating({ rating, size = "1vw" }: { rating: number; size?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.2vw" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} style={{ width: size, height: size }} viewBox="0 0 20 20" fill={s <= Math.round(rating) ? "#F59E0B" : "#E2E8F0"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function VenueDetail({ id }: { id: string }) {
  const router = useRouter();
  const found = mockVenues.find((v) => v.id === id);
  const venue = found ?? mockVenues[0];
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAllDeals, setShowAllDeals] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isBlocked, setIsBlocked] = useState(() => venue.status === "blocked");
  const [isDeleted, setIsDeleted] = useState(() => venue.status === "deleted");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const statusColor =
    venue.status === "active" ? { bg: "rgba(13, 139, 71, 0.1)", text: "#0D8B47", border: "1px solid rgba(13, 139, 71, 0.5)" } :
      venue.status === "blocked" ? { bg: "#FEE2E2", text: "#EF4444", border: "1px solid #EF4444" } :
        { bg: "#F3F4F6", text: "rgba(107,114,128,1)", border: "1px solid rgba(107,114,128,0.5)" };

  return (
    <div style={{ padding: "2vh 2.2vw", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "2vh", overflowY: "auto" }}>

      {/* Top Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Back */}
        <button
          onClick={() => router.push("/venue")}
          style={{ display: "flex", alignItems: "center", gap: "0.5vw", background: "none", border: "none", cursor: "pointer", fontSize: "0.9vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}
        >
          <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Venues
        </button>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8vw" }}>
          <button
            onClick={() => isDeleted ? undefined : isBlocked ? setIsBlocked(false) : setShowBlockModal(true)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5vw",
              padding: "1.2vh 1.1vw", border: "none",
              borderRadius: "30px", background: isBlocked ? "rgba(0,0,0,0.1)" : "#Fff",
              fontSize: "0.95vw", fontWeight: 600, color: "#1C1B17",
              cursor: isDeleted ? "not-allowed" : "pointer", fontFamily: "Poppins",
            }}>
            <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4596 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill="currentColor"/>
              <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill="currentColor"/>
            </svg>
            {isBlocked ? "Unblock" : "Block"}
          </button>

          <button
            onClick={() => isDeleted ? undefined : setShowDeleteModal(true)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5vw",
              padding: "1.2vh 1.4vw", border: "none",
              borderRadius: "30px", background: "#EF4444",
              fontSize: "0.95vw", fontWeight: 600, color: "#fff",
              cursor: isDeleted ? "not-allowed" : "pointer", fontFamily: "Poppins",
            }}>
            <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            {isDeleted ? "Deleted" : "Delete"}
          </button>
        </div>
      </div>

      {/* Venue Card — Full Width */}
      <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>

        {/* Venue Card */}
        <div style={{ backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "1.5vw", display: "flex", gap: "1.5vw" }}>
          {/* Image Gallery */}
          <div style={{ display: "flex", gap: "0.6vw", flexShrink: 0, width: "58%" }}>
            {/* Main image */}
            <div style={{ flex: 1, borderRadius: "12px", backgroundColor: "#CBD5E1", overflow: "hidden", minHeight: "26vh" }}>
              {venue.images[0]
                ? <img src={venue.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", backgroundColor: "#94A3B8" }} />
              }
            </div>
            {/* Side images */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6vw", width: "36%" }}>
              {[1, 2].map((i) => (
                <div key={i} style={{ flex: 1, borderRadius: "12px", backgroundColor: "#CBD5E1", overflow: "hidden" }}>
                  {venue.images[i]
                    ? <img src={venue.images[i]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", backgroundColor: "#94A3B8" }} />
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Venue Info */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1vh" }}>
            {/* Name + Edit */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: "1.05vw", fontWeight: 600, color: (isBlocked || isDeleted) ? "rgba(107, 114, 128, 1)" : "var(--Text, rgba(18, 18, 18, 1))", fontFamily: "Poppins" }}>{venue.name}</p>
              <button style={{ display: "flex", alignItems: "center", gap: "0.3vw", background: "none", border: "none", cursor: "pointer", fontSize: "0.85vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                <svg style={{ width: "1vw", height: "1vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.2594 3.60022L5.04936 12.2902C4.73936 12.6202 4.43936 13.2702 4.37936 13.7202L4.00936 16.9602C3.87936 18.1302 4.71936 18.9302 5.87936 18.7302L9.09936 18.1802C9.54936 18.1002 10.1794 17.7702 10.4894 17.4302L18.6994 8.74022C20.1194 7.24022 20.7594 5.53022 18.5494 3.44022C16.3494 1.37022 14.6794 2.10022 13.2594 3.60022Z" />
                  <path d="M11.8906 5.0498C12.3206 7.8098 14.5606 9.9198 17.3406 10.1998" />
                  <path d="M3 22H21" />
                </svg>
                Edit
              </button>
            </div>

            {/* Status Badge */}
            <div>
              <span style={{ padding: "0.5vh 0.6vw", borderRadius: "30px", fontSize: "0.75vw", fontWeight: 600, fontFamily: "Poppins", backgroundColor: statusColor.bg, color: statusColor.text, border: statusColor.border, textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block" }}>
                {venue.status}
              </span>
            </div>

            {/* Address */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5vw", padding: "0.5vh 0" }}>
              <svg style={{ width: "1vw", height: "1vw", flexShrink: 0, marginTop: "0.1vh" }} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p style={{ fontSize: "0.85vw", color: (isBlocked || isDeleted) ? "rgba(107, 114, 128, 1)" : "rgba(18,18,18,1)", fontFamily: "Poppins", fontWeight: 500 }}>{venue.address}</p>
            </div>

            {/* Website */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", padding: "0.5vh 0" }}>
              <svg style={{ width: "1vw", height: "1vw", flexShrink: 0 }} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <p style={{ fontSize: "0.85vw", color: (isBlocked || isDeleted) ? "rgba(107, 114, 128, 1)" : "rgba(18,18,18,1)", fontFamily: "Poppins", fontWeight: 500 }}>{venue.website}</p>
            </div>

            {/* Description */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5vw", padding: "0.5vh 0" }}>
              <svg style={{ width: "1vw", height: "1vw", flexShrink: 0, marginTop: "0.2vh" }} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <p style={{ fontSize: "0.8vw", color: (isBlocked || isDeleted) ? "rgba(107, 114, 128, 1)" : "var(--Text, rgba(18, 18, 18, 1))", fontFamily: "Poppins", fontWeight: 500, lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{venue.description}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Body — two columns */}
      <div style={{ display: "flex", gap: "1.5vw", alignItems: "stretch" }}>

        {/* ── Left Column ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5vh", height: "100%" }}>

          {/* Active Deals */}
          <div style={{ backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "1.5vw" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5vh" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                <svg style={{ width: "1.2vw", height: "1.2vw" }} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.03769 14.2325L8.19019 18.385C9.89519 20.09 12.6635 20.09 14.3777 18.385L18.4019 14.3608C20.1069 12.6558 20.1069 9.8875 18.4019 8.17334L14.2402 4.03C13.3694 3.15917 12.1685 2.69167 10.9402 2.75584L6.35686 2.97584C4.52353 3.05834 3.06603 4.51584 2.97436 6.34L2.75436 10.9233C2.69936 12.1608 3.16686 13.3617 4.03769 14.2325Z" stroke="#1C1B17" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.92448 11.2074C10.1901 11.2074 11.2161 10.1813 11.2161 8.91569C11.2161 7.65004 10.1901 6.62402 8.92448 6.62402C7.65883 6.62402 6.63281 7.65004 6.63281 8.91569C6.63281 10.1813 7.65883 11.2074 8.92448 11.2074Z" stroke="#1C1B17" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M12.1328 15.7907L15.7995 12.124" stroke="#1C1B17" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p style={{ fontSize: "105%", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", letterSpacing: "0.003em" }}>Active Deals</p>
              </div>
              <button style={{
                display: "flex", alignItems: "center", gap: "0.4vw",
                padding: "1.1vh 1vw", borderRadius: "30px",
                border: "none", backgroundColor: "#F26522",
                fontSize: "0.8vw", fontWeight: 600, color: "#fff",
                cursor: "pointer", fontFamily: "Poppins",
              }}>
                <svg style={{ width: "0.9vw", height: "0.9vw" }} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Deal
              </button>
            </div>

            {/* Deal Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
              {venue.deals.slice(0, 2).map((deal) => (
                <div key={deal.id} style={{ border: (isBlocked || isDeleted) ? "1px solid rgba(180, 180, 180, 0.5)" : "1px solid var(--Border, rgba(230, 230, 230, 1))", borderRadius: "12px", padding: "1.2vh 1.2vw" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4vh 0" }}>
                    <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>{deal.name}</p>
                    <span style={{ padding: "0.5vh 0.6vw", borderRadius: "30px", fontSize: "0.7vw", fontWeight: 600, backgroundColor: "rgba(13, 139, 71, 0.1)", color: "#0D8B47", border: "1px solid rgba(13, 139, 71, 0.5)", textTransform: "uppercase", fontFamily: "Poppins", display: "inline-block" }}>
                      {deal.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4vh 0" }}>
                    <p style={{ fontSize: "0.8vw", color: "rgba(107, 114, 128, 1)", fontFamily: "Poppins", fontWeight: 500 }}>{deal.discount} • {deal.price}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3vw" }}>
                      <svg style={{ width: "0.9vw", height: "0.9vw" }} viewBox="0 0 24 24" fill="none" stroke="var(--Text, rgba(18, 18, 18, 1))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      <p style={{ fontSize: "0.8vw", color: "var(--Text, rgba(18, 18, 18, 1))", fontFamily: "Poppins", fontWeight: 500 }}>{deal.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All */}
            <div style={{ textAlign: "center", marginTop: "1.5vh" }}>
              <button onClick={() => setShowAllDeals(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.85vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", textDecoration: "underline" }}>
                View All
              </button>
            </div>
          </div>

          {/* All Deals Modal */}
          {showAllDeals && (
            <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)" }}
              onClick={() => setShowAllDeals(false)}>
              <div style={{ background: "#fff", borderRadius: "20px", padding: "2vh 1.5vw", width: "40vw", maxHeight: "55vh", overflowY: "auto", boxSizing: "border-box", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
                onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2vh" }}>
                  <p style={{ fontSize: "105%", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", letterSpacing: "0.003em" }}>Active Deals</p>
                  <button onClick={() => setShowAllDeals(false)} style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", border: "1px solid var(--Border, rgba(230,230,230,1))", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1vw", color: "rgba(18,18,18,1)", fontWeight: 400 }}>✕</button>
                </div>
                {/* Deal Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
                  {venue.deals.map((deal) => (
                    <div key={deal.id} style={{ border: (isBlocked || isDeleted) ? "1px solid rgba(180, 180, 180, 0.5)" : "1px solid var(--Border, rgba(230, 230, 230, 1))", borderRadius: "12px", padding: "1.2vh 1.2vw" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4vh 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                          <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>{deal.name}</p>
                          <span style={{ padding: "0.5vh 0.6vw", borderRadius: "30px", fontSize: "0.7vw", fontWeight: 600, backgroundColor: "rgba(13, 139, 71, 0.1)", color: "#0D8B47", border: "1px solid rgba(13, 139, 71, 0.5)", textTransform: "uppercase", fontFamily: "Poppins", display: "inline-block" }}>
                            {deal.status}
                          </span>
                        </div>
                        <button style={{ display: "flex", alignItems: "center", gap: "0.3vw", background: "none", border: "none", cursor: "pointer", fontSize: "0.8vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                          <svg style={{ width: "0.9vw", height: "0.9vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13.2594 3.60022L5.04936 12.2902C4.73936 12.6202 4.43936 13.2702 4.37936 13.7202L4.00936 16.9602C3.87936 18.1302 4.71936 18.9302 5.87936 18.7302L9.09936 18.1802C9.54936 18.1002 10.1794 17.7702 10.4894 17.4302L18.6994 8.74022C20.1194 7.24022 20.7594 5.53022 18.5494 3.44022C16.3494 1.37022 14.6794 2.10022 13.2594 3.60022Z" />
                            <path d="M11.8906 5.0498C12.3206 7.8098 14.5606 9.9198 17.3406 10.1998" />
                            <path d="M3 22H21" />
                          </svg>
                          Edit
                        </button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4vh 0" }}>
                        <p style={{ fontSize: "0.8vw", color: "var(--Text, rgba(18, 18, 18, 1))", fontFamily: "Poppins", fontWeight: 500 }}>{deal.discount} • {deal.price}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.3vw" }}>
                          <svg style={{ width: "0.9vw", height: "0.9vw" }} viewBox="0 0 24 24" fill="none" stroke="var(--Text, rgba(18, 18, 18, 1))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                          </svg>
                          <p style={{ fontSize: "0.8vw", color: "var(--Text, rgba(18, 18, 18, 1))", fontFamily: "Poppins", fontWeight: 500 }}>{deal.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experiences */}
          <div style={{ backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "1.5vw", flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8vw", marginBottom: "1.5vh" }}>
              <svg style={{ width: "1.2vw", height: "1.2vw" }} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1043 4.776L15.3968 7.36099C15.5709 7.71849 16.0384 8.05765 16.4326 8.13099L18.7701 8.51598C20.2643 8.76348 20.6126 9.84516 19.5401 10.9268L17.7159 12.751C17.4134 13.0535 17.2393 13.6493 17.3401 14.0802L17.8626 16.3352C18.2751 18.1135 17.3218 18.8102 15.7543 17.8752L13.5634 16.5735C13.1693 16.3352 12.5093 16.3352 12.1151 16.5735L9.92427 17.8752C8.35677 18.801 7.40345 18.1135 7.81595 16.3352L8.33845 14.0802C8.43929 13.6585 8.26512 13.0627 7.96262 12.751L6.13846 10.9268C5.06596 9.85432 5.41429 8.77265 6.90846 8.51598L9.24594 8.13099C9.64011 8.06682 10.1076 7.71849 10.2818 7.36099L11.5743 4.776C12.2618 3.3735 13.3985 3.3735 14.1043 4.776Z" stroke="#1C1B17" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontSize: "105%", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", letterSpacing: "0.003em" }}>Experiences</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3vw" }}>
                <svg style={{ width: "1vw", height: "1vw" }} viewBox="0 0 20 20" fill="#F59E0B"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>{venue.rating} avg.</p>
              </div>
            </div>

            {/* Review Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1vh", flex: 1, justifyContent: "space-evenly" }}>
              {venue.reviews.slice(0, 2).map((review) => (
                <div key={review.id} style={{ border: "1px solid var(--Border, rgba(230, 230, 230, 1))", borderRadius: "12px", padding: "1.8vh 1.2vw" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4vh 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                      <div style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", backgroundColor: review.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "0.7vw", fontWeight: 600, color: "#fff", fontFamily: "Poppins" }}>{review.initials}</span>
                      </div>
                      <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>{review.name}</p>
                    </div>
                    <p style={{ fontSize: "0.8vw", color: "#94A3B8", fontFamily: "Poppins" }}>{review.date}</p>
                  </div>
                  <div style={{ padding: "0.8vh 0 0.4vh 0" }}><StarRating rating={review.rating} size="0.9vw" /></div>
                  <p style={{ fontSize: "0.85vw", color: "#475569", fontFamily: "Poppins", fontWeight: 400, lineHeight: "1.6", padding: "0.4vh 0" }}>{review.text}</p>
                </div>
              ))}
            </div>

            {/* View All */}
            <div style={{ textAlign: "center", marginTop: "1.5vh" }}>
              <button onClick={() => setShowAllReviews(true)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.85vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins", textDecoration: "underline" }}>
                View All
              </button>
            </div>
          </div>

          {/* All Reviews Modal */}
          {/* Block Modal */}
          {showBlockModal && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
              <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "5vh 2vw 4vh", width: "22vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>
                <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5vh" }}>
                  <svg style={{ width: "2.2vw", height: "2.2vw" }} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5104 27.4657H18.4826C17.8646 27.4657 17.0729 27.1393 16.6424 26.7018L13.7951 23.8546C13.3576 23.4171 13.0312 22.6254 13.0312 22.0143V17.9865C13.0312 17.3685 13.3576 16.5768 13.7951 16.1463L16.6424 13.299C17.0799 12.8615 17.8715 12.5352 18.4826 12.5352H22.5104C23.1285 12.5352 23.9201 12.8615 24.3507 13.299L27.1979 16.1463C27.6354 16.5838 27.9618 17.3754 27.9618 17.9865V22.0143C27.9618 22.6324 27.6354 23.424 27.1979 23.8546L24.3507 26.7018C23.9132 27.1393 23.1285 27.4657 22.5104 27.4657ZM18.4826 13.5768C18.1424 13.5768 17.6146 13.7921 17.3785 14.0352L14.5313 16.8824C14.2951 17.1254 14.0729 17.6463 14.0729 17.9865V22.0143C14.0729 22.3546 14.2882 22.8824 14.5313 23.1185L17.3785 25.9657C17.6215 26.2018 18.1424 26.424 18.4826 26.424H22.5104C22.8507 26.424 23.3785 26.2088 23.6146 25.9657L26.4618 23.1185C26.6979 22.8754 26.9201 22.3546 26.9201 22.0143V17.9865C26.9201 17.6463 26.7049 17.1185 26.4618 16.8824L23.6146 14.0352C23.3715 13.799 22.8507 13.5768 22.5104 13.5768H18.4826Z" fill="#FF4444"/>
                    <path d="M15.5972 25.4375C15.4653 25.4375 15.3333 25.3889 15.2292 25.2847C15.0278 25.0833 15.0278 24.75 15.2292 24.5486L25.0486 14.7292C25.25 14.5278 25.5833 14.5278 25.7847 14.7292C25.9861 14.9306 25.9861 15.2639 25.7847 15.4653L15.9653 25.2847C15.8611 25.3889 15.7292 25.4375 15.5972 25.4375Z" fill="#FF4444"/>
                    <path d="M15.0026 36.6663H25.0026C33.3359 36.6663 36.6693 33.333 36.6693 24.9997V14.9997C36.6693 6.66634 33.3359 3.33301 25.0026 3.33301H15.0026C6.66927 3.33301 3.33594 6.66634 3.33594 14.9997V24.9997C3.33594 33.333 6.66927 36.6663 15.0026 36.6663Z" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
                  Are you sure you want to Block<br />this venue?
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
                    <g clipPath="url(#clip0_venue_delete)">
                      <path d="M18.8359 14.3743V14.5827H22.1693V14.3743C22.1693 13.9323 21.9937 13.5084 21.6811 13.1958C21.3686 12.8833 20.9446 12.7077 20.5026 12.7077C20.0606 12.7077 19.6367 12.8833 19.3241 13.1958C19.0115 13.5084 18.8359 13.9323 18.8359 14.3743ZM17.7943 14.5827V14.3743C17.7943 13.6561 18.0796 12.9672 18.5875 12.4593C19.0954 11.9514 19.7843 11.666 20.5026 11.666C21.2209 11.666 21.9098 11.9514 22.4177 12.4593C22.9256 12.9672 23.2109 13.6561 23.2109 14.3743V14.5827H27.8984C28.0366 14.5827 28.169 14.6376 28.2667 14.7352C28.3644 14.8329 28.4193 14.9654 28.4193 15.1035C28.4193 15.2416 28.3644 15.3741 28.2667 15.4718C28.169 15.5695 28.0366 15.6243 27.8984 15.6243H26.683L25.8497 25.5643C25.7864 26.3192 25.4418 27.0227 24.8842 27.5354C24.3266 28.0482 23.5968 28.3327 22.8393 28.3327H18.1659C17.4085 28.3326 16.6788 28.048 16.1213 27.5353C15.5638 27.0226 15.2192 26.3191 15.1559 25.5643L14.3226 15.6243H13.1068C12.9686 15.6243 12.8362 15.5695 12.7385 15.4718C12.6408 15.3741 12.5859 15.2416 12.5859 15.1035C12.5859 14.9654 12.6408 14.8329 12.7385 14.7352C12.8362 14.6376 12.9686 14.5827 13.1068 14.5827H17.7943ZM16.1939 25.4773C16.2353 25.9718 16.4611 26.4327 16.8263 26.7686C17.1916 27.1045 17.6697 27.291 18.1659 27.291H22.8393C23.3356 27.2911 23.8138 27.1047 24.1792 26.7687C24.5445 26.4328 24.7703 25.9718 24.8118 25.4773L25.6376 15.6243H15.3676L16.1939 25.4773ZM19.4609 18.4368C19.4609 18.2985 19.4059 18.1659 19.3082 18.0682C19.2105 17.9705 19.0779 17.9155 18.9396 17.9155C18.8014 17.9155 18.6688 17.9705 18.5711 18.0682C18.4734 18.1659 18.4184 18.2985 18.4184 18.4368V24.4785C18.4184 24.6167 18.4734 24.7493 18.5711 24.847C18.6688 24.9447 18.8014 24.9997 18.9396 24.9997C19.0779 24.9997 19.2105 24.9447 19.3082 24.847C19.4059 24.7493 19.4609 24.6167 19.4609 24.4785V18.4368ZM22.0651 17.916C21.7776 17.916 21.5443 18.1493 21.5443 18.4368V24.4785C21.5443 24.6166 21.5991 24.7491 21.6968 24.8468C21.7945 24.9445 21.927 24.9993 22.0651 24.9993C22.2032 24.9993 22.3357 24.9445 22.4334 24.8468C22.5311 24.7491 22.5859 24.6166 22.5859 24.4785V18.4368C22.5859 18.1493 22.3526 17.916 22.0651 17.916Z" fill="#FF4444"/>
                    </g>
                    <path d="M15.0026 36.6663H25.0026C33.3359 36.6663 36.6693 33.333 36.6693 24.9997V14.9997C36.6693 6.66634 33.3359 3.33301 25.0026 3.33301H15.0026C6.66927 3.33301 3.33594 6.66634 3.33594 14.9997V24.9997C3.33594 33.333 6.66927 36.6663 15.0026 36.6663Z" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <clipPath id="clip0_venue_delete">
                        <rect width="20" height="20" fill="white" transform="translate(10.5 10)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
                  Are you sure you want to Delete<br />this venue?
                </p>
                <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
                  <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}>Cancel</button>
                  <button onClick={() => { setIsDeleted(true); setShowDeleteModal(false); }} style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}>Delete</button>
                </div>
              </div>
            </div>
          )}

          {showAllReviews && (
            <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.3)" }}
              onClick={() => setShowAllReviews(false)}>
              <div style={{ background: "#fff", borderRadius: "20px", padding: "2vh 1.5vw", width: "55vw", maxHeight: "70vh", overflowY: "auto", boxSizing: "border-box", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
                onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2vh" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                    <p style={{ fontSize: "105%", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", letterSpacing: "0.003em" }}>Experiences</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3vw" }}>
                      <svg style={{ width: "1vw", height: "1vw" }} viewBox="0 0 20 20" fill="#F59E0B"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>{venue.rating} avg.</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAllReviews(false)} style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", border: "1px solid var(--Border, rgba(230,230,230,1))", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1vw", color: "rgba(18,18,18,1)", fontWeight: 400 }}>✕</button>
                </div>
                {/* Review Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
                  {venue.reviews.map((review) => (
                    <div key={review.id} style={{ border: "1px solid var(--Border, rgba(230, 230, 230, 1))", borderRadius: "12px", padding: "1.8vh 1.2vw" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4vh 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                          <div style={{ width: "2.2vw", height: "2.2vw", borderRadius: "50%", backgroundColor: review.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "0.7vw", fontWeight: 600, color: "#fff", fontFamily: "Poppins" }}>{review.initials}</span>
                          </div>
                          <p style={{ fontSize: "0.9vw", fontWeight: 600, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>{review.name}</p>
                        </div>
                        <p style={{ fontSize: "0.8vw", color: "#94A3B8", fontFamily: "Poppins" }}>{review.date}</p>
                      </div>
                      <div style={{ padding: "0.8vh 0 0.4vh 0" }}><StarRating rating={review.rating} size="0.9vw" /></div>
                      <p style={{ fontSize: "0.85vw", color: "#475569", fontFamily: "Poppins", fontWeight: 400, lineHeight: "1.6", padding: "0.4vh 0" }}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right Column ── */}
        <div style={{ width: "22vw", display: "flex", flexDirection: "column", gap: "1.5vh", flexShrink: 0 }}>

          {/* Price */}
          <div style={{ backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "1.5vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", marginBottom: "1vh" }}>
              <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3962 17.4201H10.8863C9.24625 17.4201 7.91625 16.0401 7.91625 14.3401C7.91625 13.9301 8.25625 13.5901 8.66625 13.5901C9.07625 13.5901 9.41625 13.9301 9.41625 14.3401C9.41625 15.2101 10.0763 15.9201 10.8863 15.9201H13.3962C14.0462 15.9201 14.5863 15.3401 14.5863 14.6401C14.5863 13.7701 14.2763 13.6001 13.7663 13.4201L9.73625 12.0001C8.95625 11.7301 7.90625 11.1501 7.90625 9.36008C7.90625 7.82008 9.11625 6.58008 10.5963 6.58008H13.1062C14.7462 6.58008 16.0763 7.96008 16.0763 9.66008C16.0763 10.0701 15.7363 10.4101 15.3263 10.4101C14.9163 10.4101 14.5763 10.0701 14.5763 9.66008C14.5763 8.79008 13.9162 8.08008 13.1062 8.08008H10.5963C9.94625 8.08008 9.40625 8.66008 9.40625 9.36008C9.40625 10.2301 9.71625 10.4001 10.2262 10.5801L14.2563 12.0001C15.0363 12.2701 16.0863 12.8501 16.0863 14.6401C16.0763 16.1701 14.8762 17.4201 13.3962 17.4201Z" fill="#1C1B17" />
                <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="#1C1B17" />
                <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="#1C1B17" />
              </svg>
              <p style={{ fontSize: "105%", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", letterSpacing: "0.003em" }}>Price</p>
            </div>
            <div style={{ backgroundColor: "rgba(13, 139, 71, 0.1)", border: "1px solid rgba(13, 139, 71, 0.5)", borderRadius: "12px", padding: "4vh 1vw", textAlign: "center" }}>
              <p style={{ fontSize: "1.8vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>${venue.avg_price} USD</p>
              <p style={{ fontSize: "0.8vw", color: "rgba(107, 114, 128, 1)", fontFamily: "Poppins", marginTop: "0.5vh" }}>Average price</p>
            </div>
          </div>

          {/* Location */}
          <div style={{ backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "1.5vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", marginBottom: "1vh" }}>
              <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9989 13.4304C13.722 13.4304 15.1189 12.0336 15.1189 10.3104C15.1189 8.5873 13.722 7.19043 11.9989 7.19043C10.2758 7.19043 8.87891 8.5873 8.87891 10.3104C8.87891 12.0336 10.2758 13.4304 11.9989 13.4304Z" stroke="#1C1B17" strokeWidth="1.5" />
                <path d="M3.62166 8.49C5.59166 -0.169998 18.4217 -0.159997 20.3817 8.5C21.5317 13.58 18.3717 17.88 15.6017 20.54C13.5917 22.48 10.4117 22.48 8.39166 20.54C5.63166 17.88 2.47166 13.57 3.62166 8.49Z" stroke="#1C1B17" strokeWidth="1.5" />
              </svg>
              <p style={{ fontSize: "105%", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", letterSpacing: "0.003em" }}>Location</p>
            </div>
            <div style={{ borderRadius: "12px", overflow: "hidden", height: "22vh", backgroundColor: "#E2E8F0", position: "relative" }}>
              <iframe
                src={`https://maps.google.com/maps?q=${venue.lat},${venue.lng}&z=14&output=embed`}
                style={{ width: "100%", height: "100%", border: "none" }}
                loading="lazy"
              />
              <div style={{ position: "absolute", top: "50%", right: "0.6vw", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "0.3vh", zIndex: 10, alignItems: "center" }}>
                <button
                  onClick={() => {
                    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
                    if (iframe) iframe.src = iframe.src.replace(/z=(\d+)/, (_, z) => `z=${Math.min(21, +z + 1)}`);
                  }}
                  style={{ width: "2.2vh", height: "2.2vh", borderRadius: "6px", border: "1px solid var(--Border, rgba(230,230,230,1))", background: "rgba(249, 249, 249, 1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1vw", fontWeight: 700, color: "#1C1B17", lineHeight: 1 }}
                >+</button>
                <button
                  onClick={() => {
                    const iframe = document.querySelector("iframe") as HTMLIFrameElement;
                    if (iframe) iframe.src = iframe.src.replace(/z=(\d+)/, (_, z) => `z=${Math.max(1, +z - 1)}`);
                  }}
                  style={{ width: "2.2vh", height: "2.2vh", borderRadius: "6px", border: "1px solid var(--Border, rgba(230,230,230,1))", background: "rgba(249, 249, 249, 1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1vw", fontWeight: 700, color: "#1C1B17", lineHeight: 1 }}
                >−</button>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div style={{ backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "20px", border: "1px solid #F1F5F9", padding: "1.5vw" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2vh" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <p style={{ fontSize: "105%", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins", letterSpacing: "0.003em" }}>Business Hours</p>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: "0.3vw", background: "none", border: "none", cursor: "pointer", fontSize: "0.8vw", fontWeight: 500, color: "rgba(18,18,18,1)", fontFamily: "Poppins" }}>
                <svg style={{ width: "0.9vw", height: "0.9vw" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.2594 3.60022L5.04936 12.2902C4.73936 12.6202 4.43936 13.2702 4.37936 13.7202L4.00936 16.9602C3.87936 18.1302 4.71936 18.9302 5.87936 18.7302L9.09936 18.1802C9.54936 18.1002 10.1794 17.7702 10.4894 17.4302L18.6994 8.74022C20.1194 7.24022 20.7594 5.53022 18.5494 3.44022C16.3494 1.37022 14.6794 2.10022 13.2594 3.60022Z" />
                  <path d="M11.8906 5.0498C12.3206 7.8098 14.5606 9.9198 17.3406 10.1998" />
                  <path d="M3 22H21" />
                </svg>
                Edit
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              {venue.business_hours.map((h) => (
                <div key={h.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "0.85vw", color: "var(--Sub-text, rgba(107, 114, 128, 1))", fontFamily: "Poppins", fontWeight: 400 }}>{h.day}</p>
                  <p style={{ fontSize: "0.85vw", color: "var(--Text, rgba(18, 18, 18, 1))", fontFamily: "Poppins", fontWeight: h.hours === "Closed" ? 500 : 400 }}>{h.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}