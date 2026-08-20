export const normalizeAssociationIds = (value, fallback = []) => {
  const ids = Array.isArray(value) ? value : fallback;

  return [...new Set(ids.map(Number).filter((id) => Number.isInteger(id) && id > 0))].sort(
    (a, b) => a - b,
  );
};

export const haveSameAssociationIds = (first, second) => {
  return JSON.stringify(normalizeAssociationIds(first)) === JSON.stringify(normalizeAssociationIds(second));
};
