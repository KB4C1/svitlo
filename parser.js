export async function parseByQueue(queue) {
  const url = `https://be-svitlo.oe.if.ua/schedule-by-queue?queue=${encodeURIComponent(queue)}`;
  const res = await fetch(url);
  return res.json();
}

export async function parseByAddress(address) {
  if (!address.includes("Івано-Франківськ")) {
    address = `Івано-Франківськ,${address}`;
  }

  const url = `https://be-svitlo.oe.if.ua/schedule-by-search`;

  const data = new URLSearchParams({
    accountNumber: "",
    userSearchChoice: "pob",
    address: address
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Accept": "application/json, text/plain, */*",
    "Origin": "https://svitlo.oe.if.ua",
    "Referer": "https://svitlo.oe.if.ua/"
  };

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: data.toString()
  });

  return await res.json();
}
