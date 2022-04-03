import React from 'react'

import { Button } from './button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: { },
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  href: '/',
  label: 'Default Button',
  outline: false,
  decal: 'fs-6 fw-500'
}

export const Outline = Template.bind({})
Outline.args = {
  href: '/',
  label: 'Outline Button',
  outline: true,
  decal: 'fs-6 fw-500'
}