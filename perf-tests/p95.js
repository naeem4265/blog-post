import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // number of virtual users
  duration: '30s', // test duration
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {
  // Test GET /tasks
  const getTasksRes = http.get('http://localhost:5000/tasks');
  check(getTasksRes, {
    'GET /tasks status is 200': (r) => r.status === 200,
  });

  // Test POST /tasks
  const payload = JSON.stringify({
    title: 'k6 test task',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const postTaskRes = http.post('http://localhost:5000/tasks', payload, params);
  check(postTaskRes, {
    'POST /tasks status is 201': (r) => r.status === 201,
  });

  // Add a small delay between iterations
  sleep(1);
}
