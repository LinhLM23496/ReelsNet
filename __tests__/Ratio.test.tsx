import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import Ratio from 'components/Ratio/Ratio'

test('renders correctly active', () => {
  const tree = renderer.create(<Ratio active />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly inactive', () => {
  const tree = renderer.create(<Ratio active={false} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly active have number', () => {
  const tree = renderer.create(<Ratio active number={3} />).toJSON()
  expect(tree).toMatchSnapshot()
})
