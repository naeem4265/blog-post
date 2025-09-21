import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 10,         // 10 virtual users
  duration: "10s", // run for 10 seconds
  thresholds: {
    http_req_duration: ["p(95)<200"], // P95 < 200ms
  },
};

export default function () {
  const res = http.get("http://localhost:5000/health");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
