export function HeadingPage({ children }: { children: JSX.Element | string }) {
  return (
    <h1 className="ml-0 font-bold text-primary-600 text-heading-sm md:text-heading-md lg:text-heading-lg lg:ml-0">
      {children}
    </h1>
  );
}
