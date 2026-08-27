import DealDetails from "../../../../src/modules/deals/dealDetails";

export default async function DealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <DealDetails params={resolvedParams} />;
}