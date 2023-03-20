export const fetchJsonToJs = response => {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export const trimInput = countryName => countryName.trim();
