import { UmamiApiClient } from '../UmamiApiClient';
import { UmamiApiError } from '../UmamiApiError';

describe('UmamiApiClient', () => {
  describe('constructor', () => {
    it('should hash the secret on construction', () => {
      const client = new UmamiApiClient({ apiEndpoint: 'http://example.com', secret: 'my-secret' });
      // secret should be hashed (not the raw string)
      expect((client as any)._secret).not.toBe('my-secret');
      expect(typeof (client as any)._secret).toBe('string');
    });
  });

  describe('setSecret', () => {
    it('should hash the secret when set via setSecret', () => {
      const client1 = new UmamiApiClient({
        apiEndpoint: 'http://example.com',
        secret: 'my-secret',
      });
      const client2 = new UmamiApiClient({ apiEndpoint: 'http://example.com', secret: '' });
      client2.setSecret('my-secret');
      // Both clients should have the same hashed secret
      expect((client2 as any)._secret).toBe((client1 as any)._secret);
    });
  });

  describe('getHeaders', () => {
    it('should not mutate the input headers object', () => {
      const client = new UmamiApiClient({
        apiEndpoint: 'http://example.com',
        secret: 'secret',
        apiKey: 'key-123',
      });
      const inputHeaders = { 'content-type': 'application/json' };
      const originalHeaders = { ...inputHeaders };
      const result = client.getHeaders(inputHeaders);
      // Input should be unchanged
      expect(inputHeaders).toEqual(originalHeaders);
      // Result should include auth info
      expect(result['x-umami-api-key']).toBe('key-123');
    });

    it('should return a new object with auth headers', () => {
      const client = new UmamiApiClient({
        apiEndpoint: 'http://example.com',
        secret: 'secret',
        apiKey: 'key-abc',
      });
      const result = client.getHeaders();
      expect(result['x-umami-api-key']).toBe('key-abc');
    });
  });

  describe('CRITICAL bug fixes', () => {
    it('getWebsiteDateRange method should exist', () => {
      const client = new UmamiApiClient({ apiEndpoint: 'http://example.com', secret: 'secret' });
      expect(typeof client.getWebsiteDateRange).toBe('function');
    });

    it('getWebsiteValues method should exist', () => {
      const client = new UmamiApiClient({ apiEndpoint: 'http://example.com', secret: 'secret' });
      expect(typeof (client as any).getWebsiteValues).toBe('function');
    });
  });

  describe('UmamiApiError', () => {
    it('should be throwable with status code', () => {
      const err = new UmamiApiError('Not found', 404);
      expect(err.status).toBe(404);
      expect(err.message).toBe('Not found');
      expect(err.name).toBe('UmamiApiError');
      expect(err instanceof Error).toBe(true);
    });

    it('should store optional response', () => {
      const response = { data: 'test' };
      const err = new UmamiApiError('Server error', 500, response);
      expect(err.response).toBe(response);
    });
  });
});
