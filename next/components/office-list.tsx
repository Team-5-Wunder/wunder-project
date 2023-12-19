const officeLocations = [
  {
    city: "Helsinki",
    address: "Kalevankatu 30",
    zip: "00100 Helsinki",
    country: "Finland",
    email: "fi.sales@wunder.io",
  },
  {
    city: "Turku",
    address: "Aurakatu 8",
    zip: "20100 Turku",
    country: "Finland",
    email: "fi.sales@wunder.io",
  },
  {
    city: "Tallinn",
    address: "Valukoja 8",
    zip: "11415 Tallinn",
    country: "Estonia",
    email: "ee.sales@wunder.io",
  },
  {
    city: "Valmiera",
    address: "L.Paegles iela 47",
    zip: "Valmiera, LV-4201",
    country: "Latvia",
    email: "lv.sales@wunder.io",
  },
  {
    city: "Riga",
    address: "Z.A. Meierovica bulvāris 16",
    zip: "Riga, LV-1050",
    country: "Latvia",
    email: "lv.sales@wunder.io",
  },
];
export const OfficesList = () => (
  <div className="mx-14 px-14 mb-10 grid md:grid-cols-3 gap-4">
    {officeLocations.map((location, index) => (
      <div key={index} className="p-4 rounded">
        <h3 className="text-xl font-bold">{location.city}</h3>
        <p>{location.address}</p>
        <p>{location.zip}</p>
        <p>{location.country}</p>
        <a
          href={`mailto:${location.email}`}
          className="text-primary-600 hover:underline"
        >
          {location.email}
        </a>
      </div>
    ))}
  </div>
);
