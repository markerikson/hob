<?php

class DumperClass {

    private $snapshot = 'HobSnap8 Dump';
    private $imgDump = 'assets/dump/images';
    private $origin = 'http://161.97.167.92:1337/';
    private $mainLang = 'en-GB';
    private $map = [
        'langs' => [
            'url'       => 'languages',
            'filename'  => '../public/assets/dump/others/languages.json'
        ],            
        'main_menu' => [
            'url'       => 'app-menus', 
            'filename'  => '../public/assets/dump/menus/main-menu.json'
        ],
        'submenus' => [
            'path'      => '../public/assets/dump/menus/',
            'filename'  => '../public/assets/dump/menus/{id}.json'
        ],
        'articles' => [
            'url'       => 'app-articles',
            'path'      => '../public/assets/dump/articles/',
            'filename'  => '../public/assets/dump/articles/{id}.json'
        ],
        'slides' => [
            'url' => 'app-slides',
            'path' => '../public/assets/dump/articles/slides/',
            'filename' => '../public/assets/dump/articles/slides/{id}.json'
        ],
        'images' => [
            'path'=> 'dump/images/uploads/',
            'filename' => 'dump/images/uploads/{filename}'
        ],
        'translations' => [
            'path' => '/i18next/',
            'filename' => './i18next/{lang}/{object}.json'
        ],
        'translation' => [
            'path'=> '/i18next/',
            'filename' => './i18next/{object}.json'
        ],
        'strapi_trans' => [
            'url' => 'translations'
        ]
        /*
        'all_menus' =>      [
            'url' => 'app-menus',
            'path'=> '../public/assets/dump/others/',
            'filename' => '../public/assets/dump/others/all-menus.json'
        ],
        'menu' =>           [
            'url' => 'app-menus',
            'path'=> '../public/assets/dump/menus/',
            'filename' => '../public/assets/dump/menus/{id}.json'
        ],
        */
    ];
    
    function __construct(){
        $this->init();
        echo $this->snapshot. ' was succesfully done!!!';
    }

    public function init(){

        foreach( $this->map as $key => $row){
            if(isset($row['url']) && !empty($row['url'])){
                $this->map[$key]['url'] = $this->origin . $this->map[$key]['url'];
            }
            if(isset($row['path']) && !empty($row['path'])){
                $this->cleanPath($row['path']);
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////
        // ARTICLES - Getting App Articles...
        //////////////////////////////////////////////////////////////////////////////////////////
        foreach( $this->getContent('articles') as $key => $content ){
            $this->newArticles[$content->slug] = $content;
        }

        //////////////////////////////////////////////////////////////////////////////////////////
        // LANGUAGES - Get Available languages!! 
        //////////////////////////////////////////////////////////////////////////////////////////
        $this->oldLangs = $this->getContent('langs');
        foreach($this->oldLangs as $old){        
            $this->newLangs[] = (array) $old;
        }
        file_put_contents( $this->map['langs']['filename'], json_encode($this->newLangs, JSON_PRETTY_PRINT));
            
        //////////////////////////////////////////////////////////////////////////////////////////
        // MENUS - Getting Menus... Created formated new menus object
        ////////////////////////////////////////////////////////////////////////////////////////// 
        foreach( $this->getContent('main_menu') as $key => $menu ){
            $this->oldMenus[$menu->slug] = $menu;
        }

        foreach( $this->oldMenus as $key => $menu ){

            if(isset($menu->icon)) $this->getImages($menu->icon);

            //////////////////////////////////////////////////////////////////////////////////////////
            // MENUS - Printing the digested static content for the APK ;)
            //////////////////////////////////////////////////////////////////////////////////////////
            $newMenu[$key]['slug'] = $menu->slug;
            $newMenu[$key]['name'] = $this->getLabelTranslation($menu->label);
            $newMenu[$key]['parent'] = '/Home';
            $newMenu[$key]['resource'] = $this->getSlug($menu->ionic_resource, $menu);
            $newMenu[$key]['active_icon'] = $this->getImageUrl2(($menu->icon->url ?? ''));
            $newMenu[$key]['inactive_icon'] = $this->getImageUrl2(($menu->icon_inactive->url ?? ''));
            $newMenu[$key]['background_color'] = $menu->background_color;

            //if($menu->slide_step) $newMenu[$key]['slide_step'] = $menu->slide_step - 1;

            $this->setChildren( $menu, $menu->background_color);

            if($menu->main){
                $mainMenu[] = $newMenu[$key] ?? [];
                $newMenu[$key]['has_main'] = true;
            }

            file_put_contents( str_replace('{id}','menu-'.$menu->slug, $this->map['submenus']['filename']), json_encode([$newMenu[$key]], JSON_PRETTY_PRINT));
            file_put_contents( str_replace('{id}','article-'.$menu->slug, $this->map['articles']['filename']), json_encode([$newMenu[$key]], JSON_PRETTY_PRINT));

        }

        // Guardar todos los Menus Principales...
        file_put_contents( $this->map['main_menu']['filename'], json_encode(array_values($mainMenu), JSON_PRETTY_PRINT));


        //////////////////////////////////////////////////////////////////////////////////////////
        // TRANSLATIONS - Getting all the translations..
        //////////////////////////////////////////////////////////////////////////////////////////
        $strapiTrans = $this->getContent('strapi_trans');
        foreach( $strapiTrans as $key => $trans ){
            foreach( $trans->translations as $key2 => $trans2 ){
                $this->translations[$trans2->language->code][$trans->name] = $trans2->label;
            }
        }

        // One file for each translation pack
        //foreach($this->translations as $key => $this->translation){
        //   file_put_contents (str_replace('{lang}',$key, str_replace('{object}','translations',$this->map['translations']['filename'])), json_encode($this->translation, JSON_PRETTY_PRINT));
        //}   

        // Preparing a unique file with the i18next format ;)
        
        foreach($this->oldLangs as $old){
            $outTrans[$old->code]['translation'] = [];
            foreach($this->translations[$old->code] as $key => $translation){
                $outTrans[$old->code]['translation'][$key] = $translation;            
            }
        }

        file_put_contents( str_replace('{object}','translations',$this->map['translation']['filename']), json_encode($outTrans, JSON_PRETTY_PRINT));

    }

    private function setChildren($menu, $color, $parent = null){

        //////////////////////////////////////////////////////////////////////////////////////////
        // CHILDREN MENUS - Setting children fields ;)
        //////////////////////////////////////////////////////////////////////////////////////////

        $menu->menus = $menu->children[0]->menus ?? [];
        $menu->articles = $menu->children[0]->articles ?? [];
        $fullMenu = [];

        if(!empty($menu->menus)){

            foreach( $menu->menus as $key => $value ){                    
                $fullMenu[] = $this->oldMenus[$value->slug];                    
            }     
            $g = 0;
            foreach( $fullMenu as $key2 => $value ){
                
                $newSubMenu[$key][$key2]['name'] = $this->getLabelTranslation($value->label);
                $newSubMenu[$key][$key2]['slug'] = $value->slug;
                if($value->ionic_resource == 'Article'){

                    if($this->oldMenus[$value->slug]->children[0]->articles[0]->slug == null){
                        var_export('¡Have no slug! on'.$value->slug); die();
                    }

                    $newSubMenu[$key][$key2]['parent'] = 'LiveMenu/'.( $value->parent_menu->slug ?? '');
                    $newSubMenu[$key][$key2]['resource'] =  $value->ionic_resource.'/'.$this->oldMenus[$value->slug]->children[0]->articles[0]->slug.'/'.( $value->slug ?? '');
                    $g++;
                }else{
                    // TODO
                    $newSubMenu[$key][$key2]['parent'] = 'LiveMenu/'.$menu->slug;
                    $newSubMenu[$key][$key2]['resource'] = $value->ionic_resource.'/'.$value->slug;
                }

                if($value->slide_step) $newSubMenu[$key][$key2]['resource'] = $newSubMenu[$key][$key2]['resource'].'/'.$value->slide_step - 1;

                if( $newSubMenu[$key][$key2]['name'] == 'THE BOAT'){
                    //var_export($this->oldMenus[$value->slug]); die();
                }

                if(isset($value->icon)) $this->getImages($value->icon);

                $newSubMenu[$key][$key2]['active_icon'] = $this->getImageUrl(($value->icon->url ?? ''));
                $newSubMenu[$key][$key2]['inactive_icon'] = $this->getImageUrl(($value->icon_inactive->url ?? ''));
                $newSubMenu[$key][$key2]['background_color'] = (!empty($value->parent_menu->backgrond_color)) ? $value->parent_menu->backgrond_color : $color;            

            }

            if(!isset($newSubMenu[$key]) || empty($newSubMenu[$key])) $newSubMenu[$key] = [];

            file_put_contents( str_replace('{id}','sub-menu-'.$menu->slug, $this->map['submenus']['filename']), json_encode($newSubMenu[$key], JSON_PRETTY_PRINT));

        }
        
        if(!empty($menu->articles)){

            //////////////////////////////////////////////////////////////////////////////////////////
            // CHILDREN ARTICLE
            //////////////////////////////////////////////////////////////////////////////////////////

            $thisArticle = $this->newArticles[$menu->articles[0]->slug];

            /*$article = [
                'id' => $thisArticle->id,
                'slug' => $thisArticle->slug ?? '',
                'name' => $this->getLabelTranslation($thisArticle->label),
                'active_icon' => $this->getImageUrl2(($menu->icon->url ?? '')),
            ];
            
            */

            $slides = $this->newArticles[$menu->articles[0]->slug]->children;
            $slidesCount = count($slides);
            $x = 0;

            foreach($slides as $key => $slide){

                if(isset($slide->image)){ 
                    $this->getImages($slide->image);
                }

                foreach($slide->translations as $trans ){

                    if(!isset($trans->language->code )) {                        
                        var_export($trans); die('Translation without language code for '.$slide->name);
                    }

                    if(!isset($trans->description)) {                        
                        var_export($trans); die('Translation without description for '.$slide->name);
                    }

                    // Están en dos idiomas, pero vamos a recoger solamente en uno de los dos...
                    $matchMainLang = ( $trans->language->code == $this->mainLang );        
        
                    if($matchMainLang){
                        $mainTitle3 = $trans->title;
                        $mainLabel3 = $trans->label;
                        $mainDescription = $trans->description ?? 'slide_'.$slide->id;
                        $a = ++$x;
                        $addMenu['slides'][] = [
                            'slug' => $slide->slug ?? '',
                            'id' => $slide->id,
                            'icon' => $this->getImageUrl2($menu->icon->url ?? ''),
                            'title' => $trans->title ?? '',
                            'label' => $trans->label ?? '',
                            'num_tag' => $a.'/'.$slidesCount,
                            'index_num' => $x-1,
                            'image_url' => $this->getImageUrl2($slide->image->url ?? ''),
                            'description' => $trans->description ?? '',
                        ];
                    }    

                    $this->translations[$trans->language->code][$mainTitle3] = $trans->title;
                    $this->translations[$trans->language->code][$mainLabel3] = $trans->label;
                    $this->translations[$trans->language->code][$mainDescription] = $trans->description ?? '';

                }

            }

            file_put_contents( str_replace('{id}','slide-'.$menu->articles[0]->slug, $this->map['slides']['filename']), json_encode($addMenu['slides'], JSON_PRETTY_PRINT));

        }

        //////////////////////////////////////////////////////////////////////////////////////////
        // SUB-MENUS
        //////////////////////////////////////////////////////////////////////////////////////////

    }

    private function getContent($mappedType){
        $url = $this->map[$mappedType]['url'];        
        $ch = curl_init();
        $headers = array('Accept: application/json', 'Content-Type: application/json');
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        return json_decode(curl_exec($ch));
    }

    private function getImages($images){
        if (is_array($images)) {
            foreach ($images as $image) {
                $this->getStrapiImage($image);
            }
        } else {
            $this->getStrapiImage($images);
        }
    }

    private function getStrapiImage($image = null){
        if(! empty($image->url)){
            $filename = explode('/', $image->url)[2];
            $url = 'http://161.97.167.92:1337' . ($image->url??'');
            file_put_contents('../public/assets/images/dump/' . $filename, file_get_contents($url));
        }
    }

    private function getSlug($case, $object, $extra_slug = null){
        switch($case){
            case 'LiveMenu':{
                $return = '/'.$object->ionic_resource.'/'.$object->slug;
            }break;
            case 'Article':{
                $return = '/'.$object->ionic_resource.'/'.$object->slug;
                if($extra_slug) $return = $return.'/'.$extra_slug;
            }break;
            case 'LiveMap':{
                $return = '/'.$object->ionic_resource.'/1';
            }break;
            default:{
                $return = '/'.$object->ionic_resource;
            }break;
        }
        return $return;
    }

    private function getSlug2($params = []){
        return '/'.implode('/', $params);
    }

    private function getImageUrl($url){
        if(!empty($url)){
            $return = str_replace('dump/images/uploads/', 'images/dump/',$url);
            return str_replace('uploads/', 'assets/images/dump/',$return);
        }else{
            return '';
        }
    }

    private function getImageUrl2($url = null){
        return str_replace('uploads/', 'assets/images/dump/',$url) ?? '';
    }

    private function getLabelTranslation($labels){
        foreach($labels as $label){
            if( $label->language->code == $this->mainLang ){
                $inMain = $label->label;
            }
        }
        foreach($labels as $label){
            $this->translations[$label->language->code][$inMain] = $label->label; 
        }
        return $inMain ?? '';
    }

    private function cleanPath($path){
        $files = glob($path); // get all file names
        foreach($files as $file){ // iterate files
            if(is_file($file)) {
                unlink($file); // delete file
            }
        }
    }

}

$s= new DumperClass();