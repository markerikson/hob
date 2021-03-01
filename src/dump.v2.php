<?php

$version = 2;

$map = [
    'langs' => ['url' => 'http://hoponboard.eu:1337/languages', 'filename' => '../public/assets/dump/others/languages.json'],
    'main_menu' => ['url' => 'http://hoponboard.eu:1337/app-menus', 'filename' => '../public/assets/dump/others/main-menu.json'],
    'all_menus' => ['url' => 'http://hoponboard.eu:1337/app-menus', 'filename' => '../public/assets/dump/others/all-menus.json'],
    'menus' => ['url' => 'http://hoponboard.eu:1337/app-menus', 'filename' => '../public/assets/dump/menus/{id}.json'],
    'contents' => ['url' => 'http://hoponboard.eu:1337/app-contents', 'filename' => '../public/assets/dump/contents/{id}.json'],
    'translations' => ['filename' => '../public/assets/dump/i18next/{lang}/{object}.json'],
    'images' => ['filename' => 'dump/images/uploads/{filename}'],
];

$structs = [
    'app-content' => [
        'article' => [
            'id' => 0,
            'name' => '',
            'icon' => '',
            'media' => [],
            'contents' => '',
        ],
        'contents' => [
            'title' =>  '',
            'lang' => '',
            'pages' => '',
            'extra_content' => '',
        ],
        'pages' => [
            'title' => '',
            'description' => '',
            'images' =>  '',
        ] 
    ],
    'app-menu' => [
        'id' => 0,
        'lang' => 'en_uk',
        'ionic_resource' => 'Article',
        'main' => false,
        'icon' => ['url'],
        'label' => '',
        'description' => '',
        'background-color' => '',
        'children' => []
    ],
    'icon' => [
        'url' => ''
    ],
    'json_header' => [
        "key" => "value",
        "keyDeep"=> [
          "inner" => "value"
        ],
    ],
    'children' => [
        'menus' => [],
        'contents' => []
    ],
    'languages' => [
        'menus' => [],
        'contents' => []
    ],
];

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
    $url = 'http://hoponboard.eu:1337' . $image->url;
    file_put_contents('../public/assets/dump/images/uploads/' . $filename, file_get_contents($url));
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

function someUnseters(&$old){
    unset($old->published_at, $old->created_at, $old->updated_at );
}

//////////////////////////////////////////////////////////////////////////////////////////
// MENUS
//////////////////////////////////////////////////////////////////////////////////////////

$imgDump = 'assets/dump/images';

// Languages::
if($version == 2){

    // Created formated new languages object
        $oldLangs = json_decode(getContent($map['langs']['url']));
        foreach($oldLangs as $old){
            someUnseters($old);
            $old->id = (string) $old->id;        
            $newLangs[] = (array) $old;
        }
        file_put_contents( $map['langs']['filename'], json_encode($newLangs, JSON_PRETTY_PRINT));
        
    // Created formated new menus object
    $oldMainMenu = json_decode(getContent($map['main_menu']['url']));
    foreach( $oldMainMenu as $menu ){

        $oldLangs = json_decode(getContent($map['langs']['url']));

        // Getting the main menus
        if(isset($menu->icon)){ getImages($menu->icon); }
        someUnseters($menu);
        $menu->resource = '/'.$menu->ionic_resource.'/'.$menu->slug;
        unset($menu->ionic_resource);
        $menu->icon_url = $imgDump.$menu->icon->url;

        //foreach($menu->label as $key4 => $label){
        //    $menu->{'label_lang_'.$label->language->code} = $label->label;
        //}

        $menu->contents = $contents = $menu->children[0]->contents ?? [];
        $menu->menus = $menu->children[0]->menus ?? [];
        
        unset($menu->children);
        foreach($menu->menus as $key2 => $submenu){
            someUnseters($menu->menus[$key2]);
            $menu->menus[$key2]->icon_url = $imgDump.$menu->menus[$key2]->icon->url;
            unset($menu->menus[$key2]->icon);
            unset($menu->menus[$key2]->main);
            unset($menu->menus[$key2]->description);
            unset($menu->menus[$key2]->background_color);
            $menu->menus[$key2]->background_color = $menu->background_color;
            if(in_array($menu->menus[$key2]->ionic_resource, ['Article', 'LiveMenu'])){
                $menu->menus[$key2]->resource = '/'.$menu->menus[$key2]->ionic_resource.'/'.$menu->menus[$key2]->slug;
            }elseif(in_array($menu->menus[$key2]->ionic_resource, ['LiveMap'])){
                $menu->menus[$key2]->resource = '/'.$menu->menus[$key2]->ionic_resource.'/1';// While only one map ;)
            }else{
                $menu->menus[$key2]->resource = '/'.$menu->menus[$key2]->ionic_resource;
            }
            unset($menu->menus[$key2]->ionic_resource);
            unset($menu->menus[$key2]->id);
            unset($menu->menus[$key2]->slug);
            $menu->menus[$key2]->parent = $menu->resource;
        }

        // Converting articles in menu fields ;)
        foreach($menu->contents as $key3 => $content){

            if(isset($menu->contents[$key3]->icon)){ $menu->contents[$key3]->icon_url = $imgDump.$menu->contents[$key3]->icon->url; }
            
            someUnseters($menu->contents[$key3]);            
            unset($menu->contents[$key3]->id);
            unset($menu->contents[$key3]->icon);
            unset($menu->contents[$key3]->main);
            unset($menu->contents[$key3]->media);
            unset($menu->contents[$key3]->description);
            unset($menu->contents[$key3]->background_color);
            $menu->contents[$key3]->background_color = $menu->background_color;
            $menu->contents[$key3]->resource = '/Article/'.$menu->contents[$key3]->slug;

            $menu->menus[] =  $menu->contents[$key3];

        }

        unset($menu->icon); 
        unset($menu->description);
        unset($menu->contents);



        unset($menu->label);

        if($menu->main){
            $newMainMenu[] = $menu;
        }
        unset($menu->main);

        // Guardo los submenús por separado (cuando hay...)
        $menuId = $menu->slug;        
        unset($menu->id);
        unset($menu->slug);
        file_put_contents( str_replace('{id}', 'sub-menu-'.$menuId, $map['menus']['filename']), json_encode($menu->menus, JSON_PRETTY_PRINT));

        // Guardo los menús completos por separado
        $menu_[] = $menu;
        file_put_contents( str_replace('{id}', 'full-menu-'.$menuId, $map['menus']['filename']), json_encode($menu_, JSON_PRETTY_PRINT));
        unset($menu_);
    }

    // Guardar el archivo de todos los menus principales
    file_put_contents( $map['main_menu']['filename'], json_encode($newMainMenu, JSON_PRETTY_PRINT));
    
    // Guardar el archivo de todos los menus
    //file_put_contents( $map['all_menus']['filename'], json_encode($oldMainMenu, JSON_PRETTY_PRINT));


    //////////////////////////////////////////////////////////////////////////////////////////
    // ARTICLES
    //////////////////////////////////////////////////////////////////////////////////////////

    // Recuperamos todos los menús en archivos con el ID en su nombre
    $articles = json_decode(getContent($map['contents']['url']));

    // Saving articles to dump !!
    foreach ($articles as $article) {

        // Getting App Content icons to dump
        if (!empty($article->icon)) {
            getImages($article->icon);
        }

        // Getting App Content media to dump
        if (!empty($article->media)) {
            getImages($article->media);
            unset($article->media);
        }

        file_put_contents(str_replace('{id}', $article->id, $map['contents']['filename']), json_encode($article, JSON_PRETTY_PRINT));

    }






























































    die('die');

}
/*
//////////////////////////////////////////////////////////////////////////////////////////
// ARCHIVOSSSSSSSSSSSSSSSSSSSSSSSSS :: JSON
//////////////////////////////////////////////////////////////////////////////////////////

// Creamos el archivo de lenguages...
$languages = setFile($map['langs']['url'], $map['langs']['filename']);

// Creamos el archivo de $menu principal
$mainMenu = setFile($map['main_menu']['url'], $map['main_menu']['filename'], $map['main_menu']['queryString'] ?? null);

// Recuperamos todos los menús en archivos con el ID en su nombre
$menus = json_decode(getContent($map['menus']['url'], $map['menus']['queryString'] ?? null));

// Guardamos cada menú con su id como cabecera, más adelante le añadiré slug...
foreach ($menus as $key => $menu) {
    file_put_contents(str_replace('{id}', $menu->id, $map['menus']['filename']), json_encode($menu, JSON_PRETTY_PRINT));
}


//////////////////////////////////////////////////////////////////////////////////////////
// ARCHIVOSSSSSSSSSSSSSSSSSSSSSSSSS :: I18NEXT files!!!
//////////////////////////////////////////////////////////////////////////////////////////


$output = setMenuContent($menus, $structs);


// Recuperamos todos los menús en archivos con el ID en su nombre
$articles = json_decode(getContent($map['contents']['url'], $map['contents']['queryString'] ?? null));

// Saving articles to dump !!
foreach ($articles as $article) {

    // Getting App Content icons to dump
    if (!empty($article->icon)) {
        getImages($article->icon);
    }

    // Getting App Content media to dump
    if (!empty($article->media)) {
        getImages($article->media);
    }

    file_put_contents(str_replace('{id}', $menu->id, $map['contents']['filename']), json_encode($articles, JSON_PRETTY_PRINT));

}


$output['contents'] = $structs['json_header'];
foreach ($articles as $article) {

    // Getting the article content
    if (!empty($article->articles)) {

        foreach ($article->articles as $art) {

            // Getting App Content title i18next translation
            if (isset($art->title) && !empty($art->title)) {
                $output['contents'][$art->language->code]['art:title:' . $art->id] = trim($art->title);
            }

            // Getting App Content extra_content i18next translation
            if (isset($art->extra_content) && !empty($art->extra_content)) {
                $output['contents'][$art->language->code]['art:extra_content:' . $art->id] = trim($art->extra_content);
            }

            // About pages
            if (!empty($art->pages)) {
                foreach ($art->pages as $page) {

                    // Getting App Content - Page - Title i18next translation
                    $output['contents'][$art->language->code]['art:page:title:' . $page->id] = trim($art->title);

                    // Getting App Content - Page - description i18next translation
                    if (!empty($art->description)) {
                        $output['contents'][$art->language->code]['art:page:description:' . $page->id] = trim($art->description);
                    }

                    // Getting App Content - Page images
                    if (!empty($page->images)) {
                        getImages($page->images);
                    }

                }

            }

        }

    }

}

// Saving article i18next translations
foreach ($languages as $key => $language) {
    file_put_contents(str_replace('{lang}', $language->code, str_replace('{object}', 'contents', $map['translations']['filename'])), json_encode($output['contents'][$language->code], JSON_PRETTY_PRINT));
}
*/