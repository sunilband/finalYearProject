const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const getRegisteredCamps = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "get-camps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      ...data,
    }),
  }).then((response) => response.json());
  return fetchedData;
};
