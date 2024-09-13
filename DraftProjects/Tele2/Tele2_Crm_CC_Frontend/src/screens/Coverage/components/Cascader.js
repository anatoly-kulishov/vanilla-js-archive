import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Select } from 'antd'
import usePrevState from 'hooks/usePrevState'
const { Option } = Select

export default function Cascader ({ data, onChange, mainTextLabel, subTextLabel, ...props }) {
  Cascader.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    mainTextLabel: PropTypes.string,
    subTextLabel: PropTypes.string
  }

  const [activeMain, setActiveMain] = useState(null)
  const [activeSub, setActiveSub] = useState([])
  const [mainOptions, setMainOptions] = useState([])
  const [subOptions, setSubOptions] = useState([])

  const prevState = usePrevState({ activeMain })

  useEffect(() => {
    const main = handleMain(data)
    const sub = handleSub(data)
    setMainOptions(main)
    setSubOptions(sub)
    setActiveMain(main)
    setActiveSub(sub)
  }, [data])

  useEffect(() => {
    if (activeMain) {
      let suboptions = new Set()
      for (const key of activeMain) {
        data[key].map(item => suboptions.add(item))
      }
      suboptions = [...suboptions]
      const filteredActiveSub = activeSub.filter(item => suboptions.includes(item))
      setActiveSub(filteredActiveSub)
      setSubOptions(suboptions)
    }
  }, [activeMain])

  useEffect(() => {
    if (prevState && prevState.activeMain) {
      if (activeMain.length - prevState.activeMain.length === 1) {
        const handleArrayDifference = (arr1, arr2) => arr1.filter(item => !arr2.includes(item))

        const difference = handleArrayDifference(activeMain, prevState.activeMain)
        const filteredActiveSub = [...activeSub, ...data[difference]]

        let suboptions = new Set()
        filteredActiveSub.map(item => suboptions.add(item))
        suboptions = [...suboptions]

        setActiveSub(suboptions)
      }
    }
  }, [activeMain])

  useEffect(() => {
    onChange(activeMain, activeSub)
  }, [activeMain, activeSub])

  const handleMain = options => (options ? Object.keys(options) : [])

  const mainOptionsList = mainOptions.map(item => (
    <Option key={item} value={item}>
      {item}
    </Option>
  ))

  const handleSub = options => {
    const suboptions = new Set()
    for (const key in options) {
      for (const item of options[key]) {
        suboptions.add(item)
      }
    }
    return [...suboptions]
  }

  const mainSubList = subOptions.map(item => <Option key={item}>{item}</Option>)

  return (
    <Wrapper {...props}>
      <InputField>
        <InputLabel htmlFor='main-cascade'>{mainTextLabel}</InputLabel>
        <Select
          id='main-cascade'
          allowClear
          showArrow
          value={activeMain}
          mode='multiple'
          placeholder='Выберите технологии'
          onChange={setActiveMain}
        >
          {mainOptionsList}
        </Select>
      </InputField>
      <InputField>
        <InputLabel htmlFor='sub-cascade'>{subTextLabel}</InputLabel>
        <Select
          id='sub-cascade'
          allowClear
          showArrow
          value={activeSub}
          mode='multiple'
          placeholder='Выберите подтехнологии'
          onChange={setActiveSub}
        >
          {mainSubList}
        </Select>
      </InputField>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const InputField = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  :first-child {
    margin-right: 20px;
  }
  .ant-select {
    min-width: 200px;
  }
  .ant-select-selection-item {
    color: white;
    background-color: #78c0ea;
  }
  color: white;
  border-radius: 4px;
  .anticon-close {
    color: #fff;
  }
`

const InputLabel = styled.label`
  color: rgba(0, 0, 0, 0.85);
`
