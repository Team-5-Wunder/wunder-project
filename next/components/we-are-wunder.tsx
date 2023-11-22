import Link from "next/link";


const WeAreWunder = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="h-[30vh] max-w-screen-2xl flex mt-20 px-16">
        <div className="w-1/2 text-primary-600 text-heading-lg font-bold">
          We are Wunder
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="mb-4 text-steelgray text-md">
            Our mission is to bring people together and shape the way digital services are used in everyday life. We help our clients to improve their digital business, competitiveness and customer experience.
          </div>
          <Link href="/cases">
            <div className="mt-6 flex text-primary-600">
              <div className="">
                Get to know us
              </div>
              <div className="ml-4">
                &#9654;
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeAreWunder;