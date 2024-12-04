

const getIdFromUrl = (url) => {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1];
};

export default getIdFromUrl;
