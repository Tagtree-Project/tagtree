import pako from "pako";

export const decompressUrlSafeBase64ToObject = (compressedString: string): object | null => {
  try {
    // URL-safe Base64 → 일반 Base64 변환
    const base64String = compressedString.replace(/-/g, "+").replace(/_/g, "/");

    // Base64 디코딩 (일반적인 브라우저 환경)
    const binaryString = atob(base64String);

    // Uint8Array로 변환
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    // pako로 압축 해제
    const decompressed = pako.inflate(byteArray, { to: "string" });

    // JSON 파싱하여 객체로 변환
    return JSON.parse(decompressed);
  } catch (error) {
    console.error("Decompression failed:", error);
    return null;
  }
};

export const compressObjectToUrlSafeBase64 = (obj: object) => {
  try {
    const compressed = pako.deflate(JSON.stringify(obj));
    const binaryString = String.fromCharCode(...compressed);
    return btoa(binaryString).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (error) {
    console.error("Compression failed:", error);
    return null;
  }
};