export default function removeHtmlTags(text: string): string {
  const regex = /<.*?>/g;
  return text.replace(regex, '');
}
