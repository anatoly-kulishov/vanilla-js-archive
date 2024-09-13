import React from 'react'
import Icon from '@ant-design/icons'

const SvgTwitch = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'>
    <circle cx='16' cy='16' r='16' fill='#6441A4' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M8.88867 11.6349L9.95117 8.88867H23.9998V18.6797L19.8678 22.8588H16.7984L14.7915 24.8887H12.6665V22.8588H8.88867V11.6349ZM20.222 20.3513L22.5831 17.9632V10.3214H11.2498V20.3513H14.4373V22.3811L16.4442 20.3513H20.222ZM20.222 13.0676V17.2467H18.8054V13.0676H20.222ZM16.4442 17.2467V13.0676H15.0276V17.2467H16.4442Z'
      fill='white'
    />
  </svg>
)

export default function IconTwitch (props) {
  return <Icon component={SvgTwitch} {...props} />
}
