require(["globals", "helpers"], (globals, helpers) => {
  main(globals, helpers);
});

const main = async (globals, { request, response, test }) => {
  let res;
  let fd;

  res = await request("https://foaas.com/awesome/1", {
    headers: {
      Accept: "application/json"
    }
  });
  const { message } = await res.json();
  response("FOAAS", message);

  res = await request("https://breaking-bad-quotes.herokuapp.com/v1/quotes");
  const [{ quote }] = await res.json();
  response("Quote", quote);

  res = await test("whatever", {
    method: "POST",
    body: JSON.stringify({ address: "Spolegatan 13, Lund" }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const { address } = await res.json();
  response("Tracking address", address);

  fd = new FormData();
  fd.append("locate", address);
  fd.append("geoit", "JSON");
  res = await request("https://geocode.xyz/", {
    method: "POST",
    body: fd
  });

  const { latt, longt } = await res.json();
  response("Coordinates", "Lat: " + latt + ", Lng: " + longt);
};
