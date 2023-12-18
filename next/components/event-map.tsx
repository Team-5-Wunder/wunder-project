import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { LoadingSpinner } from "./loading-spinner";

export type Place = {
  address: string;
  latitude?: number;
  longitude?: number;
};

const geocodeAddress = async (address: string) => {
  try {
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    return { lat, lng };
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
export const EventMap = ({ address }: { address: string }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGeocode = async () => {
      setIsLoading(true);
      const coords = await geocodeAddress(address);
      if (coords) {
        setLocation(coords);
      }
      setIsLoading(false);
    };

    if (address) {
      fetchGeocode();
    }
  }, [address]);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
      gestureHandling: "none",
    }),
    [],
  );
  const libraries = useMemo(() => ["places"], []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div>
      <GoogleMap
        options={mapOptions}
        zoom={15} // Adjust zoom level as needed
        center={location} // Center the map to the geocoded location
        mapContainerClassName="h-96 w-full rounded-xl shadow-xl relative"
      >
        <MarkerF position={location} /> {/* Marker for the geocoded location */}
      </GoogleMap>
    </div>
  );
};

export default EventMap;
