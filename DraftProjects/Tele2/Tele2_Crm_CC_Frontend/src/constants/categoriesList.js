import PropTypes from 'prop-types'

const CategoryShape = {
  CategoryId: PropTypes.number.isRequired,
  CategoryName: PropTypes.string.isRequired
}

export const CategoryProps = PropTypes.shape(CategoryShape)
