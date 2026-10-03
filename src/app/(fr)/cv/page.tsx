import { CvView, cvMetadata } from "@/components/cv/CvView";

export const metadata = cvMetadata("fr");

export default function Page() {
  return <CvView locale="fr" />;
}
