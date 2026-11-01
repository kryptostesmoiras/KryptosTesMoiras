// Set a URL only after publishing and verifying the corresponding release.
// A target listed here does not imply that a build or platform port exists.
export const releaseTargets: ReadonlyArray<{ id: string; label: string; url: string | null }> = [
  { id: 'windows', label: 'Windows', url: null },
  { id: 'macos', label: 'macOS', url: null },
  { id: 'linux', label: 'Linux', url: null },
  { id: 'android', label: 'Android', url: null },
  { id: 'ios', label: 'iOS / iPadOS', url: null },
];

export function publicReleaseUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
