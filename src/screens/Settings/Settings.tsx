import React, { useState } from 'react'
import { Button, Modal, SafeView, Text } from 'components'
import { useDispatch } from 'react-redux'
import { onModal } from 'stores/modal/modal.action'

const Settings = () => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const handle = () => {
    // setVisible(true)
    dispatch<any>(
      onModal({
        display: true,
        title: 'title',
        subTitle: 'sub Title',
        content: 'content',
        button: [
          {
            title: 'button',
            onPress: () => {
              console.log('object')
            }
          },
          {
            title: 'button',
            onPress: () => {
              console.log('object')
            }
          }
        ]
      })
    )
  }
  return (
    <SafeView>
      <Text>Settings</Text>
      {/* <Button title="Check" onPress={handle} />
      <Modal visible={visible} setModalVisible={setVisible} position="top">
        <Text>Linh</Text>
      </Modal> */}
    </SafeView>
  )
}

export default Settings
