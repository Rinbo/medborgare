import { encodeHex } from "jsr:@std/encoding/hex";
import { crypto, DigestAlgorithm } from "jsr:@std/crypto";

async function createHash(string: string, algorithm: DigestAlgorithm): Promise<string> {
  const messageBuffer = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest(algorithm, messageBuffer);
  return encodeHex(hashBuffer);
}

export const createMD5Hash = async (string: string) => await createHash(string, "MD5");

export const createSha256Hash = async (string: string) => await createHash(string, "SHA-256");
