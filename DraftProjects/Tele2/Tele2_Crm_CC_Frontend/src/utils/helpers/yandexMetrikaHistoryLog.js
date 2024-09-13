import ym from 'react-yandex-metrika'

export function yandexMetrikaHistory (pathname) {
  try {
    ym('hit', pathname)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Yandex Metrika error', error)
  }
}
