export const hash = async (text: string): Promise<ArrayBuffer> =>
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));

export const hex = (buf: ArrayBuffer): string =>
  Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export const NonNullableFilter = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined;

export interface Embedded {
  id: string;
  text: string;
  vector: Float32Array;
}
