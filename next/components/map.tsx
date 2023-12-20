import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState, useRef, useEffect } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { LoadingSpinner } from "./loading-spinner";
import React from "react";

export type Place = {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
};

const geocodeAddress = async (address: string) => {
  try {
    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    return { lat, lng };
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

interface MapComponentProps {
  ref: string;
}

export const MapComponent = React.forwardRef<HTMLDivElement, MapComponentProps>(
  ({}, ref) => {
    const [locations, setLocations] = useState<Place[]>([
      {
        name: "Helsinki",
        address: "Kalevankatu 30, 00100 Helsinki",
      },
      {
        name: "Turku",
        address: "Aurakatu 8, 20100 Turku",
      },
      {
        name: "Tallinn Estonia",
        address: "Valukoja 8, 11415 Tallinn Estonia",
      },
      {
        name: "Latvia",
        address: "L.Paegles iela 47, Valmiera, LV-4201 Latvia",
      },
      {
        name: "Latvia",
        address: "Z.A. Meierovica bulvāris 16, Riga, LV-1050 Latvia",
      },
    ]);

    useEffect(() => {
      const geocodeAllLocations = async () => {
        const geocodedPlaces = await Promise.all(
          locations.map(async (location) => {
            if (location.latitude && location.longitude) {
              // If latitude and longitude are already provided, no need to geocode
              return location;
            } else {
              // Perform geocoding for locations without coordinates
              const coords = await geocodeAddress(location.address);
              return {
                ...location,
                latitude: coords?.lat,
                longitude: coords?.lng,
              };
            }
          }),
        );
        setLocations(geocodedPlaces);
      };

      geocodeAllLocations();
    }, [locations]);

    const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(
      undefined,
    );

    const libraries = useMemo(() => ["places"], []);
    const mapOptions = useMemo(
      () => ({
        disableDefaultUI: true,
        clickableIcons: true,
        scrollwheel: false,
        gestureHandling: "none",
      }),
      [],
    );

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries: libraries as any,
    });

    if (!isLoaded) return <LoadingSpinner />;

    return (
      <div ref={ref}>
        <div className="flex justify-center mb-14">
          <GoogleMap
            options={mapOptions}
            zoom={5}
            center={{
              lat: locations[0]?.latitude || 0,
              lng: locations[0]?.longitude || 0,
            }}
            mapContainerClassName="h-[800px] w-[1400px] rounded-xl shadow-xl relative"
          >
            {locations.map(
              (place, index) =>
                place.latitude !== undefined &&
                place.longitude !== undefined && (
                  <MarkerF
                    key={index}
                    position={{ lat: place.latitude, lng: place.longitude }}
                    onClick={() => setSelectedPlace(place)}
                  />
                ),
            )}
            {selectedPlace && (
              <InfoWindow
                position={{
                  lat: selectedPlace.latitude,
                  lng: selectedPlace.longitude,
                }}
                onCloseClick={() => setSelectedPlace(undefined)}
              >
                <div>
                  <h3>{selectedPlace.name}</h3>
                  <p>{selectedPlace.address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    );
  },
);
