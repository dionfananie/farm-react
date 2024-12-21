import http from "k6/http";
export const options = {
  vus: 100,
  duration: "5s",
};
export default function () {
  http.get("http://103.186.1.74:3000/");
}
