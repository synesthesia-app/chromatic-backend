export const getPalettes = async () => {
  const res = await fetch(`${process.env.API_URL}/api/v1/palettes`);
  return res.json();
};
