import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import Row from 'components/Row/Row'
import Text from 'components/Text/Text'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Row>
        <Text>ReelsNet</Text>
      </Row>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
