<?php

$version = 3;
$imgDump = 'assets/dump/images';
$mainLang = 'en';

$map = [
    'langs' =>          ['url' => 'http://161.97.167.92:1337/languages', 'filename' => '../public/assets/dump/others/languages.json'],
    'main_menu' =>      ['url' => 'http://161.97.167.92:1337/app-menus', 'filename' => '../public/assets/dump/others/main-menu.json'],
    'all_menus' =>      ['url' => 'http://161.97.167.92:1337/app-menus', 'filename' => '../public/assets/dump/others/all-menus.json'],
    'menus' =>          ['url' => 'http://161.97.167.92:1337/app-menus', 'filename' => '../public/assets/dump/menus/{id}.json'],
    'menu' =>           ['url' => 'http://161.97.167.92:1337/app-menus', 'filename' => '../public/assets/dump/menus/{id}.json'],
    'contents' =>       ['url' => 'http://161.97.167.92:1337/app-contents', 'filename' => '../public/assets/dump/contents/{id}.json'],
    'content_slide' =>  ['url' => 'http://161.97.167.92:1337/app-contents', 'filename' => '../public/assets/dump/contents/slides/{id}.json'],
    'articles' =>       ['url' => 'http://161.97.167.92:1337/app-contents', 'filename' => '../public/assets/dump/contents/articles/{id}.json'],
    'pages' =>          ['url' => 'http://161.97.167.92:1337/app-contents', 'filename' => '../public/assets/dump/contents/articles/pages/{id}.json'],
    'translations' =>   ['filename' => './i18next/{lang}/{object}.json'],
    'translation' =>    ['filename' => './i18next/{object}.json'],
    'images' =>         ['filename' => 'dump/images/uploads/{filename}'],
    'strapi_trans'  =>  ['url' => 'http://161.97.167.92:1337/translations' ]
];

//////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////

    function setCall($url){
        $ch = curl_init();
        $headers = array('Accept: application/json', 'Content-Type: application/json');
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        return curl_exec($ch);
    }

    function setFile($url, $filename){
        $return = (array) json_decode(setCall($url));
        $content = json_encode($return, JSON_PRETTY_PRINT);
        file_put_contents($filename, $content);
        return $return;
    }

    function getContent($url){
        return setCall($url);
    }

    function getArrayByTag($tag, $map){
        return json_decode(getContent($map[$tag]['url'], $map[$tag]['queryString'] ?? ''));
    }

    function getImages($images){
        if (is_array($images)) {
            foreach ($images as $image) {
                getStrapiImage($image);
            }
        } else {
            getStrapiImage($images);
        }
    }

    function getStrapiImage($image){
        $filename = explode('/', $image->url)[2];
        $url = 'http://161.97.167.92:1337' . $image->url;
        file_put_contents('../public/assets/images/dump/' . $filename, file_get_contents($url));
    }

    function setMenuContent($menus, $structs){

        $output['menus'] = $structs['json_header'];

        foreach ($menus as $menu) {

            // Get translated label
            if (isset($menu->label) && !empty($menu->label)) {

                // Setting labels i18next text translation
                foreach ($menu->label as $label) {            
                    $output['menus'][$label->language->code][$menu->name] = $label->label;
                }

                // Getting Menu icons
                if (!empty($menu->icon)) {
                    getImages($menu->icon);
                }

                // Getting Menu media
                if (!empty($menu->icon)) {
                    getImages($menu->icon);
                }

            }

        }

        return $output;

    }

    function getSlug($case, $object){
        switch($case){
            case 'Article':
            case 'LiveMenu':{
                return '/'.$object->ionic_resource.'/'.$object->slug;
            }break;
            case 'LiveMap':{
                return '/'.$object->ionic_resource.'/1';
            }break;
            default:{
                return '/'.$object->ionic_resource;
            }break;
        }
    }

    function getImageUrl($url = null){
        return str_replace('dump/images/uploads/', 'images/dump/',$url) ?? '';
    }

    function getImageUrl2($url = null){
        return str_replace('uploads/', 'assets/images/dump/',$url) ?? '';
    }

    function getLabelTranslation($labels, &$translations, $mainLang = 'en'){
        foreach($labels as $label){
            if( $label->language->code == $mainLang ){
                $inMain = $label->label; 
            }
        }
        foreach($labels as $label){
            $translations[$label->language->code][$inMain] = $label->label; 
        }
        return $inMain;
    }

    function completeAppContent(&$addMenu, $allData, &$translations, $map, $color, $mainLang = 'en'){

        getImages($allData->media);

        foreach($allData->media as $key => $image){
            $media[] = ['icon_url' => getImageUrl2($image->url)];
        }

        file_put_contents(str_replace('{id}', $allData->slug, $map['content_slide']['filename']), json_encode($media, JSON_PRETTY_PRINT));

        foreach($allData->articles as $key => $article){

            // Están en dos idiomas, pero vamos a recoger solamente en uno de los dos...
            $matchMainLang = ( $article->language->code == $mainLang );

            if($matchMainLang){
                $mainTitle = $article->title;
                $addMenu['articles'][] = [
                    'lang' => $article->language->code,
                    'title' => $article->title,
                    'extra_content' => $article->extra_content,
                    'background_color' =>  $color,
                ];
            }

            foreach($article->pages as $key => $page){

                if($matchMainLang){
                    $mainTitle3 = $page->title;
                    $mainDescription = $page->description ?? 'page_'.$page->id;
                    $addMenu['pages'][] = [
                        'title' => $page->title ?? '',
                        'image_url' => getImageUrl2($page->image->url),
                        'description' => $page->description ?? '',
                    ];
                }
                $translations[$article->language->code][$mainTitle3] = $page->title;
                $translations[$article->language->code][$mainDescription] = $page->description;
            }

            $translations[$article->language->code][$mainTitle] = $article->title;
        
        }

        if(!empty($addMenu['pages'])) file_put_contents (str_replace('{id}', $allData->slug, $map['pages']['filename']), json_encode($addMenu['pages'] ?? [], JSON_PRETTY_PRINT));

        file_put_contents (str_replace('{id}', $allData->slug, $map['articles']['filename']), json_encode($addMenu['articles'], JSON_PRETTY_PRINT));

    }


//////////////////////////////////////////////////////////////////////////////////////////
// ARTICLES
//////////////////////////////////////////////////////////////////////////////////////////

    // Getting App Contents...
    $oldContents = json_decode(getContent($map['contents']['url']));
    foreach( $oldContents as $key => $content ){
        $newContents[$content->slug] = $content;
    }

//////////////////////////////////////////////////////////////////////////////////////////
// MENUS
//////////////////////////////////////////////////////////////////////////////////////////

    // Created formated new languages file and object
    $oldLangs = json_decode(getContent($map['langs']['url']));
    foreach($oldLangs as $old){        
        $newLangs[] = (array) $old;
        $translation[$old->code] = [];
    }
    file_put_contents( $map['langs']['filename'], json_encode($newLangs, JSON_PRETTY_PRINT));
        
    // Getting Menus...
    $oldMainMenu = json_decode(getContent($map['main_menu']['url']));
    
    // Created formated new menus object
    foreach( $oldMainMenu as $key => $menu ){
        $oldMainMenu_[$menu->slug] = $menu;
    }

    foreach( $oldMainMenu_ as $key => $menu ){

        if(isset($menu->icon)){ getImages($menu->icon); }
        $newMenu[$key] = [
            'name' => getLabelTranslation($menu->label, $translations),
            'resource' => getSlug($menu->ionic_resource, $menu),
            'icon_url' => getImageUrl($imgDump.$menu->icon->url),
            'background_color' => $menu->background_color,
            'parent' => '/Home',
        ];

        // Setting submenu fields ;)
        $menu->menus = $menu->children[0]->menus ?? [];        
        foreach($menu->menus as $key2 => $submenu){             
            
            $thisMenu = $oldMainMenu_[$submenu->slug];

            if(isset($submenu->icon)){ getImages($submenu->icon); }

            $addMenu = [
                'name' => getLabelTranslation($thisMenu->label, $translations),
                'resource' => getSlug($thisMenu->ionic_resource, $thisMenu),
                'icon_url' => getImageUrl($imgDump.$thisMenu->icon->url),
                'background_color' => $menu->background_color,
                'parent' => $newMenu[$key]['resource'],
            ];        
            $newMenu[$key]['menus'][] = $addMenu;

        }

        // Converting articles in menu fields ;)
        $menu->contents = $contents = $menu->children[0]->contents ?? [];
        foreach($menu->contents as $key3 => $content){

            $content->ionic_resource = 'Article';
            if(isset($content->icon)){ getImages($content->icon); }

            $addMenu = [
                'name' => $content->name,
                'resource' => getSlug('Article', $content),
                'icon_url' => getImageUrl($imgDump.$content->icon->url),
                'background_color' => $menu->background_color,
                'parent' => $newMenu[$key]['resource'],
            ]; 
            $newMenu[$key]['menus'][] = $addMenu; // Apto para la navegación del menú

            // Dedicado al detalle sobre los artículos a nivel de artículo...
            completeAppContent($addMenu, $newContents[$content->slug], $translations, $map, $menu->background_color);
            $menu_[] = $addMenu;
            file_put_contents(str_replace('{id}', $content->slug, $map['contents']['filename']), json_encode($menu_, JSON_PRETTY_PRINT));
            unset($menu_);

        }

        if($menu->main){
            $mainMenu[] = $newMenu[$key];
        }

        $menu_[] = $newMenu[$key];
        file_put_contents( str_replace('{id}','full-menu-'.$menu->slug, $map['menus']['filename']), json_encode($menu_, JSON_PRETTY_PRINT));
        unset($menu_);

        file_put_contents( str_replace('{id}','sub-menu-'.$menu->slug, $map['menus']['filename']), json_encode($newMenu[$key]['menus'] ?? [], JSON_PRETTY_PRINT));

    }

    // Guardar todos los Menus Principales...
    file_put_contents( $map['main_menu']['filename'], json_encode(array_values($mainMenu), JSON_PRETTY_PRINT));


//////////////////////////////////////////////////////////////////////////////////////////
// TRANSLATIONS
//////////////////////////////////////////////////////////////////////////////////////////

    // Getting all the translations...
    $strapiTrans = json_decode(getContent($map['strapi_trans']['url']));
    foreach( $strapiTrans as $key => $trans ){
        foreach( $trans->translations as $key2 => $trans2 ){
            $translations[$trans2->language->code][$trans->name] = $trans2->label;
        }
    }

    // One file for each translation pack
    foreach($translations as $key => $translation){
        //file_put_contents (str_replace('{lang}',$key, str_replace('{object}','translations',$map['translations']['filename'])), json_encode($translation, JSON_PRETTY_PRINT));
    }   

    // Preparing a unique file with the i18next format ;)
    foreach($oldLangs as $old){
        $outTrans[$old->code]['translation'] = [];
        foreach($translations[$old->code] as $key => $translation){
            $outTrans[$old->code]['translation'][$key] = $translation;            
        }
    }

    file_put_contents( str_replace('{object}','translations',$map['translation']['filename']), json_encode($outTrans, JSON_PRETTY_PRINT));
    
    //file_put_contents( str_replace('{lang}',$key, str_replace('{object}','translations',$map['translations']['filename'])), json_encode($translation, JSON_PRETTY_PRINT));


    