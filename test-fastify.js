import http from "k6/http";
export const options = {
  vus: 1000,
  duration: "5s",
};
export default function () {
  http.get("http://103.186.1.74:3001");
}
