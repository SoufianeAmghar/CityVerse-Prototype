import axios from "axios";

export const bikeApi = () => {
  let data = [];
  axios
    .get(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?where=%22Paris%22&limit=100"
    )
    .then((value) => {
      data = value;
    })
    .catch((err) => {});

  return data;
};
