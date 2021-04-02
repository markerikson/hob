export interface Page {
  id:number,
  slug:string,
  title: string,
  label: string,
  image_url: string,
  description: string,
  description_md5:string,
  num_tag:string,
  parent?:string,
}
