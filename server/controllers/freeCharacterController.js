import axios from "axios";

export const freeCharacter = async (req, res) => {
  const free = await getFreeCharacter();

  res.send(free);
};

const getFreeCharacter = async () => {
  const res = await axios({
    rejectUnauthorized: false,
    method: "get",
    url: encodeURI("https://open-api.bser.io/v1/freeCharacters/2"),
    headers: {
      accept: "application/json",
      "x-api-key": process.env.Eternal_Return_API_KEY,
    },
  });

  return res.data.freeCharacters;
};
