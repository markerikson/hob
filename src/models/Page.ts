export interface Page {
  id:number,
  slug:string,
  title: string,
  label: string,
  image_url: string,
  description: string,
  num_tag:string,
  icon?: string,
  parent?:string,
}
