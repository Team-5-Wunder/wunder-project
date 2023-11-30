import { useTranslation } from "next-i18next";
import { Divider } from "@/ui/divider";

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
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/finavia_logo.svg" alt="Finavia" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/sanoma-logo-new-300x108.webp" alt="Sanoma" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/tikkurila.webp" alt="Tikkurila" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/traficom_logo_eng.svg" alt="Traficom" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/nelonen_media_logo.svg" alt="Nelonen media" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/omnia-logo-grey-300x96.webp" alt="Omnia" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/fortum_logo_grey.svg" alt="Fortum" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/tapio-logo-new-300x86.webp" alt="Tapio" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/hus-logo-grey_.svg" alt="HUS" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/trimbler_grey.svg" alt="Trimbler" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/university-of-helsinki-logo-300x80.webp" alt="University of Helsinki" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/luke-new-logo.webp" alt="Luke" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/nimeton-suunn.webp" alt="Turko Abo" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/latvian_ministry_of_defence_logo.svg" alt="Latvian MOD" />
              <img className="max-h-[70%] max-w-[80%]" src="/assets/logos/national_library_fi_logo.webp" alt="National library" />
          </div>
          <Divider className="w-full max-w-4xl" />
        </div>
       
      </div>
    </div>
  );
};

export default OurClients;
