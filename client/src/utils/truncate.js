export const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

export const truncateFileName = (string, n) => {
  const extensionIndex = string.lastIndexOf('.');
  const fileNameWithoutExtension = string.slice(0, extensionIndex);
  const extension = string.slice(extensionIndex);
  return string?.length > n ? `${fileNameWithoutExtension?.slice(0, n)}...${extension}` : string;
};
