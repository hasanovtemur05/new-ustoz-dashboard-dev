export default function calculateFileSize(size: number): string {
  return `${(size / 1024 ** 2).toFixed(1)} MB`;
}
