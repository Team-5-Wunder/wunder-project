import { Media } from "@/components/media";

interface HeroProps {
  title: string;
  image: any;
}

export function Hero({ title, image }: HeroProps) {  
  return (
    <div className="w-screen h-[474.59px] relative">
      <div className="bg-primary-500 absolute top-0 left-0 w-screen h-[474.59px] z-10 opacity-70"></div>
      <h2
      className="font-bold text-white text-heading-sm md:text-heading-md lg:text-heading-lg z-20 absolute top-[200px] px-4 sm:px-16 lg:px-0"
      >
        {title}
      </h2>
      <Media
        media={image}
        priority={true}
        width={4000}
        height={4000}
        classname={"w-screen h-[474.59px] absolute top-0 left-0 z-0 object-cover"}
      />
    </div>
  );
}
