const StaticMapComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_STATIC_API_KEY as string;
  const center = "40.714728,-73.998672" as string;
  const zoom = 14 as number;
  const size = "400x400" as string;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&key=${"AIzaSyBYJcPhxiocadzGCKLHLFubR6VZauaK8J4"}`;

  return (
    <div>
      <img src={mapUrl} alt="Google Static Map" />
    </div>
  );
};

export default StaticMapComponent;
