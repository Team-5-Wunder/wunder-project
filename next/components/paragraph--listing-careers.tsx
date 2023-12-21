import { CareersListing } from "@/components/careers-listing";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { ListingCareers } from "@/lib/zod/paragraph";

export function ParagraphListingCareers({
  paragraph,
}: {
  paragraph: ListingCareers;
}) {
  return (
    <div className="">
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <CareersListing listingId={paragraph.id} />
    </div>
  );
}
