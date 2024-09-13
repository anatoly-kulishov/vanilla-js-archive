import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import useHslColors from 'hocs/useHlsColors'
import ProgressText from './ProgressText'

import { Progress, Spin } from 'antd'

export default function CircularProgress ({ width, progress, dataSource, isLoading }) {
  CircularProgress.propTypes = {
    width: PropTypes.number,
    progress: PropTypes.number,
    dataSource: PropTypes.number,
    isLoading: PropTypes.bool
  }

  const color = useHslColors(progress * 10, 120, 0)

  return (
    <PrecisionScale
      width={width}
      status='normal'
      type='dashboard'
      format={percent =>
        <Spin spinning={isLoading}>
          <ProgressText
            color={color}
            progress={progress}
            dataSource={dataSource}
          />
        </Spin>
      }
      percent={progress * 10}
      strokeColor={color}
      strokeWidth={10}
      trailColor='rgba(135,206,235, .7)'
    />
  )
}

const PrecisionScale = styled(Progress)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bolder;
  background-color: #f0f0f0d9;
  border-radius: 50%;
  border: 6px solid #f0f0f0d9;
  box-shadow: 0 0 5px 2px lightgray;
`
