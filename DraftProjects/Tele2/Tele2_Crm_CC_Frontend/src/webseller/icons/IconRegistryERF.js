import React from 'react'
import Icon from '@ant-design/icons'

const SvgRegistryERF = () => (
  <svg width={20} height={20} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
    <path d='M23.492,2H30V8.508H23.492Z' fill='#1F2229' />
    <path d='M11.477,7.363,15.3,2.1l5.265,3.825-3.825,5.265Z' fill='#1F2229' />
    <path d='M20.477,12.922,26.631,10.8l2.119,6.153L22.6,19.075Z' fill='#1F2229' />
    <path d='M2,8.453H8.508v6.508H2Z' fill='#1F2229' />
    <path d='M2,16H8.508v6.508H2Z' fill='#1F2229' />
    <path d='M9.492,16H16v6.508H9.492Z' fill='#1F2229' />
    <path d='M2,23.492H8.508V30H2Z' fill='#1F2229' />
    <path d='M9.492,23.492H16V30H9.492Z' fill='#1F2229' />
    <path d='M17.039,23.492h6.508V30H17.039Z' fill='#1F2229' />
  </svg>
)

export default function IconRegistryERF (props) {
  return <Icon component={SvgRegistryERF} {...props} />
}
