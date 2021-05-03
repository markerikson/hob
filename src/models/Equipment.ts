export interface Equipment {
  id: number,
  name: string,
  thumb: string,
  type: string,
  description:{
    label: string,
    language: {
      name: string,
      code: string
    }
  }[]
}