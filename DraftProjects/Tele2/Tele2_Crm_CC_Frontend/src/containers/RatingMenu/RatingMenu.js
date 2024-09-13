/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Tooltip, Popover, Input, Button, Rate } from 'antd'
import { StarFilled } from '@ant-design/icons'

const { TextArea } = Input

const MINIMUM_NO_COMMENT_RATING = 3

const RatingMenu = ({
  likes: { features },
  createLike,
  getLikes,
  currentFeatureId
}) => {
  RatingMenu.propTypes = {
    createLike: PropTypes.func,
    getLikes: PropTypes.func,
    likes: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.object)
    })
  }
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [currentRate, setCurrentRate] = useState(0)
  const [comment, setComment] = useState('')
  const [isRated, setIsRated] = useState(false)

  const currentFeature = features.find(feature => currentFeatureId === feature.FeatureId)

  const isFeatureActive = features.find(feature => {
    const { FeatureId: featureId, IsFeatureActive: isActive } = feature
    return featureId === currentFeatureId && isActive
  })

  const rate = ratingValue => {
    setCurrentRate(ratingValue)
    if (ratingValue >= MINIMUM_NO_COMMENT_RATING) {
      submitMark(ratingValue)
    }
  }

  const onClear = () => {
    setCurrentRate(0)
    setComment('')
    setIsRated(false)
  }

  const submitMark = (ratingId, commentMark) => {
    if ((ratingId < MINIMUM_NO_COMMENT_RATING && commentMark) || ratingId >= MINIMUM_NO_COMMENT_RATING) {
      setIsPopoverVisible(false)
      setIsRated(true)
      createLike({
        featureId: currentFeatureId,
        typeId: ratingId,
        comment: commentMark
      })
    }
  }

  useEffect(() => {
    getLikes()
  }, [])

  useEffect(() => {
    if (isPopoverVisible === true) {
      onClear()
    }
  }, [isPopoverVisible])

  if (isRated) {
    return (
      <Tooltip title={`Вы оценили этот функционал на ${currentRate}/5`} >
        <RatedStarIcon />
      </Tooltip>
    )
  }
  if (isFeatureActive) {
    return (
      <Wrapper>
        <Popover
          destroyTooltipOnHide
          arrowPointAtCenter
          trigger='click'
          placement='bottom'
          visible={isPopoverVisible}
          onVisibleChange={setIsPopoverVisible}
          title={() => (
            <StarsWrapper>
              <Rate
                tooltips={['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично']}
                onChange={value => rate(value)}
              />
            </StarsWrapper>
          )}
          content={() => (
            <PopoverContent>
              {
                currentRate > 0 && currentRate < MINIMUM_NO_COMMENT_RATING ? (
                  <Fragment>
                    <div>Напишите причину</div>
                    <TextArea value={comment} onChange={elem => setComment(elem.target.value)} />
                    <StyledButton type='primary' onClick={() => submitMark(currentRate, comment)}>
                      Отправить
                    </StyledButton>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div>Оцените удобство этого блока в работе</div>
                    {currentFeature.FeatureDescription && (
                      <FeatureDescriptionWrapper>
                        {currentFeature.FeatureDescription}
                      </FeatureDescriptionWrapper>
                    )}
                  </Fragment>
                )
              }
            </PopoverContent>
          )}
        >
          <Tooltip title='Оценить функционал CRM'>
            <StarIcon as={StarFilled} />
          </Tooltip>
        </Popover>
      </Wrapper>
    )
  } else return null
}

export default RatingMenu

const Wrapper = styled.div`
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PopoverContent = styled.div`
  max-width: 250px;
`

const StarsWrapper = styled.div`
  width: 100%;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledButton = styled(Button)`
  margin-top: 12px;
`

const StarIcon = styled.div`
  font-size: 21px;
  color: rgba(0, 0, 0, 0.2);
  &:hover,
  &:hover ~ & {
    cursor: pointer;
    opacity: 1;
    color: #fadb14;
    transform: scale(1.15);
    transition: ease 0.3s;
  }
`

const RatedStarIcon = styled(StarFilled)`
  font-size: 20px;
  color: #fadb14;
  cursor: initial;
`

const FeatureDescriptionWrapper = styled.div`
  margin-top: 1em;
`
