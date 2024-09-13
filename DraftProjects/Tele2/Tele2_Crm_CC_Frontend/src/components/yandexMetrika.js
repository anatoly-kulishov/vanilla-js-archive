/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { YMInitializer } from 'react-yandex-metrika'

export default function yandexMetrika () {
  const ymConfigString = localStorage.getItem('YandexMetrikaConfig')
  const ymConfig = ymConfigString ? JSON.parse(ymConfigString) : {}

  if (ymConfig?.IsMetrikaEnabled) {
    const {
      MetricId,
      AccurateTrackBounce: accurateTrackBounce,
      ClickMap: clickmap,
      TrackLinks: trackLinks,
      WebVisor: webvisor
    } = ymConfig

    return <YMInitializer accounts={[MetricId]} options={{ clickmap, trackLinks, accurateTrackBounce, webvisor }} />
  } else {
    return null
  }
}
