import React from "react";

const Footer = () => {
  const support = [
    "Help Center",
    "Get help with a safety issue",
    "AirCover",
    "Anti-discrimination",
    "Disability support",
    "Cancellation options",
    "Report neighborhood concern",
  ];
  const hosting = [
    "Airbnb your home",
    "AirCover for Hosts",
    "Hosting resources",
    "Community forum",
    "Hosting responsibly",
    "Airbnb-friendly apartments",
    "Join a free Hosting class",
  ];
  const airbnb = [
    "Newsroom",
    "New features",
    "Careers",
    "Investors",
    "Gift cards",
    "Airbnb.org emergency stays",
  ];

  return (
    <div className="bg-gray-100 border-t flex flex-col md:flex-row py-10 px-36 justify-center gap-20 ">
      <div className="flex flex-col gap-2 ">
        <h1 className="font-semibold">Support</h1>
        {support &&
          support.map((sup, index) => <div className="opacity-70">{sup}</div>)}
      </div>
      <div className="flex flex-col gap-2 ">
        <h1 className="font-semibold">Hosting</h1>
        {hosting &&
          hosting.map((host, index) => (
            <div className="opacity-70">{host}</div>
          ))}
      </div>
      <div className="flex flex-col gap-2 ">
        <h1 className="font-semibold">Extras</h1>
        {airbnb &&
          airbnb.map((air, index) => <div className="opacity-70">{air}</div>)}
      </div>
    </div>
  );
};

export default Footer;
