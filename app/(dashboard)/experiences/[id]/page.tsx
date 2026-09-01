import ExperienceDetail from "@/modules/experiences/experienceDetail";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
}

export default async function ExperienceDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { status } = await searchParams;
  return <ExperienceDetail id={id} status={status} />;
}