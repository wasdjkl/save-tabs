export function prefixInteger(num: string | number, length: number): string {
  return (Array(length).join("0") + num).slice(-length);
}

export function getDateTime(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = prefixInteger(date.getMonth() + 1, 2);
  const day = prefixInteger(date.getDate(), 2);
  const hours = prefixInteger(date.getHours(), 2);
  const minutes = prefixInteger(date.getMinutes(), 2);
  const seconds = prefixInteger(date.getSeconds(), 2);
  const milliseconds = date.getMilliseconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
