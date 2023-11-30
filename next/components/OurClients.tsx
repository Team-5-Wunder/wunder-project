import { useTranslation } from "next-i18next";
import { Divider } from "@/ui/divider";
import Link from "next/link";

const OurClients = () => {
  const { t } = useTranslation();

  // Intersection Observer callback function
  const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the animation class when the element is in view
            entry.target.classList.add('animate-[slideUp_0.5s_ease-in_forwards]');
            observer.unobserve(entry.target);
        }
    });
  };

  // Create an Intersection Observer
  let observer = null;
  if (typeof window !== "undefined"){
    observer = new IntersectionObserver(handleIntersection);
    // Target the element to be animated
    const animatedLogosBox = document.getElementById('logosBox');
    // Observe the target element
    if (animatedLogosBox) observer.observe(animatedLogosBox);
  }

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full max-w-[1664px] mt-20 px-6 sm:px-16 flex flex-col">
        <h2 className="mb-10 text-primary-600 text-heading-lg font-bold">
        {t("our-clients")}
        </h2>
        <div id="logosBox" className="mt-20 opacity-0">
          <Divider className="w-full max-w-4xl" />
          <div className="w-full grid grid-cols-3 gap-8 md:grid-cols-4 md:gap-12 lg:grid-cols-5 lg:gap-16 items-center justify-items-center">
              <Link href="/clients/finavia" className="relative h-full w-full flex flex-col items-center justify-center group/finavia">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/finavia:grayscale-0" src="/assets/logos/finavia_logo_col.svg" alt="Finavia" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/finavia:w-[80%] group-hover/finavia:duration-200"></div>
              </Link>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/sanoma">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/sanoma:grayscale-0" src="/assets/logos/sanoma-logo-new-300x108.webp" alt="Sanoma" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/sanoma:w-[60%] group-hover/sanoma:duration-200"></div>
              </div>
              <Link href="/clients/tikkurila" className="relative h-full w-full flex flex-col items-center justify-center group/tikkurila">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/tikkurila:grayscale-0" src="/assets/logos/tikkurila.png" alt="Tikkurila" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/tikkurila:w-[80%] group-hover/tikkurila:duration-200"></div>
              </Link>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/traficom">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/traficom:grayscale-0" src="/assets/logos/traficom.png" alt="Traficom" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/traficom:w-[60%] group-hover/traficom:duration-200"></div>
              </div>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/nelonen">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/nelonen:grayscale-0" src="/assets/logos/nelonen.png" alt="Nelonen media" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/nelonen:w-[80%] group-hover/nelonen:duration-200"></div>
              </div>
              <Link href="/clients/fortum" className="relative h-full w-full flex flex-col items-center justify-center group/fortum">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/fortum:grayscale-0" src="/assets/logos/fortum_logo.svg" alt="Fortum" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/fortum:w-[80%] group-hover/fortum:duration-200"></div>
              </Link>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/omnia">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/omnia:grayscale-0" src="/assets/logos/omnia-logo-grey-300x96.webp" alt="Omnia" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/omnia:w-[60%] group-hover/omnia:duration-200"></div>
              </div>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/tapio">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/tapio:grayscale-0" src="/assets/logos/tapio.png" alt="Tapio" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/tapio:w-[70%] group-hover/tapio:duration-200"></div>
              </div>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/university">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/university:grayscale-0" src="/assets/logos/university-of-helsinki-logo-300x80.webp" alt="University of Helsinki" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/university:w-[70%] group-hover/university:duration-200"></div>
              </div>
              <Link href="/clients/trimble" className="relative h-full w-full flex flex-col items-center justify-center group/trimble">
                <img className="max-h-[70%] max-w-[80%] grayscale group-hover/trimble:grayscale-0" src="/assets/logos/trimble.svg" alt="Trimble" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/trimble:w-[80%] group-hover/trimble:duration-200"></div>
              </Link>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/hus">
                <img className="max-h-[60%] max-w-[60%] grayscale group-hover/hus:grayscale-0" src="/assets/logos/hus-logo.png" alt="HUS" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/hus:w-[60%] group-hover/hus:duration-200"></div>
              </div>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/luke">
                <img className="max-h-[60%] max-w-[60%] grayscale group-hover/luke:grayscale-0" src="/assets/logos/luke.png" alt="Luke" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/luke:w-[50%] group-hover/luke:duration-200"></div>
              </div>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/turku">
                <img className="max-h-[60%] max-w-[60%] grayscale group-hover/turku:grayscale-0" src="/assets/logos/turku.png" alt="Turko Abo" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/turku:w-[60%] group-hover/turku:duration-200"></div>
              </div>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/lat">
                <img className="max-h-[60%] max-w-[60%] grayscale group-hover/lat:grayscale-0" src="/assets/logos/logo_lat_v_1_0.png" alt="Latvian MOD" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/lat:w-[50%] group-hover/lat:duration-200"></div>
              </div>
              <div className="relative h-full w-full flex flex-col items-center justify-center group/library">
                <img className="max-h-[60%] max-w-[60%] grayscale group-hover/library:grayscale-0" src="/assets/logos/national_library_fi_logo.webp" alt="National library" />
                <div className="absolute bottom-0 h-0.5 w-0 bg-primary-600 transition-width ease-in-out group-hover/library:w-[60%] group-hover/library:duration-200"></div>
              </div>
          </div>
          <Divider className="w-full max-w-4xl" />
        </div>
       
      </div>
    </div>
  );
};

export default OurClients;
