export function getFileExtension(filePath: string) {
  const fileExtension = filePath.split('.').at(-1);

  return fileExtension;
}
