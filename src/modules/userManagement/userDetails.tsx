"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

type UserDetail = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_blocked: boolean;
  address: string;
  city: string;
  state: string;
  country: string;
  language: string;
  home_currency: string;
  joined: string;
  is_deleted: boolean;
};

type Experience = {
  id: number;
  title: string;
  date: string;
  rating: number;
  description: string;
  images: string[];
};

const AVATAR_COLORS = [
  "#4F46E5", "#7C3AED", "#DB2777", "#EA580C",
  "#16A34A", "#0891B2", "#DC2626", "#9333EA",
];

function getAvatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "0.2vw" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill={star <= rating ? "#F5C518" : "none"} stroke="#F5C518" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// Dummy data
const allUsers = [
  { id: "u1", first_name: "Reinhold", last_name: "Smith",  email: "reinhold.s@gmail.com",  is_active: false, is_blocked: true,  is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u2", first_name: "Monica",   last_name: "Mueller", email: "monica.m@gmail.com",    is_active: false, is_blocked: true,  is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u3", first_name: "Carley",   last_name: "Rath",    email: "carley.r@gmail.com",    is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u4", first_name: "Kaylin",   last_name: "Funk",    email: "kaylin.f@gmail.com",    is_active: false, is_blocked: false, is_deleted: true,  address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u5", first_name: "Maurice",  last_name: "Bosco",   email: "maurice.b@gmail.com",   is_active: false, is_blocked: true,  is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u6", first_name: "Buford",   last_name: "Lane",    email: "buford.l@gmail.com",    is_active: false, is_blocked: false, is_deleted: true,  address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u7", first_name: "Dasia",    last_name: "Gleason", email: "dasia.g@gmail.com",     is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u8", first_name: "Devon",    last_name: "Hill",    email: "devon.h@gmail.com",     is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u9", first_name: "Trevion",  last_name: "Mueller", email: "trevion.m@gmail.com",   is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u10",first_name: "Amanda",   last_name: "Gleason", email: "amanda.g@gmail.com",    is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2023-12-31" },
  { id: "u11",first_name: "James",    last_name: "Wilson",  email: "james.w@gmail.com",     is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2024-05-10" },
  { id: "u12",first_name: "Sarah",    last_name: "Connor",  email: "sarah.c@gmail.com",     is_active: false, is_blocked: true,  is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2024-05-12" },
  { id: "u13",first_name: "Michael",  last_name: "Jordan",  email: "michael.j@gmail.com",   is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2024-04-20" },
  { id: "u14",first_name: "Emily",    last_name: "Davis",   email: "emily.d@gmail.com",     is_active: true,  is_blocked: false, is_deleted: false, address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2024-03-15" },
  { id: "u15",first_name: "Lucas",    last_name: "Brown",   email: "lucas.b@gmail.com",     is_active: false, is_blocked: false, is_deleted: true,  address: "1250 Market Street, Apt 8B", city: "San Francisco", state: "California (CA)", country: "United States", language: "English", home_currency: "USD", joined: "2024-07-01" },
];

const dummyUser: UserDetail = {
  id: "u1",
  first_name: "James",
  last_name: "Smith",
  email: "james.smith@gmail.com",
  is_active: false,
  is_blocked: true,
  address: "1250 Market Street, Apt 8B",
  city: "San Francisco",
  state: "California (CA)",
  country: "United States",
  language: "English",
  home_currency: "USD",
  joined: "2023-12-31",
  is_deleted: false,
};

const dummyExperiences: Experience[] = [
  {
    id: 1,
    title: "The Hudson Restaurant",
    date: "March 2024",
    rating: 4,
    description: "The atmosphere here is unmatched. We had the Golden Hour tasting and every course was a masterpiece. The staff was incredibly attentive without being overbearing. A must visit!",
    images: [],
  },
  {
    id: 2,
    title: "The Hudson Restaurant",
    date: "March 2024",
    rating: 4,
    description: "The atmosphere here is unmatched. We had the Golden Hour tasting and every course was a masterpiece. The staff was incredibly attentive without being overbearing. A must visit!",
    images: [],
  },
  {
    id: 3,
    title: "The Hudson Restaurant",
    date: "March 2024",
    rating: 3,
    description: "The atmosphere here is unmatched. We had the Golden Hour tasting and every course was a masterpiece. The staff was incredibly attentive without being overbearing. A must visit!",
    images: [],
  },
];

const AddressIcon = () => <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M9.99844 11.8079C8.22344 11.8079 6.77344 10.3662 6.77344 8.58288C6.77344 6.79954 8.22344 5.36621 9.99844 5.36621C11.7734 5.36621 13.2234 6.80788 13.2234 8.59121C13.2234 10.3745 11.7734 11.8079 9.99844 11.8079ZM9.99844 6.61621C8.9151 6.61621 8.02344 7.49954 8.02344 8.59121C8.02344 9.68288 8.90677 10.5662 9.99844 10.5662C11.0901 10.5662 11.9734 9.68288 11.9734 8.59121C11.9734 7.49954 11.0818 6.61621 9.99844 6.61621Z" fill="#121212"/><path d="M10.0014 18.967C8.76803 18.967 7.52637 18.5003 6.5597 17.5753C4.10137 15.2087 1.3847 11.4337 2.4097 6.94199C3.3347 2.86699 6.89303 1.04199 10.0014 1.04199C10.0014 1.04199 10.0014 1.04199 10.0097 1.04199C13.118 1.04199 16.6764 2.86699 17.6014 6.95033C18.618 11.442 15.9014 15.2087 13.443 17.5753C12.4764 18.5003 11.2347 18.967 10.0014 18.967ZM10.0014 2.29199C7.57637 2.29199 4.4597 3.58366 3.6347 7.21699C2.7347 11.142 5.20137 14.5253 7.4347 16.667C8.87637 18.0587 11.1347 18.0587 12.5764 16.667C14.8014 14.5253 17.268 11.142 16.3847 7.21699C15.5514 3.58366 12.4264 2.29199 10.0014 2.29199Z" fill="#121212"/></svg>;
const CityIcon = () => <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M10.4156 18.9586H3.39896C2.09062 18.9586 1.01562 17.9086 1.01562 16.6086V4.2419C1.01562 2.9669 1.49062 1.97524 2.35729 1.43357C3.23229 0.883571 4.36563 0.900237 5.54063 1.48357L9.24062 3.30024C10.249 3.80024 11.0406 5.05857 11.0406 6.17524V18.3336C11.0406 18.6752 10.7573 18.9586 10.4156 18.9586ZM3.79896 2.2919C3.50729 2.2919 3.24062 2.35857 3.01562 2.50024C2.53229 2.80024 2.26562 3.42524 2.26562 4.2419V16.6086C2.26562 17.2169 2.77396 17.7086 3.39896 17.7086H9.79062V6.17524C9.79062 5.53357 9.27396 4.70857 8.68229 4.42524L4.98229 2.60857C4.55729 2.40024 4.15729 2.2919 3.79896 2.2919Z" fill="#121212"/><path d="M15.6763 18.9584H10.418C10.0763 18.9584 9.79297 18.6751 9.79297 18.3334V8.68339C9.79297 8.49173 9.8763 8.31673 10.0263 8.20006C10.1763 8.08339 10.3596 8.03339 10.5513 8.07506L10.943 8.15839L16.393 9.37506C18.0513 9.74173 18.8846 10.7167 18.9346 12.3751C18.943 12.3751 18.943 12.4584 18.943 12.5501V15.7001C18.9346 17.8334 17.8096 18.9584 15.6763 18.9584ZM11.043 17.7084H15.6763C17.143 17.7084 17.6846 17.1667 17.6846 15.7001V12.4834C17.643 11.3417 17.2096 10.8334 16.118 10.5917L11.043 9.45839V17.7084Z" fill="#121212"/><path d="M7.4737 8.125H4.58203C4.24036 8.125 3.95703 7.84167 3.95703 7.5C3.95703 7.15833 4.24036 6.875 4.58203 6.875H7.4737C7.81536 6.875 8.0987 7.15833 8.0987 7.5C8.0987 7.84167 7.8237 8.125 7.4737 8.125Z" fill="#121212"/><path d="M7.4737 11.458H4.58203C4.24036 11.458 3.95703 11.1747 3.95703 10.833C3.95703 10.4913 4.24036 10.208 4.58203 10.208H7.4737C7.81536 10.208 8.0987 10.4913 8.0987 10.833C8.0987 11.1747 7.8237 11.458 7.4737 11.458Z" fill="#121212"/><path d="M12.6836 14.7921C11.3086 14.7921 10.1836 13.6671 10.1836 12.2921V8.76706C10.1836 8.57539 10.2669 8.40039 10.4169 8.27539C10.5669 8.15039 10.7586 8.10872 10.9419 8.15039L14.6919 8.99206C14.9753 9.05872 15.1836 9.30872 15.1836 9.60039V12.2837C15.1836 13.6671 14.0669 14.7921 12.6836 14.7921ZM11.4336 9.55039V12.2921C11.4336 12.9837 11.9919 13.5421 12.6836 13.5421C13.3753 13.5421 13.9336 12.9837 13.9336 12.2921V10.1087L11.4336 9.55039Z" fill="#121212"/><path d="M16.4336 14.7915C15.0586 14.7915 13.9336 13.6665 13.9336 12.2915V9.6082C13.9336 9.41653 14.0169 9.24153 14.1669 9.12486C14.3169 9.0082 14.5086 8.9582 14.6919 8.99986L16.3836 9.37486C18.0419 9.74153 18.8753 10.7165 18.9253 12.3749C18.9253 12.3915 18.9253 12.4082 18.9253 12.4249C18.8586 13.7499 17.7669 14.7915 16.4336 14.7915ZM15.1836 10.3832V12.2915C15.1836 12.9832 15.7419 13.5415 16.4336 13.5415C17.0919 13.5415 17.6336 13.0332 17.6753 12.3832C17.6336 11.3332 17.2003 10.8332 16.1169 10.5915L15.1836 10.3832Z" fill="#121212"/></svg>;
const StateIcon = () => <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M18.3346 18.958H1.66797C1.3263 18.958 1.04297 18.6747 1.04297 18.333C1.04297 17.9913 1.3263 17.708 1.66797 17.708H18.3346C18.6763 17.708 18.9596 17.9913 18.9596 18.333C18.9596 18.6747 18.6763 18.958 18.3346 18.958Z" fill="#121212"/><path d="M12.0833 5.19153C11.3 5.19153 10.5167 5.04155 9.76667 4.74155C9.53333 4.64988 9.375 4.41654 9.375 4.1582V1.6582C9.375 1.44987 9.475 1.25821 9.65 1.14154C9.825 1.02487 10.0417 0.99986 10.2333 1.07486C11.425 1.54986 12.7417 1.54986 13.9333 1.07486C14.125 0.99986 14.3417 1.02487 14.5167 1.14154C14.6917 1.25821 14.7917 1.44987 14.7917 1.6582V4.1582C14.7917 4.41654 14.6333 4.64155 14.4 4.74155C13.65 5.04155 12.8667 5.19153 12.0833 5.19153ZM10.625 3.72485C11.575 4.01652 12.5917 4.01652 13.5417 3.72485V2.51656C12.5833 2.74989 11.5833 2.74989 10.625 2.51656V3.72485Z" fill="#121212"/><path d="M10 7.29199C9.65833 7.29199 9.375 7.00866 9.375 6.66699V4.16699C9.375 3.82533 9.65833 3.54199 10 3.54199C10.3417 3.54199 10.625 3.82533 10.625 4.16699V6.66699C10.625 7.00866 10.3417 7.29199 10 7.29199Z" fill="#121212"/><path d="M16.6654 18.9587H3.33203C2.99036 18.9587 2.70703 18.6753 2.70703 18.3337V9.16699C2.70703 7.15033 3.81536 6.04199 5.83203 6.04199H14.1654C16.182 6.04199 17.2904 7.15033 17.2904 9.16699V18.3337C17.2904 18.6753 17.007 18.9587 16.6654 18.9587ZM3.95703 17.7087H16.0404V9.16699C16.0404 7.85033 15.482 7.29199 14.1654 7.29199H5.83203C4.51536 7.29199 3.95703 7.85033 3.95703 9.16699V17.7087Z" fill="#121212"/><path d="M16.1831 10.625H3.81641C3.47474 10.625 3.19141 10.3417 3.19141 10C3.19141 9.65833 3.47474 9.375 3.81641 9.375H16.1831C16.5247 9.375 16.8081 9.65833 16.8081 10C16.8081 10.3417 16.5247 10.625 16.1831 10.625Z" fill="#121212"/><path d="M7.28516 10H6.03516V18.3333H7.28516V10Z" fill="#121212"/><path d="M10.6172 10H9.36719V18.3333H10.6172V10Z" fill="#121212"/><path d="M13.9492 10H12.6992V18.3333H13.9492V10Z" fill="#121212"/></svg>;
const CountryIcon = () => <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M10.0013 18.9587C5.05964 18.9587 1.04297 14.942 1.04297 10.0003C1.04297 5.05866 5.05964 1.04199 10.0013 1.04199C14.943 1.04199 18.9596 5.05866 18.9596 10.0003C18.9596 14.942 14.943 18.9587 10.0013 18.9587ZM10.0013 2.29199C5.7513 2.29199 2.29297 5.75033 2.29297 10.0003C2.29297 14.2503 5.7513 17.7087 10.0013 17.7087C14.2513 17.7087 17.7096 14.2503 17.7096 10.0003C17.7096 5.75033 14.2513 2.29199 10.0013 2.29199Z" fill="#121212"/><path d="M7.49922 18.125H6.66589C6.32422 18.125 6.04089 17.8417 6.04089 17.5C6.04089 17.1583 6.30755 16.8833 6.64922 16.875C5.34089 12.4083 5.34089 7.59167 6.64922 3.125C6.30755 3.11667 6.04089 2.84167 6.04089 2.5C6.04089 2.15833 6.32422 1.875 6.66589 1.875H7.49922C7.69922 1.875 7.89089 1.975 8.00755 2.13333C8.12422 2.3 8.15755 2.50833 8.09089 2.7C6.52422 7.40833 6.52422 12.5917 8.09089 17.3083C8.15755 17.5 8.12422 17.7083 8.00755 17.875C7.89089 18.025 7.69922 18.125 7.49922 18.125Z" fill="#121212"/><path d="M12.4981 18.1252C12.4314 18.1252 12.3647 18.1169 12.2981 18.0919C11.9731 17.9836 11.7897 17.6252 11.9064 17.3002C13.4731 12.5919 13.4731 7.40856 11.9064 2.6919C11.7981 2.3669 11.9731 2.00856 12.2981 1.90023C12.6314 1.7919 12.9814 1.9669 13.0897 2.2919C14.7481 7.25856 14.7481 12.7252 13.0897 17.6836C13.0064 17.9586 12.7564 18.1252 12.4981 18.1252Z" fill="#121212"/><path d="M10 14.333C7.675 14.333 5.35833 14.008 3.125 13.3497C3.11667 13.683 2.84167 13.958 2.5 13.958C2.15833 13.958 1.875 13.6747 1.875 13.333V12.4997C1.875 12.2997 1.975 12.108 2.13333 11.9913C2.3 11.8747 2.50833 11.8413 2.7 11.908C7.40833 13.4747 12.6 13.4747 17.3083 11.908C17.5 11.8413 17.7083 11.8747 17.875 11.9913C18.0417 12.108 18.1333 12.2997 18.1333 12.4997V13.333C18.1333 13.6747 17.85 13.958 17.5083 13.958C17.1667 13.958 16.8917 13.6913 16.8833 13.3497C14.6417 14.008 12.325 14.333 10 14.333Z" fill="#121212"/><path d="M17.4992 8.12546C17.4325 8.12546 17.3658 8.11712 17.2992 8.09212C12.5908 6.52546 7.39917 6.52546 2.69084 8.09212C2.3575 8.20046 2.0075 8.02546 1.89917 7.70046C1.79917 7.36712 1.97417 7.01712 2.29917 6.90879C7.26584 5.25046 12.7325 5.25046 17.6908 6.90879C18.0158 7.01712 18.1992 7.37546 18.0825 7.70046C18.0075 7.95879 17.7575 8.12546 17.4992 8.12546Z" fill="#121212"/></svg>;
const LanguageIcon = () => <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M14.1565 8.0918H5.83984C5.49818 8.0918 5.21484 7.80846 5.21484 7.4668C5.21484 7.12513 5.49818 6.8418 5.83984 6.8418H14.1565C14.4982 6.8418 14.7815 7.12513 14.7815 7.4668C14.7815 7.80846 14.4982 8.0918 14.1565 8.0918Z" fill="#121212"/><path d="M10 8.0914C9.65833 8.0914 9.375 7.80807 9.375 7.4664V6.06641C9.375 5.72474 9.65833 5.44141 10 5.44141C10.3417 5.44141 10.625 5.72474 10.625 6.06641V7.4664C10.625 7.80807 10.3417 8.0914 10 8.0914Z" fill="#121212"/><path d="M5.83203 14.5575C5.49036 14.5575 5.20703 14.2742 5.20703 13.9325C5.20703 13.5909 5.49036 13.3075 5.83203 13.3075C8.93203 13.3075 11.457 10.6826 11.457 7.44922C11.457 7.10755 11.7404 6.82422 12.082 6.82422C12.4237 6.82422 12.707 7.10755 12.707 7.44922C12.707 11.3742 9.6237 14.5575 5.83203 14.5575Z" fill="#121212"/><path d="M14.1664 14.5585C12.5247 14.5585 10.9997 13.7419 9.88303 12.2502C9.6747 11.9752 9.73305 11.5836 10.0081 11.3752C10.2831 11.1669 10.6747 11.2252 10.883 11.5002C11.7664 12.6669 12.9331 13.3085 14.1747 13.3085C14.5164 13.3085 14.7997 13.5919 14.7997 13.9335C14.7997 14.2752 14.508 14.5585 14.1664 14.5585Z" fill="#121212"/><path d="M12.5013 18.9587H7.5013C2.9763 18.9587 1.04297 17.0253 1.04297 12.5003V7.50033C1.04297 2.97533 2.9763 1.04199 7.5013 1.04199H12.5013C17.0263 1.04199 18.9596 2.97533 18.9596 7.50033V12.5003C18.9596 17.0253 17.0263 18.9587 12.5013 18.9587ZM7.5013 2.29199C3.65964 2.29199 2.29297 3.65866 2.29297 7.50033V12.5003C2.29297 16.342 3.65964 17.7087 7.5013 17.7087H12.5013C16.343 17.7087 17.7096 16.342 17.7096 12.5003V7.50033C17.7096 3.65866 16.343 2.29199 12.5013 2.29199H7.5013Z" fill="#121212"/></svg>;
const CurrencyIcon = () => <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M11.1648 14.5167H9.07318C7.70651 14.5167 6.59818 13.3667 6.59818 11.9501C6.59818 11.6084 6.88151 11.3251 7.22318 11.3251C7.56484 11.3251 7.84818 11.6084 7.84818 11.9501C7.84818 12.6751 8.39818 13.2667 9.07318 13.2667H11.1648C11.7065 13.2667 12.1565 12.7834 12.1565 12.2001C12.1565 11.4751 11.8982 11.3334 11.4732 11.1834L8.11484 10.0001C7.46484 9.77507 6.58984 9.29173 6.58984 7.80007C6.58984 6.51673 7.59818 5.4834 8.83151 5.4834H10.9232C12.2898 5.4834 13.3982 6.6334 13.3982 8.05007C13.3982 8.39173 13.1148 8.67507 12.7732 8.67507C12.4315 8.67507 12.1482 8.39173 12.1482 8.05007C12.1482 7.32507 11.5982 6.7334 10.9232 6.7334H8.83151C8.28984 6.7334 7.83984 7.21673 7.83984 7.80007C7.83984 8.52506 8.09818 8.66673 8.52318 8.81673L11.8815 10.0001C12.5315 10.2251 13.4065 10.7084 13.4065 12.2001C13.3982 13.4751 12.3982 14.5167 11.1648 14.5167Z" fill="#121212"/><path d="M10 15.625C9.65833 15.625 9.375 15.3417 9.375 15V5C9.375 4.65833 9.65833 4.375 10 4.375C10.3417 4.375 10.625 4.65833 10.625 5V15C10.625 15.3417 10.3417 15.625 10 15.625Z" fill="#121212"/><path d="M10.0013 18.9587C5.05964 18.9587 1.04297 14.942 1.04297 10.0003C1.04297 5.05866 5.05964 1.04199 10.0013 1.04199C14.943 1.04199 18.9596 5.05866 18.9596 10.0003C18.9596 14.942 14.943 18.9587 10.0013 18.9587ZM10.0013 2.29199C5.7513 2.29199 2.29297 5.75033 2.29297 10.0003C2.29297 14.2503 5.7513 17.7087 10.0013 17.7087C14.2513 17.7087 17.7096 14.2503 17.7096 10.0003C17.7096 5.75033 14.2513 2.29199 10.0013 2.29199Z" fill="#121212"/></svg>;
const CalendarIcon = () => <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M6.66797 1.66699V4.16699" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.332 1.66699V4.16699" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.3333 2.91699C16.1083 3.06699 17.5 4.12533 17.5 8.04199V13.192C17.5 16.6253 16.6667 18.342 12.5 18.342H7.5C3.33333 18.342 2.5 16.6253 2.5 13.192V8.04199C2.5 4.12533 3.89167 3.07533 6.66667 2.91699H13.3333Z" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.2904 14.667H2.70703" stroke="#121212" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.0013 6.875C8.9763 6.875 8.10964 7.43333 8.10964 8.51667C8.10964 9.03333 8.3513 9.425 8.71797 9.675C8.20964 9.975 7.91797 10.4583 7.91797 11.025C7.91797 12.0583 8.70964 12.7 10.0013 12.7C11.2846 12.7 12.0846 12.0583 12.0846 11.025C12.0846 10.4583 11.793 9.96667 11.2763 9.675C11.6513 9.41667 11.8846 9.03333 11.8846 8.51667C11.8846 7.43333 11.0263 6.875 10.0013 6.875ZM10.0013 9.24167C9.56797 9.24167 9.2513 8.98333 9.2513 8.575C9.2513 8.15833 9.56797 7.91667 10.0013 7.91667C10.4346 7.91667 10.7513 8.15833 10.7513 8.575C10.7513 8.98333 10.4346 9.24167 10.0013 9.24167ZM10.0013 11.6667C9.4513 11.6667 9.0513 11.3917 9.0513 10.8917C9.0513 10.3917 9.4513 10.125 10.0013 10.125C10.5513 10.125 10.9513 10.4 10.9513 10.8917C10.9513 11.3917 10.5513 11.6667 10.0013 11.6667Z" fill="#121212"/></svg>;

const detailRows = [
  { icon: <AddressIcon />, label: "ADDRESS",       key: "address" },
  { icon: <CityIcon />,    label: "CITY",          key: "city" },
  { icon: <StateIcon />,   label: "STATE",         key: "state" },
  { icon: <CountryIcon />, label: "COUNTRY",       key: "country" },
  { icon: <LanguageIcon />,label: "LANGUAGE",      key: "language" },
  { icon: <CurrencyIcon />,label: "HOME CURRENCY", key: "home_currency" },
  { icon: <CalendarIcon />,label: "JOINED",        key: "joined" },
];

export default function UserDetails() {
  const router = useRouter();
  const params = useParams();
  const uuid = params?.id as string;
  const found = allUsers.find((u) => u.id === uuid);
  const user: UserDetail = found ?? dummyUser;
  const [isBlocked, setIsBlocked] = useState(user.is_blocked);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const experiences = dummyExperiences;
  const initials = getInitials(user.first_name, user.last_name);
  const avatarColor = getAvatarColor(user.first_name);
  const isDeleted = user.is_deleted;
  const status = isDeleted ? "DELETED" : isBlocked ? "BLOCKED" : user.is_active ? "ACTIVE" : "INACTIVE";
  const statusColor = isDeleted ? "#94A3B8" : isBlocked ? "#EF4444" : user.is_active ? "#16A34A" : "#94A3B8";
  const statusBg = isDeleted ? "#F8FAFC" : isBlocked ? "#FEF2F2" : user.is_active ? "#F0FDF4" : "#F8FAFC";

  return (
    <div style={{ padding: "2vh 2.2vw", height: "100%", boxSizing: "border-box" as const, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "rgba(243, 243, 243, 1)" }}>

      {/* Top Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2vh", flexShrink: 0 }}>
        {/* Back */}
        <button
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: "0.5vw", background: "none", border: "none", cursor: "pointer", fontSize: "0.95vw", fontWeight: 500, color: "#1C1B17" }}
        >
          <svg style={{ width: "1.1vw", height: "1.1vw" }} viewBox="0 0 24 24" fill="none" stroke="#1C1B17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Users
        </button>

        {/* Actions */}
        <div style={{ display: "flex", gap: "0.8vw" }}>
          <button
            onClick={() => isDeleted ? undefined : isBlocked ? setIsBlocked(false) : setShowBlockModal(true)}
            style={{ display: "flex", alignItems: "center", gap: "0.5vw", padding: "1.2vh 1.2vw", borderRadius: "2vw", border: "1px solid #E2E8F0", background: isDeleted ? "#fff" : isBlocked ? "rgba(0, 0, 0, 0.1)" : "#fff", fontSize: "0.9vw", fontWeight: 600, color: "#1C1B17", cursor: isDeleted ? "not-allowed" : "pointer" }}>
            <svg style={{ width: "1.2vw", height: "1.2vw" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.418 20.9587H9.58464C8.84297 20.9587 7.89297 20.567 7.3763 20.042L3.95964 16.6253C3.43464 16.1003 3.04297 15.1503 3.04297 14.417V9.58366C3.04297 8.842 3.43464 7.892 3.95964 7.37534L7.3763 3.95866C7.9013 3.43366 8.85131 3.04199 9.58464 3.04199H14.418C15.1596 3.04199 16.1096 3.43366 16.6263 3.95866L20.043 7.37534C20.568 7.90034 20.9596 8.85033 20.9596 9.58366V14.417C20.9596 15.1587 20.568 16.1086 20.043 16.6253L16.6263 20.042C16.1013 20.567 15.1596 20.9587 14.418 20.9587ZM9.58464 4.29199C9.17631 4.29199 8.54296 4.55033 8.25963 4.842L4.84297 8.25867C4.55964 8.55033 4.29297 9.17533 4.29297 9.58366V14.417C4.29297 14.8253 4.55131 15.4587 4.84297 15.742L8.25963 19.1587C8.5513 19.442 9.17631 19.7087 9.58464 19.7087H14.418C14.8263 19.7087 15.4596 19.4503 15.743 19.1587L19.1596 15.742C19.443 15.4503 19.7096 14.8253 19.7096 14.417V9.58366C19.7096 9.17533 19.4513 8.542 19.1596 8.25867L15.743 4.842C15.4513 4.55866 14.8263 4.29199 14.418 4.29199H9.58464Z" fill="#1C1B17"/>
              <path d="M6.1151 18.5254C5.95677 18.5254 5.79844 18.467 5.67344 18.342C5.43177 18.1004 5.43177 17.7004 5.67344 17.4587L17.4568 5.67539C17.6984 5.43372 18.0984 5.43372 18.3401 5.67539C18.5818 5.91706 18.5818 6.31706 18.3401 6.55872L6.55677 18.342C6.43177 18.467 6.27344 18.5254 6.1151 18.5254Z" fill="#1C1B17"/>
            </svg>
            {isBlocked ? "Unblock" : "Block"}
          </button>
          <button onClick={() => isDeleted ? undefined : setShowDeleteModal(true)} style={{ display: "flex", alignItems: "center", gap: "0.5vw", padding: "1.2vh 1.2vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "0.9vw", fontWeight: 600, color: "#fff", cursor: isDeleted ? "not-allowed" : "pointer" }}>
            <svg style={{ width: "1.2vw", height: "1.2vw" }} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            {isDeleted ? "Deleted" : "Delete"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: "1.5vw", flex: 1, minHeight: 0 }}>

        {/* Left Panel */}
        <div style={{ width: "30%", backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "24px", border: "1px solid #F1F5F9", padding: "2.5vh 1.5vw", flexShrink: 0, overflowY: "auto", alignSelf: "flex-start" }}>
          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2.5vh" }}>
            <div style={{ width: "6vw", height: "6vw", borderRadius: "50%", backgroundColor: avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2vw", fontWeight: 700, color: "#fff", marginBottom: "1.2vh" }}>
              {initials}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6vw", marginBottom: "0.5vh" }}>
              <p style={{ fontSize: "1.2vw", fontWeight: 700, color: "#1C1B17" }}>
                {user.first_name} {user.last_name}
              </p>
              <span style={{ fontSize: "0.7vw", fontWeight: 600, color: statusColor, backgroundColor: statusBg, padding: "0.6vh 0.6vw", borderRadius: "2vw", border: `1px solid ${statusColor}` }}>
                {status}
              </span>
            </div>
            <p style={{ fontSize: "0.85vw", color: "#94A3B8" }}>{user.email}</p>
          </div>

          {/* Detail Rows */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {detailRows.map((row, i) => (
              <div key={row.key}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6vh 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
                    <span style={{ fontSize: "0.9vw" }}>{row.icon}</span>
                    <span style={{ fontSize: "0.75vw", fontWeight: 500, color: "#94A3B8", letterSpacing: "0.05em" }}>{row.label}</span>
                  </div>
                  <span style={{ fontSize: "0.85vw", fontWeight: 600, color: "#1C1B17" }}>
                    {(user as any)[row.key] || "-"}
                  </span>
                </div>
                {i < detailRows.length - 1 && <div style={{ height: "1px", backgroundColor: "#F1F5F9" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, backgroundColor: (isBlocked || isDeleted) ? "rgb(231, 231, 231)" : "#fff", borderRadius: "24px", border: "1px solid #F1F5F9", padding: "2.5vh 1.5vw", overflowY: "auto" }}>
          <h2 style={{ fontSize: "1.4vw", fontWeight: 600, color: "#1C1B17", marginBottom: "2vh" }}>
            Experiences ({experiences.length})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            {experiences.map((exp, i) => (
              <div key={exp.id}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1vh",paddingBottom:"" }}>
                  <p style={{ fontSize: "1.1vw", fontWeight: 600, color: "#1C1B17" }}>{exp.title}</p>
                  <p style={{ fontSize: "0.8vw", color: "#94A3B8" }}>{exp.date}</p>
                </div>

                {/* Stars */}
                <div style={{ marginBottom: "0.8vh" }}>
                  <StarRating rating={exp.rating} />
                </div>

                {/* Description */}
                <p style={{ fontSize: "0.85vw", color: "#475569", lineHeight: 1.6, marginBottom: "1vh" }}>
                  {exp.description}
                </p>

                {/* Images */}
                {exp.images.length > 0 && (
                  <div style={{ display: "flex", gap: "0.8vw" }}>
                    {exp.images.map((img, idx) => (
                      <img key={idx} src={img} alt="experience" style={{ width: "8vw", height: "6vw", borderRadius: "0.8vw", objectFit: "cover" }} />
                    ))}
                  </div>
                )}

                {/* Placeholder images when no real images */}
                {exp.images.length === 0 && (
                  <div style={{ display: "flex", gap: "0.8vw" }}>
                    {[1, 2].map((n) => (
                      <div key={n} style={{ width: "8vw", height: "6vw", borderRadius: "0.8vw", backgroundColor: "#F1F5F9" }} />
                    ))}
                  </div>
                )}

                {i < experiences.length - 1 && <div style={{ height: "1px", backgroundColor: "#F1F5F9", marginTop: "2.5vh" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "5vh 2vw 4vh", width: "22vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>

            {/* Icon */}
            <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5vh" }}>
             <svg style={{ width: "2.2vw", height: "2.2vw" }} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2274_17800)">
                  <path d="M18.8359 14.3743V14.5827H22.1693V14.3743C22.1693 13.9323 21.9937 13.5084 21.6811 13.1958C21.3686 12.8833 20.9446 12.7077 20.5026 12.7077C20.0606 12.7077 19.6367 12.8833 19.3241 13.1958C19.0115 13.5084 18.8359 13.9323 18.8359 14.3743ZM17.7943 14.5827V14.3743C17.7943 13.6561 18.0796 12.9672 18.5875 12.4593C19.0954 11.9514 19.7843 11.666 20.5026 11.666C21.2209 11.666 21.9098 11.9514 22.4177 12.4593C22.9256 12.9672 23.2109 13.6561 23.2109 14.3743V14.5827H27.8984C28.0366 14.5827 28.169 14.6376 28.2667 14.7352C28.3644 14.8329 28.4193 14.9654 28.4193 15.1035C28.4193 15.2416 28.3644 15.3741 28.2667 15.4718C28.169 15.5695 28.0366 15.6243 27.8984 15.6243H26.683L25.8497 25.5643C25.7864 26.3192 25.4418 27.0227 24.8842 27.5354C24.3266 28.0482 23.5968 28.3327 22.8393 28.3327H18.1659C17.4085 28.3326 16.6788 28.048 16.1213 27.5353C15.5638 27.0226 15.2192 26.3191 15.1559 25.5643L14.3226 15.6243H13.1068C12.9686 15.6243 12.8362 15.5695 12.7385 15.4718C12.6408 15.3741 12.5859 15.2416 12.5859 15.1035C12.5859 14.9654 12.6408 14.8329 12.7385 14.7352C12.8362 14.6376 12.9686 14.5827 13.1068 14.5827H17.7943ZM16.1939 25.4773C16.2353 25.9718 16.4611 26.4327 16.8263 26.7686C17.1916 27.1045 17.6697 27.291 18.1659 27.291H22.8393C23.3356 27.2911 23.8138 27.1047 24.1792 26.7687C24.5445 26.4328 24.7703 25.9718 24.8118 25.4773L25.6376 15.6243H15.3676L16.1939 25.4773ZM19.4609 18.4368C19.4609 18.3685 19.4475 18.3007 19.4213 18.2375C19.3951 18.1743 19.3568 18.1169 19.3084 18.0686C19.26 18.0202 19.2026 17.9818 19.1394 17.9557C19.0762 17.9295 19.0085 17.916 18.9401 17.916C18.8717 17.916 18.804 17.9295 18.7408 17.9557C18.6776 17.9818 18.6202 18.0202 18.5718 18.0686C18.5235 18.1169 18.4851 18.1743 18.4589 18.2375C18.4327 18.3007 18.4193 18.3685 18.4193 18.4368V24.4785C18.4193 24.5469 18.4327 24.6146 18.4589 24.6778C18.4851 24.741 18.5235 24.7984 18.5718 24.8468C18.6202 24.8952 18.6776 24.9335 18.7408 24.9597C18.804 24.9859 18.8717 24.9993 18.9401 24.9993C19.0085 24.9993 19.0762 24.9859 19.1394 24.9597C19.2026 24.9335 19.26 24.8952 19.3084 24.8468C19.3568 24.7984 19.3951 24.741 19.4213 24.6778C19.4475 24.6146 19.4609 24.5469 19.4609 24.4785V18.4368ZM22.0651 17.916C22.3526 17.916 22.5859 18.1493 22.5859 18.4368V24.4785C22.5859 24.6166 22.5311 24.7491 22.4334 24.8468C22.3357 24.9445 22.2032 24.9993 22.0651 24.9993C21.927 24.9993 21.7945 24.9445 21.6968 24.8468C21.5991 24.7491 21.5443 24.6166 21.5443 24.4785V18.4368C21.5443 18.1493 21.7776 17.916 22.0651 17.916Z" fill="#FF4444"/>
                </g>
                <path d="M15.0026 36.6663H25.0026C33.3359 36.6663 36.6693 33.333 36.6693 24.9997V14.9997C36.6693 6.66634 33.3359 3.33301 25.0026 3.33301H15.0026C6.66927 3.33301 3.33594 6.66634 3.33594 14.9997V24.9997C3.33594 33.333 6.66927 36.6663 15.0026 36.6663Z" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <clipPath id="clip0_2274_17800">
                    <rect width="20" height="20" fill="white" transform="translate(10.5 10)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Text */}
            <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
              Are you sure you want to Delete<br />this user?
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDeleteModal(false); router.back(); }}
                style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Confirmation Modal */}
      {showBlockModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "5vh 2vw 4vh", width: "22vw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5vh" }}>

            {/* Icon */}
            <div style={{ width: "3.5vw", height: "3.5vw", borderRadius: "50%", backgroundColor: "#fff", boxShadow: "0px 0px 8px 2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.5vh" }}>
              <svg style={{ width: "2.2vw", height: "2.2vw" }} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5104 27.4657H18.4826C17.8646 27.4657 17.0729 27.1393 16.6424 26.7018L13.7951 23.8546C13.3576 23.4171 13.0312 22.6254 13.0312 22.0143V17.9865C13.0312 17.3685 13.3576 16.5768 13.7951 16.1463L16.6424 13.299C17.0799 12.8615 17.8715 12.5352 18.4826 12.5352H22.5104C23.1285 12.5352 23.9201 12.8615 24.3507 13.299L27.1979 16.1463C27.6354 16.5838 27.9618 17.3754 27.9618 17.9865V22.0143C27.9618 22.6324 27.6354 23.424 27.1979 23.8546L24.3507 26.7018C23.9132 27.1393 23.1285 27.4657 22.5104 27.4657ZM18.4826 13.5768C18.1424 13.5768 17.6146 13.7921 17.3785 14.0352L14.5313 16.8824C14.2951 17.1254 14.0729 17.6463 14.0729 17.9865V22.0143C14.0729 22.3546 14.2882 22.8824 14.5313 23.1185L17.3785 25.9657C17.6215 26.2018 18.1424 26.424 18.4826 26.424H22.5104C22.8507 26.424 23.3785 26.2088 23.6146 25.9657L26.4618 23.1185C26.6979 22.8754 26.9201 22.3546 26.9201 22.0143V17.9865C26.9201 17.6463 26.7049 17.1185 26.4618 16.8824L23.6146 14.0352C23.3715 13.799 22.8507 13.5768 22.5104 13.5768H18.4826Z" fill="#FF4444"/>
                <path d="M15.5972 25.4375C15.4653 25.4375 15.3333 25.3889 15.2292 25.2847C15.0278 25.0833 15.0278 24.75 15.2292 24.5486L25.0486 14.7292C25.25 14.5278 25.5833 14.5278 25.7847 14.7292C25.9861 14.9306 25.9861 15.2639 25.7847 15.4653L15.9653 25.2847C15.8611 25.3889 15.7292 25.4375 15.5972 25.4375Z" fill="#FF4444"/>
                <path d="M15.0026 36.6663H25.0026C33.3359 36.6663 36.6693 33.333 36.6693 24.9997V14.9997C36.6693 6.66634 33.3359 3.33301 25.0026 3.33301H15.0026C6.66927 3.33301 3.33594 6.66634 3.33594 14.9997V24.9997C3.33594 33.333 6.66927 36.6663 15.0026 36.6663Z" stroke="#FF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Text */}
            <p style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(107, 114, 128, 1)", textAlign: "center", lineHeight: 1.5, margin: 0, paddingBottom: "2.5vh", fontFamily: "Poppins" }}>
              Are you sure you want to Block<br />this user?
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "1vw", width: "100%", marginTop: "0.5vh" }}>
              <button
                onClick={() => setShowBlockModal(false)}
                style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "1px solid rgba(255, 68, 68, 1)", background: "#fff", fontSize: "1vw", fontWeight: 500, color: "rgba(255, 68, 68, 1)", cursor: "pointer", fontFamily: "Poppins" }}
              >
                Cancel
              </button>
              <button
                onClick={() => { setIsBlocked(true); setShowBlockModal(false); }}
                style={{ flex: 1, padding: "1.2vh 1vw", borderRadius: "2vw", border: "none", background: "rgba(255, 68, 68, 1)", fontSize: "1vw", fontWeight: 500, color: "#fff", cursor: "pointer", fontFamily: "Poppins" }}
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
