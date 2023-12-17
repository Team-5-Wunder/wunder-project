export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="text-left font-bold text-primary-600 text-heading-sm md:text-heading-md lg:text-heading-lg">
      {children}
    </h1>
  );
}
