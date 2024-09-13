import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCategoriesList } from 'reducers/reasonsCategories/categoriesListReducer'
import {
  CategoryProps
} from 'constants/categoriesList'
import { Select } from 'antd'

const mapStateToProps = state => ({
  categories: state.reasonsCategories.categoriesListState.categories,
  isCategoriesLoading: state.reasonsCategories.categoriesListState.isCategoriesLoading
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCategoriesList
}, dispatch)

class CategorySelectorContainer extends PureComponent {
  static propTypes = {
    // external props
    value: PropTypes.number, // ReasonId
    onChange: PropTypes.func,
    // container props
    categories: PropTypes.arrayOf(
      CategoryProps
    ).isRequired,
    isCategoriesLoading: PropTypes.bool.isRequired,
    fetchCategoriesList: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.fetchCategoriesList({ viewType: 1 })
  }

  render () {
    const { categories, isCategoriesLoading, ...props } = this.props

    return (
      <StyledSelect disabled={isCategoriesLoading} {...props}>
        <Select.Option value={null} key={null}>
          Все
        </Select.Option>
        {categories.map(category => (
          <Select.Option value={category.CategoryId} key={category.CategoryId}>
            {category.CategoryName}
          </Select.Option>
        ))}
      </StyledSelect>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelectorContainer)

const StyledSelect = styled(Select)`
  width: 100%;
`
