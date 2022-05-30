export const getImages = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/images`);
  return res.json();
};
