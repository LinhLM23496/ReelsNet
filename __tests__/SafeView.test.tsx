import React from 'react'
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import SafeView from 'components/SafeView/SafeView'
import Text from 'components/Text/Text'
import { SafeAreaProvider } from 'react-native-safe-area-context'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <SafeAreaProvider>
        <SafeView>
          <Text>ReelsNet</Text>
        </SafeView>
      </SafeAreaProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
