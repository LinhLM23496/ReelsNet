import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import Icon from 'components/Icon/Icon'
import { color } from 'themes'

test('renders icon plus correctly', () => {
  const tree = renderer.create(<Icon name="plus" />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders color danger correctly', () => {
  const tree = renderer
    .create(<Icon name="plus" color={color.danger} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
