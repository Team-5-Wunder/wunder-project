import Image from "next/image";

const OurClients = () => {
  return (
    <>
      <div className="flex justify-end">
        <svg
          width="80"
          height="33"
          viewBox="0 0 80 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M40 33L0.162827 0.75L79.8372 0.75L40 33Z" fill="#FEAD2C" />
        </svg>
      </div>

      <Image src="/Clients1.png" width={1200} height={700} alt="clients" />
    </>
  );
};

export default OurClients;
