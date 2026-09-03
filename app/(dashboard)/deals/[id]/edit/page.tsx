import AddDeal from "@/modules/deals/addDeal";

type DealInitialData = {
  venue?: string;
  dealTitle?: string;
  description?: string;
  discount?: string;
  dealPrice?: string;
  currency?: string;
  images?: string[];
  startTime?: string;
  endTime?: string;
};

const mockDeals: Record<string, DealInitialData> = {
  "1": { venue: "Venue A", dealTitle: "Skyline Rooftop Bar", description: "the atmosphere here is unmatched.", discount: "10", dealPrice: "42", currency: "USD – US Dollar", startTime: "16:00", endTime: "19:00", images: [] },
  "2": { venue: "Venue B", dealTitle: "Skyline Rooftop Bar", description: "the atmosphere here is unmatched.", discount: "10", dealPrice: "42", currency: "USD – US Dollar", startTime: "16:00", endTime: "19:00", images: [] },
  "3": { venue: "Venue C", dealTitle: "Skyline Rooftop Bar", description: "the atmosphere here is unmatched.", discount: "10", dealPrice: "42", currency: "USD – US Dollar", startTime: "16:00", endTime: "19:00", images: [] },
};

export default async function EditDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialData: DealInitialData = mockDeals[id] ?? {};
  return <AddDeal isEdit={true} initialData={initialData} />;
}