import { StyleSheet, Switch } from 'react-native'
import React, { useCallback } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import { Row, Text } from 'components'
import { color, colorRange, space } from 'themes'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { PostParams } from '../CreatePostContent.types'

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetModal>
  setValue: UseFormSetValue<PostParams>
  watch: UseFormWatch<PostParams>
}

type DataType = {
  id: string
  name: keyof PostParams
  title: string
}

const BottomSheetAdvanced = ({ watch, setValue, bottomSheetRef }: Props) => {
  const DATA_ADVANCE: DataType[] = [
    {
      id: '1-advance',
      name: 'showLike',
      title: 'Show like on the post'
    },
    {
      id: '2-advance',
      name: 'showShare',
      title: 'Show share on the post'
    },
    {
      id: '3-advance',
      name: 'isComment',
      title: 'Allow comment on the post'
    }
  ]

  const renderAdvancedSetting = (item: DataType) => {
    const { id, name, title } = item
    const value = watch(name) as boolean

    const handleSwitch = (v: boolean) => {
      setValue(name, v)
    }
    return (
      <Row key={id} style={styles.itemAdvanced}>
        <Text>{title}</Text>
        <Switch
          trackColor={{
            false: colorRange.gray[200],
            true: color.primary
          }}
          thumbColor={color.white}
          ios_backgroundColor={color.white}
          onValueChange={handleSwitch}
          value={value}
        />
      </Row>
    )
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    []
  )

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}>
      <BottomSheetView>
        <Text size="l" textAlign="center">
          Advanced settings
        </Text>
        {DATA_ADVANCE.map(renderAdvancedSetting)}
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default BottomSheetAdvanced

const styles = StyleSheet.create({
  itemAdvanced: {
    justifyContent: 'space-between',
    paddingHorizontal: space.m,
    paddingVertical: space.s
  }
})
