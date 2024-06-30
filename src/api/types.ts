export type PagingDataType<DataType> = {
  data: {
    count: number
    items: DataType[]
  }
  pagination_token: string | null
}
