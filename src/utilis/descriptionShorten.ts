export function shortenDescription(description: string, maxLength: number) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
}
