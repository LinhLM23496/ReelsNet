import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import Text from 'components/Text/Text'
import { color } from 'themes'

test('renders correctly', () => {
  const tree = renderer.create(<Text>ReelsNet</Text>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders color correctly', () => {
  const tree = renderer
    .create(<Text color={color.danger}>ReelsNet</Text>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders text align correctly', () => {
  const tree = renderer
    .create(<Text textAlign="center">ReelsNet</Text>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders fontWeight correctly', () => {
  const tree = renderer.create(<Text fontWeight="bold">ReelsNet</Text>).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders fontSize correctly', () => {
  const tree = renderer.create(<Text size="xl">ReelsNet</Text>).toJSON()
  expect(tree).toMatchSnapshot()
})
