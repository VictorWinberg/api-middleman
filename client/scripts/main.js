require(["globals", "helpers"], (globals, helpers) => {
  main(helpers);
});

const main = async ({ request, response }) => {
  let res;
  let fd;
  // Example code below
  res = await request("https://foaas.com/horse/victor", {
    headers: {
      Accept: "application/json"
    }
  });
  const { message } = await res.json();
  response("FOOASS of the Day", message);

  fd = new FormData();
  fd.append("locate", "Spolegatan 13, Lund");
  fd.append("geoit", "JSON");
  res = await request("https://geocode.xyz/", {
    method: "POST",
    body: fd
  });
  const json = await res.text();
  console.log(json);
};
