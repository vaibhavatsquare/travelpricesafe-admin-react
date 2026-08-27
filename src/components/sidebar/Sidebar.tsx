"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const IconDashboard = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4vw", height: "1.4vw", flexShrink: 0 }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.0373 2.03437C13.67 1.40163 14.5633 1.14551 15.5859 1.14551H17.4193C18.4419 1.14551 19.3352 1.40163 19.9679 2.03437C20.6006 2.66711 20.8568 3.56037 20.8568 4.58301V6.41634C20.8568 7.43898 20.6006 8.33224 19.9679 8.96498C19.3352 9.59772 18.4419 9.85384 17.4193 9.85384H15.5859C14.5633 9.85384 13.67 9.59772 13.0373 8.96498C12.4046 8.33224 12.1484 7.43898 12.1484 6.41634V4.58301C12.1484 3.56037 12.4046 2.66711 13.0373 2.03437ZM14.0096 3.00664C13.7256 3.29057 13.5234 3.77232 13.5234 4.58301V6.41634C13.5234 7.22703 13.7256 7.70878 14.0096 7.9927C14.2935 8.27663 14.7752 8.47884 15.5859 8.47884H17.4193C18.23 8.47884 18.7117 8.27663 18.9956 7.9927C19.2796 7.70878 19.4818 7.22703 19.4818 6.41634V4.58301C19.4818 3.77232 19.2796 3.29057 18.9956 3.00664C18.7117 2.72272 18.23 2.52051 17.4193 2.52051H15.5859C14.7752 2.52051 14.2935 2.72272 14.0096 3.00664Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.0373 13.0344C2.67004 12.4016 3.5633 12.1455 4.58594 12.1455H6.41927C7.44191 12.1455 8.33517 12.4016 8.96791 13.0344C9.60065 13.6671 9.85677 14.5604 9.85677 15.583V17.4163C9.85677 18.439 9.60065 19.3322 8.96791 19.965C8.33517 20.5977 7.44191 20.8538 6.41927 20.8538H4.58594C3.5633 20.8538 2.67004 20.5977 2.0373 19.965C1.40456 19.3322 1.14844 18.439 1.14844 17.4163V15.583C1.14844 14.5604 1.40456 13.6671 2.0373 13.0344ZM3.00957 14.0066C2.72564 14.2906 2.52344 14.7723 2.52344 15.583V17.4163C2.52344 18.227 2.72564 18.7088 3.00957 18.9927C3.2935 19.2766 3.77525 19.4788 4.58594 19.4788H6.41927C7.22996 19.4788 7.71171 19.2766 7.99563 18.9927C8.27956 18.7088 8.48177 18.227 8.48177 17.4163V15.583C8.48177 14.7723 8.27956 14.2906 7.99563 14.0066C7.71171 13.7227 7.22996 13.5205 6.41927 13.5205H4.58594C3.77525 13.5205 3.2935 13.7227 3.00957 14.0066Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.5026 2.52051C3.85726 2.52051 2.52344 3.85433 2.52344 5.49967C2.52344 7.14502 3.85726 8.47884 5.5026 8.47884C7.14795 8.47884 8.48177 7.14502 8.48177 5.49967C8.48177 3.85433 7.14795 2.52051 5.5026 2.52051ZM1.14844 5.49967C1.14844 3.09493 3.09786 1.14551 5.5026 1.14551C7.90734 1.14551 9.85677 3.09493 9.85677 5.49967C9.85677 7.90441 7.90734 9.85384 5.5026 9.85384C3.09786 9.85384 1.14844 7.90441 1.14844 5.49967Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M16.5026 13.5205C14.8573 13.5205 13.5234 14.8543 13.5234 16.4997C13.5234 18.145 14.8573 19.4788 16.5026 19.4788C18.148 19.4788 19.4818 18.145 19.4818 16.4997C19.4818 14.8543 18.148 13.5205 16.5026 13.5205ZM12.1484 16.4997C12.1484 14.0949 14.0979 12.1455 16.5026 12.1455C18.9073 12.1455 20.8568 14.0949 20.8568 16.4997C20.8568 18.9044 18.9073 20.8538 16.5026 20.8538C14.0979 20.8538 12.1484 18.9044 12.1484 16.4997Z" fill="currentColor"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4vw", height: "1.4vw", flexShrink: 0 }}>
    <path d="M16.5022 6.56301C16.4472 6.55384 16.383 6.55384 16.328 6.56301C15.063 6.51718 14.0547 5.48134 14.0547 4.19801C14.0547 2.88718 15.1089 1.83301 16.4197 1.83301C17.7305 1.83301 18.7847 2.89634 18.7847 4.19801C18.7755 5.48134 17.7672 6.51718 16.5022 6.56301Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5588 13.2365C16.8146 13.4473 18.1988 13.2273 19.1704 12.5765C20.4629 11.7148 20.4629 10.3032 19.1704 9.44149C18.1896 8.79066 16.7871 8.57065 15.5312 8.79065" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.47 6.56301C5.525 6.55384 5.58917 6.55384 5.64417 6.56301C6.90917 6.51718 7.9175 5.48134 7.9175 4.19801C7.9175 2.88718 6.86334 1.83301 5.5525 1.83301C4.24167 1.83301 3.1875 2.89634 3.1875 4.19801C3.19667 5.48134 4.205 6.51718 5.47 6.56301Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.41698 13.2365C5.16114 13.4473 3.77698 13.2273 2.80531 12.5765C1.51281 11.7148 1.51281 10.3032 2.80531 9.44149C3.78615 8.79066 5.18864 8.57065 6.44448 8.79065" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.9944 13.4107C10.9394 13.4015 10.8752 13.4015 10.8202 13.4107C9.55521 13.3648 8.54688 12.329 8.54688 11.0457C8.54688 9.73483 9.60104 8.68066 10.9119 8.68066C12.2227 8.68066 13.2769 9.744 13.2769 11.0457C13.2677 12.329 12.2594 13.374 10.9944 13.4107Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.32875 16.2981C7.03625 17.1598 7.03625 18.5714 8.32875 19.4331C9.79542 20.4139 12.1971 20.4139 13.6637 19.4331C14.9562 18.5714 14.9562 17.1598 13.6637 16.2981C12.2062 15.3264 9.79542 15.3264 8.32875 16.2981Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBuildings = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4vw", height: "1.4vw", flexShrink: 0 }}>
    <path d="M11.9193 20.1668H4.58594C2.7526 20.1668 1.83594 19.2502 1.83594 17.4168V10.0835C1.83594 8.25016 2.7526 7.3335 4.58594 7.3335H9.16927V17.4168C9.16927 19.2502 10.0859 20.1668 11.9193 20.1668Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.27009 3.6665C9.19676 3.9415 9.16927 4.244 9.16927 4.58317V7.33317H4.58594V5.49984C4.58594 4.4915 5.41094 3.6665 6.41927 3.6665H9.27009Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.8359 7.3335V11.9168" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.5 7.3335V11.9168" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5859 15.5835H13.7526C13.2484 15.5835 12.8359 15.996 12.8359 16.5002V20.1668H16.5026V16.5002C16.5026 15.996 16.0901 15.5835 15.5859 15.5835Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 11.9165V15.5832" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.16406 17.4168V4.5835C9.16406 2.75016 10.0807 1.8335 11.9141 1.8335H17.4141C19.2474 1.8335 20.1641 2.75016 20.1641 4.5835V17.4168C20.1641 19.2502 19.2474 20.1668 17.4141 20.1668H11.9141C10.0807 20.1668 9.16406 19.2502 9.16406 17.4168Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTag = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4vw", height: "1.4vw", flexShrink: 0 }}>
    <path d="M4.03769 14.2325L8.19019 18.385C9.89519 20.09 12.6635 20.09 14.3777 18.385L18.4019 14.3608C20.1069 12.6558 20.1069 9.8875 18.4019 8.17334L14.2402 4.03C13.3694 3.15917 12.1685 2.69167 10.9402 2.75584L6.35686 2.97584C4.52353 3.05834 3.06603 4.51584 2.97436 6.34L2.75436 10.9233C2.69936 12.1608 3.16686 13.3617 4.03769 14.2325Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.92448 11.2074C10.1901 11.2074 11.2161 10.1813 11.2161 8.91569C11.2161 7.65004 10.1901 6.62402 8.92448 6.62402C7.65883 6.62402 6.63281 7.65004 6.63281 8.91569C6.63281 10.1813 7.65883 11.2074 8.92448 11.2074Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M12.1328 15.7907L15.7995 12.124" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4vw", height: "1.4vw", flexShrink: 0 }}>
    <path d="M14.1043 4.776L15.3968 7.36099C15.5709 7.71849 16.0384 8.05765 16.4326 8.13099L18.7701 8.51598C20.2643 8.76348 20.6126 9.84516 19.5401 10.9268L17.7159 12.751C17.4134 13.0535 17.2393 13.6493 17.3401 14.0802L17.8626 16.3352C18.2751 18.1135 17.3218 18.8102 15.7543 17.8752L13.5634 16.5735C13.1693 16.3352 12.5093 16.3352 12.1151 16.5735L9.92427 17.8752C8.35677 18.801 7.40345 18.1135 7.81595 16.3352L8.33845 14.0802C8.43929 13.6585 8.26512 13.0627 7.96262 12.751L6.13846 10.9268C5.06596 9.85432 5.41429 8.77265 6.90846 8.51598L9.24594 8.13099C9.64011 8.06682 10.1076 7.71849 10.2818 7.36099L11.5743 4.776C12.2618 3.3735 13.3985 3.3735 14.1043 4.776Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.33594 4.5835H1.83594" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.58594 17.4165H1.83594" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.7526 11H1.83594" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4vw", height: "1.4vw", flexShrink: 0 }}>
    <path d="M12 10.5199C11.59 10.5199 11.25 10.1799 11.25 9.76994V6.43994C11.25 6.02994 11.59 5.68994 12 5.68994C12.41 5.68994 12.75 6.02994 12.75 6.43994V9.76994C12.75 10.1899 12.41 10.5199 12 10.5199Z" fill="currentColor"/>
    <path d="M12.0199 20.3502C9.43987 20.3502 6.86987 19.9402 4.41987 19.1202C3.50987 18.8202 2.81987 18.1702 2.51987 17.3502C2.21987 16.5302 2.31987 15.5902 2.80987 14.7702L4.07987 12.6502C4.35987 12.1802 4.60987 11.3002 4.60987 10.7502V8.65023C4.60987 4.56023 7.92987 1.24023 12.0199 1.24023C16.1099 1.24023 19.4299 4.56023 19.4299 8.65023V10.7502C19.4299 11.2902 19.6799 12.1802 19.9599 12.6502L21.2299 14.7702C21.6999 15.5502 21.7799 16.4802 21.4699 17.3302C21.1599 18.1802 20.4799 18.8302 19.6199 19.1202C17.1699 19.9502 14.5999 20.3502 12.0199 20.3502ZM12.0199 2.75023C8.75987 2.75023 6.10987 5.40023 6.10987 8.66023V10.7602C6.10987 11.5702 5.78987 12.7402 5.36987 13.4302L4.09987 15.5602C3.83987 15.9902 3.77987 16.4502 3.92987 16.8502C4.07987 17.2502 4.41987 17.5502 4.89987 17.7102C9.49987 19.2402 14.5599 19.2402 19.1599 17.7102C19.5899 17.5702 19.9199 17.2502 20.0699 16.8302C20.2299 16.4102 20.1799 15.9502 19.9499 15.5602L18.6799 13.4402C18.2599 12.7502 17.9399 11.5802 17.9399 10.7702V8.67023C17.9299 5.40023 15.2799 2.75023 12.0199 2.75023Z" fill="currentColor"/>
    <path d="M11.9999 22.8998C10.9299 22.8998 9.87992 22.4598 9.11992 21.6998C8.35992 20.9398 7.91992 19.8898 7.91992 18.8198H9.41992C9.41992 19.4998 9.69992 20.1598 10.1799 20.6398C10.6599 21.1198 11.3199 21.3998 11.9999 21.3998C13.4199 21.3998 14.5799 20.2398 14.5799 18.8198H16.0799C16.0799 21.0698 14.2499 22.8998 11.9999 22.8998Z" fill="currentColor"/>
  </svg>
);
import { cn } from "@/libs/utils";
import { useState } from "react";

const navItems = [
  { label: "Dashboard",         href: "/dashboard",         icon: IconDashboard },
  { label: "Users Management",  href: "/user-management",   icon: IconUsers },
  { label: "Venue\u00A0Management",   href: "/venue",             icon: IconBuildings },
  { label: "Deals",             href: "/deals",             icon: IconTag },
  { label: "Experiences",       href: "/experiences",       icon: IconStar },
  { label: "Notifications",     href: "/notifications",     icon: IconBell },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
    <aside
      className="flex flex-col sticky top-0 overflow-hidden"
      style={{ width: "16vw", height: "100vh", padding: "0.5vh 1vw", backgroundColor: "rgba(21, 34, 63, 1)" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center" style={{ marginBottom: "1vh" }}>
        <Image src="/favicon.svg" alt="Logo" width={0} height={0} style={{ width: "10vw", height: "10vw" }} />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col flex-1" style={{ gap: "1.2vh" }}>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center font-medium transition-colors rounded-full",
                isActive ? "bg-white text-[rgba(21,34,63,1)]" : "text-white/70 hover:text-white hover:bg-white/5"
              )}
              style={{ gap: "0.8vw", padding: "1.4vh 0.8vw", fontSize: "1vw" }}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto" style={{ marginBottom: "2vh", padding: "0 0.8vw" }}>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="relative flex items-center justify-center rounded-full font-medium bg-white hover:bg-white/90 transition-colors"
          style={{ padding: "1.4vh 0.8vw", fontSize: "1vw", width: "100%", color: "rgba(255, 68, 68, 1)" }}
        >
          <span style={{ position: "absolute", left: "0.8vw", display: "flex", alignItems: "center" }}>
            <svg width="1.4vw" height="1.4vw" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "1.4vw", height: "1.4vw" }}>
              <path d="M15.9844 13.4023L18.331 11.0557L15.9844 8.70898" stroke="rgba(255,68,68,1)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.94531 11.0547H18.2678" stroke="rgba(255,68,68,1)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.7786 18.3327C6.72698 18.3327 3.44531 15.5827 3.44531 10.9993C3.44531 6.41602 6.72698 3.66602 10.7786 3.66602" stroke="rgba(255,68,68,1)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Logout
        </button>
      </div>
    </aside>

    {showLogoutModal && (
      <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
        <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "5vh 2vw 4vh", width: "22vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>
          <p style={{ fontSize: "1.3vw", fontWeight: 700, color: "rgba(18, 18, 18, 1)", textAlign: "center", margin: 0, fontFamily: "Poppins" }}>
            Logout?
          </p>
          <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
            Are you sure you want to logout?
          </p>
          <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
            <button
              onClick={() => setShowLogoutModal(false)}
              style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}
            >
              Cancel
            </button>
            <button
              onClick={() => { setShowLogoutModal(false); }}
              style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}