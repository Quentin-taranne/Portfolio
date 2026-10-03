import { CvView, cvMetadata } from "@/components/cv/CvView";

export const metadata = cvMetadata("en");

export default function Page() {
  return <CvView locale="en" />;
}
