import React, { useEffect, useState } from "react";
import { PrivatePage } from "../components/common/PrivatePage";

const Rescrape = () => {
  const [successful, setSuccessful] = useState<"loading" | boolean>("loading");

  useEffect(() => {
    fetch("/api/admin/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "rescrape" }),
    }).then((res) => {
      if (res.ok) {
        setSuccessful(true);
      } else {
        setSuccessful(false);
      }
    });
  }, []);

  if (successful == "loading") return <div>Loading...</div>;
  if (successful == true) return <div>Yay</div>;

  return <div>Bad</div>;
};

const PrivateRescrape = () => (
  <PrivatePage>
    <Rescrape />
  </PrivatePage>
);

export default PrivateRescrape;
