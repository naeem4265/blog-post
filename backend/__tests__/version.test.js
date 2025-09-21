import request from 'supertest';
import { app } from '../server.js';

describe('Version Endpoint', () => {
  it('should return the correct version', async () => {
    const res = await request(app)
      .get('/api/version')
      .expect(200);
    
    expect(res.body).toHaveProperty('version');
    expect(res.body.version).toMatch(/^v?\d+\.\d+\.\d+$/);
  });
});
