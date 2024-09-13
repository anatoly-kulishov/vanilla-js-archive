import { useState, useEffect } from 'react'
/**
 * Generates HEX colors from green to red based on the given progress
 * @param {number} percentage - progress percentage
 * @param {number} start
 * @param {number} end
 * @param {number} brightness
 * @returns {string} HEX color string
*/
export default function useHslColors (percentage, start, end, brightness) {
  const [color, setColor] = useState(0)

  useEffect(() => {
    const ratio = percentage / 100
    const difference = (end - start) * ratio
    const hue = difference + start

    setColor(`hsl(${hue}, 100%, ${brightness}%)`)
  }, [percentage])

  return color
}
