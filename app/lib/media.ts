export function isMp4Url(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return pathname.endsWith('.mp4') || pathname.endsWith('.webm') || pathname.endsWith('.ogv');
  } catch {
    return false;
  }
}
