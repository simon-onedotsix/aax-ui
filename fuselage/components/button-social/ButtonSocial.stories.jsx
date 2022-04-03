import React from 'react'

import { ButtonSocial } from './button-social'

export default {
  title: 'Components/ButtonSocial',
  component: ButtonSocial,
  argTypes: { },
}

const Template = (args) => <ButtonSocial {...args} />

export const Default = Template.bind({})
Default.args = {
    url: '#',
    icon: '',
    alt: 'social button'
}

export const Twitter = Template.bind({})
Twitter.args = {
    url: '#',
    icon: 'twitter',
    alt: 'social button'
}

export const Linkedin = Template.bind({})
Linkedin.args = {
    url: '#',
    icon: 'linkedin',
    alt: 'social button'
}

export const Facebook = Template.bind({})
Facebook.args = {
    url: '#',
    icon: 'facebook',
    alt: 'social button'
}

export const Weibo = Template.bind({})
Weibo.args = {
    url: '#',
    icon: 'weibo',
    alt: 'social button'
}