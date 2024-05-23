export function getMessageExcerpt(message, maxLength = 13) {
  return message.length > maxLength
    ? `${message.slice(0, maxLength)}...`
    : message;
}
