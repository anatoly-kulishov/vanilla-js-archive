import store from 'utils/createdStore'

export const shouldRate = currentFeatureId => {
  const { features } = store.getState()?.likes?.likes ?? {}
  const isActiveFeature = features.findIndex(item => item.FeatureId === currentFeatureId) !== -1
  return isActiveFeature
}

export default shouldRate
