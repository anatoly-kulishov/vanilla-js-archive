/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'

import { toRuLayout, findItem, findItems } from 'utils/helpers/replacer'

const unique = arr => Array.from(new Set(arr))

export default class SmartSearchLine extends Component {
  static propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func,
    tabIndex: PropTypes.number,
    autoFocus: PropTypes.bool,
    dictionary: PropTypes.shape({
      date: PropTypes.string,
      irregulars: PropTypes.arrayOf(PropTypes.string),
      ruIrregulars: PropTypes.arrayOf(PropTypes.string)
    })
  }

  state = {
    isOptionsOpen: false,
    options: [],
    startWordsCount: 0,
    possibleStartWords: ''
  }

  handleSelect = value => {
    const { onSearch } = this.props
    onSearch(value)
    this.setState({ isOptionsOpen: false })
  }

  handleChange = inputValue => {
    const { onSearch, dictionary } = this.props
    const { startWordsCount, possibleStartWords } = this.state
    onSearch(inputValue)
    if (inputValue && dictionary) {
      const trimmedValue = inputValue.trim()
      const startWords = trimmedValue.split(' ') // после pop() будет содержать все слова, кроме последнего
      const lastWord = startWords.pop()

      const isWordsCountChanged = startWords.length !== startWordsCount
      let newPossibleStartWords = possibleStartWords
      if (isWordsCountChanged) {
        // при изменении количества слов пробегаем по всем словам кроме последнего
        // и изменяем их либо на irregular, либо на русскую раскладку
        newPossibleStartWords = this.getPossibleStartWords(startWords)
        this.setState({
          startWordsCount: startWords.length,
          possibleStartWords: newPossibleStartWords
        })
      }

      if (lastWord.length > 2) {
        const newOptions = this.generateOptions(trimmedValue, newPossibleStartWords, lastWord)
        this.setState({
          options: newOptions,
          isOptionsOpen: newOptions.length > 1
        })
      } else {
        this.setState({
          options: [],
          isOptionsOpen: false
        })
      }
    } else {
      this.setState({ isOptionsOpen: false })
    }
  }

  generateOptions = (trimmedValue, newPossibleStartWords, lastWord) => {
    const { dictionary = {} } = this.props
    const { irregulars, ruIrregulars } = dictionary

    // Если есть слова, кроме обрабатываемого,
    // необходимо подставить перед последним хранящуюся наиболее подходящую строку
    const stringBeforeLastWord = newPossibleStartWords ? newPossibleStartWords + ' ' : ''

    const mostPossibleQuery = stringBeforeLastWord + this.getPossibleWord(lastWord)
    const optionsWithIrregulars = findItems(lastWord, irregulars, ruIrregulars) // ищем в словаре все слова, которые включают lastWord
      .map(irregular => stringBeforeLastWord + irregular) // к строке, которая уже обработана и не нуждается в изменениях добавляем возможные варианты, найденные в словаре
      .sort((prev, next) => prev.length - next.length) // сортируем эти options по возрастанию количества букв

    // trimmedValue может совпасть с 'stringBeforeLastWord + getPossibleWord(lastWord)' или с irregular, поэтому убеждаемся, что все options уникальны.
    const uniqueOptions = unique([
      // вариант, введенный пользователем
      trimmedValue,
      // наиболее вероятный вариант запроса
      mostPossibleQuery,
      // options, в которых последнее слово нашлось в словаре
      ...optionsWithIrregulars
    ])
    return uniqueOptions
  }

  getPossibleStartWords = startWords => startWords.map(word => this.getPossibleWord(word)).join(' ')

  getPossibleWord = word => {
    const { dictionary = {} } = this.props
    const { irregulars, ruIrregulars } = dictionary
    const irregular = findItem(word, irregulars, ruIrregulars)
    return irregular || toRuLayout(word)
  }

  render () {
    const { value, tabIndex = 0, autoFocus = true } = this.props
    const { isOptionsOpen, options } = this.state

    return (
      <Search
        autoFocus={autoFocus}
        allowClear
        tabIndex={tabIndex}
        value={value}
        placeholder='Поиск'
        open={isOptionsOpen}
        dataSource={options}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onDropdownVisibleChange={isOpen => this.setState({ isOptionsOpen: isOpen })}
      />
    )
  }
}

const Search = styled(AutoComplete)`
  width: 100%;
  margin-right: 10px;
  margin-bottom: 0;
`
