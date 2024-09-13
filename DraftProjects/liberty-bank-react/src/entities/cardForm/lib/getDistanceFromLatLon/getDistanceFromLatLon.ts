const getDegreesTooRadians = (deg: number): number => {
  return deg * (Math.PI / 180);
};

/**
 * Вычисляет расстояние между двумя точками на земле, заданными их широтой и долготой.
 * Для вычислений использует формулу гаверсинуса.
 *
 * @param {number} lat1 Широта первой точки.
 * @param {number} lon1 Долгота первой точки.
 * @param {number} lat2 Широта второй точки.
 * @param {number} lon2 Долгота второй точки.
 * @returns {string} Расстояние между двумя точками в метрах (м) или километрах (км),
 * округленное до ближайшего целого числа для метров и до одного знака после запятой для километров.
 * Если расстояние равно или превышает 1000 метров, результат возвращается в километрах, иначе в метрах.
 */

export const getDistanceFromLatLon = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): string => {
  const R = 6371; // Радиус Земли в километрах
  const dLat = getDegreesTooRadians(lat2 - lat1);
  const dLon = getDegreesTooRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(getDegreesTooRadians(lat1)) *
      Math.cos(getDegreesTooRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  const distanceInMeters = distance * 1000;

  return distanceInMeters >= 1000
    ? `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(distance)} км`
    : `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(distanceInMeters)} м`;
};
