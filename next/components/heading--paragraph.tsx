export function HeadingParagraph({ children }: { children: string }) {
  return (
    <h2 className="text-left mb-3 md:mb-5 text-primary-600 font-overpass font-bold text-heading-sm md:text-heading-md">
      {children}
    </h2>
  );
}
