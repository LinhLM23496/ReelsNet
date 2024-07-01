import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import Text from 'components/Text/Text'
import Modal from 'components/Modal/Modal'

test('renders correctly top position', () => {
  const fn = () => {}
  const tree = renderer
    .create(
      <Modal visible={true} setModalVisible={fn} position="top">
        <Text>ReelsNet</Text>
      </Modal>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly bottom position', () => {
  const fn = () => {}
  const tree = renderer
    .create(
      <Modal visible={true} setModalVisible={fn} position="bottom">
        <Text>ReelsNet</Text>
      </Modal>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly center position', () => {
  const fn = () => {}
  const tree = renderer
    .create(
      <Modal visible={true} setModalVisible={fn} position="center">
        <Text>ReelsNet</Text>
      </Modal>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('renders correctly visible false', () => {
  const fn = () => {}
  const tree = renderer
    .create(
      <Modal visible={false} setModalVisible={fn} position="center">
        <Text>ReelsNet</Text>
      </Modal>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
