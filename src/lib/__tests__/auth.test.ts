import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, signJWT, verifyJWT, AUTH_COOKIE_NAME } from '../auth';

describe('auth utilities', () => {
  describe('hashPassword / verifyPassword', () => {
    it('should hash a password and verify it correctly', async () => {
      const password = 'test-password-123';
      const hash = await hashPassword(password);

      expect(hash).not.toBe(password);
      expect(await verifyPassword(password, hash)).toBe(true);
    });

    it('should reject an incorrect password', async () => {
      const hash = await hashPassword('correct-password');
      expect(await verifyPassword('wrong-password', hash)).toBe(false);
    });

    it('should produce different hashes for the same password', async () => {
      const password = 'same-password';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('signJWT / verifyJWT', () => {
    const payload = {
      adminId: 'test-id-123',
      email: 'admin@example.com',
      role: 'admin',
    };

    it('should sign and verify a JWT token', () => {
      const token = signJWT(payload);

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);

      const decoded = verifyJWT(token);
      expect(decoded).not.toBeNull();
      expect(decoded!.adminId).toBe(payload.adminId);
      expect(decoded!.email).toBe(payload.email);
      expect(decoded!.role).toBe(payload.role);
    });

    it('should return null for an invalid token', () => {
      expect(verifyJWT('invalid.token.here')).toBeNull();
    });

    it('should return null for an empty string', () => {
      expect(verifyJWT('')).toBeNull();
    });

    it('should return null for a tampered token', () => {
      const token = signJWT(payload);
      const tampered = token.slice(0, -5) + 'xxxxx';
      expect(verifyJWT(tampered)).toBeNull();
    });
  });

  describe('AUTH_COOKIE_NAME', () => {
    it('should be a non-empty string', () => {
      expect(AUTH_COOKIE_NAME).toBe('admin-token');
    });
  });
});
