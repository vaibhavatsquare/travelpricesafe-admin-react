import AddVenue from "@/modules/venue/addVenue";

// Mock — replace with real API fetch using params.id
const mockVenueData = {
  venueName: "The Hudson Restaurant",
  phone: "+1 234 567 8900",
  description: "the atmosphere here is unmatched. we had the golden hour tasting and every course was a masterpiece.",
  avgPrice: "25",
  scheduled: "09:00 – 23:00",
  category: "Restaurant",
  currency: "USD – US Dollar",
  website: "www.thehudson.com",
  address: "1250 Market Street, Apt 8B",
  images: [],
};

export default function EditVenuePage({ params }: { params: { id: string } }) {
  return <AddVenue isEdit={true} initialData={mockVenueData} />;
}