<?php

$version = 2;

$map = [
    'langs' => ['url' => 'http://hoponboard.eu:1337/languages', 'filename' => 'dump/others/languages.json'],
    'main_menu' => ['url' => 'http://hoponboard.eu:1337/app-menus', 'filename' => 'dump/others/main_menu.json'],
    'all_menus' => ['url' => 'http://hoponboard.eu:1337/app-menus', 'filename' => 'dump/others/all_menus.json'],
    'menus' => ['url' => 'http://hoponboard.eu:1337/app-menus', 'filename' => '../public/assets/dump/menus/{id}.json'],
    'articles' => ['url' => 'http://hoponboard.eu:1337/app-contents', 'filename' => '../public/assets/dump/articles/{id}.json'],
    'translations' => ['filename' => 'dump/i18next/{lang}/{object}.json'],
    'images' => ['filename' => 'dump/images/uploads/{filename}'],
];

$structs = [
    'app-content' => [
        'article' => [
            'id' => 0,
            'name' => '',
            'icon' => '',
            'media' => [],
            'articles' => '',
        ],
        'articles' => [
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

// Languages::
if($version == 2){

    $imgDump = 'assets/dump/images';

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
        if(isset($menu->icon)) getImages($menu->icon);
        someUnseters($menu);
        //$menu->id = (string) $menu->id;
        //unset($menu->children);
        $menu->icon_url = $imgDump.$menu->icon->url;

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
            if(in_array($menu->menus[$key2]->ionic_resource, ['Article', 'LiveMenu'])){
                $menu->menus[$key2]->resource = '/'.$menu->menus[$key2]->ionic_resource.'/'.$menu->menus[$key2]->id;
            }elseif(in_array($menu->menus[$key2]->ionic_resource, ['Article', 'LiveMap'])){
                $menu->menus[$key2]->resource = '/'.$menu->menus[$key2]->ionic_resource.'/1';
            }
            unset($menu->menus[$key2]->ionic_resource);
            unset($menu->menus[$key2]->id);
        }

        foreach($menu->contents as $key3 => $content){

            if(isset($menu->contents[$key3]->icon)) $menu->contents[$key3]->icon_url = $imgDump.$menu->contents[$key3]->icon->url;
            
            someUnseters($menu->contents[$key3]);            
            unset($menu->contents[$key3]->icon);
            unset($menu->contents[$key3]->main);
            unset($menu->contents[$key3]->description);
            unset($menu->contents[$key3]->background_color);
            unset($menu->contents[$key3]->media);
            $menu->contents[$key3]->resource = '/Article/'.$menu->contents[$key3]->id;
            unset($menu->contents[$key3]->id);

            file_put_contents( str_replace('{id}', 'menu-contents-'.$menu->id, $map['menus']['filename']), json_encode($menu->contents, JSON_PRETTY_PRINT));          
            $menu->menus[] =  $menu->contents[$key3];

        }

        unset($menu->icon); 
        unset($menu->description);
        unset($menu->contents);

        foreach($menu->label as $key4 => $label){
            $menu->{'label_lang_'.$label->language->code} = $label->label;
        }

        unset($menu->label);

        if($menu->main){
            $newMainMenu[] = $menu;
        }

        // Guardo los submenús por separado (cuando hay...)
        file_put_contents( str_replace('{id}', 'sub_menu-'.$menu->id, $map['menus']['filename']), json_encode($menu->menus, JSON_PRETTY_PRINT));

        // Guardo los menús completos por separado
        file_put_contents( str_replace('{id}', 'full_menu-'.$menu->id, $map['menus']['filename']), json_encode($menu, JSON_PRETTY_PRINT));

    }

    // Guardar el archivo de todos los menus principales
    file_put_contents( $map['main_menu']['filename'], json_encode($newMainMenu, JSON_PRETTY_PRINT));
    
    // Guardar el archivo de todos los menus
    file_put_contents( $map['all_menus']['filename'], json_encode($oldMainMenu, JSON_PRETTY_PRINT));


    //////////////////////////////////////////////////////////////////////////////////////////
    // ARTICLES
    //////////////////////////////////////////////////////////////////////////////////////////


    // Recuperamos todos los menús en archivos con el ID en su nombre
    $articles = json_decode(getContent($map['articles']['url']));

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

        file_put_contents(str_replace('{id}', $article->id, $map['articles']['filename']), json_encode($article, JSON_PRETTY_PRINT));

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
$articles = json_decode(getContent($map['articles']['url'], $map['articles']['queryString'] ?? null));

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

    file_put_contents(str_replace('{id}', $menu->id, $map['articles']['filename']), json_encode($articles, JSON_PRETTY_PRINT));

}


$output['articles'] = $structs['json_header'];
foreach ($articles as $article) {

    // Getting the article content
    if (!empty($article->articles)) {

        foreach ($article->articles as $art) {

            // Getting App Content title i18next translation
            if (isset($art->title) && !empty($art->title)) {
                $output['articles'][$art->language->code]['art:title:' . $art->id] = trim($art->title);
            }

            // Getting App Content extra_content i18next translation
            if (isset($art->extra_content) && !empty($art->extra_content)) {
                $output['articles'][$art->language->code]['art:extra_content:' . $art->id] = trim($art->extra_content);
            }

            // About pages
            if (!empty($art->pages)) {
                foreach ($art->pages as $page) {

                    // Getting App Content - Page - Title i18next translation
                    $output['articles'][$art->language->code]['art:page:title:' . $page->id] = trim($art->title);

                    // Getting App Content - Page - description i18next translation
                    if (!empty($art->description)) {
                        $output['articles'][$art->language->code]['art:page:description:' . $page->id] = trim($art->description);
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
    file_put_contents(str_replace('{lang}', $language->code, str_replace('{object}', 'articles', $map['translations']['filename'])), json_encode($output['articles'][$language->code], JSON_PRETTY_PRINT));
}
*/