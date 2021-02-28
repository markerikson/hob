export interface Menu {
  id:   number,
  name: string,
  icon_url: string,
  background_color: string,
  main: boolean,
  ionic_resource: string,
  label_lang_en_uk: string,
  label_lang_es_es: string,
  menus?:object,
}