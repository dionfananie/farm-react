import { sleep } from "k6";
import http from "k6/http";
export const options = {
  stages: [
    { duration: "2s", target: 10 },
    { duration: "10s", target: 100 },
    { duration: "20s", target: 250 },
    { duration: "30s", target: 650 },
  ],
};
export default function () {
  http.get("http://103.186.1.74:3000/");
  sleep(1);
}
