<?php

class DumperClass {

    private $snapshot = 'cosa';
    private $imgDump = 'assets/dump/images';
    private $origin = 'http://161.97.167.92:1337/';
    private $mainLang = 'en-GB';

    function __construct(){
        $this->init();
        echo 'done';
    }

    public function init(){

        $map = [
            'langs' =>          [
                'url' => 'languages',
                'filename' => '../public/assets/dump/others/languages.json'
            ],
            'main_menu' =>      [
                'url' => 'app-menus', 
                'filename' => '../public/assets/dump/others/main-menu.json'
            ],
            'all_menus' =>      [
                'url' => 'app-menus',
                'path'=> '../public/assets/dump/others/',
                'filename' => '../public/assets/dump/others/all-menus.json'
            ],
            'menus' =>          [
                'url' => 'app-menus',
                'path'=> '../public/assets/dump/menus/',
                'filename' => '../public/assets/dump/menus/{id}.json'
            ],
            'menu' =>           [
                'url' => 'app-menus',
                'path'=> '../public/assets/dump/menus/',
                'filename' => '../public/assets/dump/menus/{id}.json'
            ],
            /*'contents' =>       [
                'url' => 'app-contents',
                'path'=> '../public/assets/dump/contents/',
                'filename' => '../public/assets/dump/contents/{id}.json'
            ],
            'content_slide' =>  [
                'url' => 'app-contents',
                'path'=> '../public/assets/dump/contents/',
                'filename' => '../public/assets/dump/contents/slides/{id}.json'
            ],*/
            'articles' =>       [
                'url' => 'app-articles',
                'path'=> '../public/assets/dump/contents/articles/',
                'filename' => '../public/assets/dump/contents/articles/{id}.json'
            ],
            'pages' => [
                'url' => 'app-contents',
                'path' => '../public/assets/dump/contents/articles/pages/',
                'filename' => '../public/assets/dump/contents/articles/pages/{id}.json'
            ],
            'translations' =>   [
                'path' => '/i18next/',
                'filename' => './i18next/{lang}/{object}.json'
            ],
            'translation' =>    [
                'path'=> '/i18next/',
                'filename' => './i18next/{object}.json'
            ],
            'images' =>         [
                'path'=> 'dump/images/uploads/',
                'filename' => 'dump/images/uploads/{filename}'
            ],
            'strapi_trans'  =>  [
                'url' => 'translations'
            ]
        ];

        foreach( $map as $key => $row){
            if(isset($row['url']) && !empty($row['url'])){
                $map[$key]['url'] = $this->origin . $map[$key]['url'];
            }
            if(isset($row['path']) && !empty($row['path'])){
                $this->cleanPath($row['path']);
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////
        // ARTICLES
        //////////////////////////////////////////////////////////////////////////////////////////

        // Getting App Contents...
        //$oldContents = json_decode($this->getContent($map['contents']['url']));
        //foreach( $oldContents as $key => $content ){
        //    $newContents[$content->slug] = $content;
        //}

        // Getting App Contents...
        $oldArticles = json_decode($this->getContent($map['articles']['url']));
        foreach( $oldArticles as $key => $content ){
            $newArticles[$content->slug] = $content;
        }


        //////////////////////////////////////////////////////////////////////////////////////////
        // MENUS
        //////////////////////////////////////////////////////////////////////////////////////////

        // Created formated new languages file and object
        $oldLangs = json_decode($this->getContent($map['langs']['url']));
        foreach($oldLangs as $old){        
            $newLangs[] = (array) $old;
            $translation[$old->code] = [];
        }
        file_put_contents( $map['langs']['filename'], json_encode($newLangs, JSON_PRETTY_PRINT));
            
        // Getting Menus...
        $oldMainMenu = json_decode($this->getContent($map['main_menu']['url']));
        
        // Created formated new menus object
        foreach( $oldMainMenu as $key => $menu ){
            $oldMainMenu_[$menu->slug] = $menu;
        }

        foreach( $oldMainMenu_ as $key => $menu ){

            if(isset($menu->icon)){ 
                $this->getImages($menu->icon);
            }

            $newMenu[$key] = [
                'name' => $this->getLabelTranslation($menu->label, $translations),
                'resource' => $this->getSlug($menu->ionic_resource, $menu),
                'active_icon' => $this->getImageUrl($this->imgDump.($menu->icon->url ?? '')),
                'inactive_icon' => $this->getImageUrl($this->imgDump.($menu->icon_inactive->url ?? '')),
                'background_color' => $menu->background_color,
                'parent' => '/Home',
            ];

            // Setting submenu fields ;)
            $menu->menus = $menu->children[0]->menus ?? [];

            foreach($menu->menus as $key2 => $submenu){             
                
                $thisMenu = $oldMainMenu_[$submenu->slug];

                if(isset($submenu->icon)){ $this->getImages($submenu->icon); }

                $addMenu = [
                    'name' => $this->getLabelTranslation($thisMenu->label, $translations),
                    'resource' => $this->getSlug($thisMenu->ionic_resource, $thisMenu),
                    'active_icon' => $this->getImageUrl($this->imgDump.($thisMenu->icon->url ?? $menu->icon->url)),
                    'inactive_icon' => $this->getImageUrl($this->imgDump.($thisMenu->icon->url ?? $menu->icon->url)),
                    'parent_icon' => $this->getImageUrl($this->imgDump.($menu->icon->url ?? '')),
                    'background_color' => $menu->background_color,
                    'parent' => $newMenu[$key]['resource'],
                ];        
                $newMenu[$key]['menus'][] = $addMenu;

            }

            // Converting articles in menu fields ;)
            $menu->contents = $menu->children[0]->contents ?? [];
            foreach($menu->contents as $key3 => $content){

                $content->ionic_resource = 'Article';
                if(isset($content->icon)){
                    $this->getImages($content->icon);
                }
                $addMenu = [
                    'name' => $content->name,
                    'resource' => $this->getSlug('Article', $content),
                    'active_icon' => $this->getImageUrl($this->imgDump.($content->icon->url ?? '')),
                    'inactive_icon' => $this->getImageUrl($this->imgDump.($content->icon->url ?? '')),
                    'parent_icon' => $this->getImageUrl($this->imgDump.($menu->icon->url ?? '')),
                    'background_color' => $menu->background_color,
                    'parent' => $newMenu[$key]['resource'],
                ]; 
                $newMenu[$key]['menus'][] = $addMenu; // Apto para la navegación del menú

                // Dedicado al detalle sobre los artículos a nivel de artículo...
                $this->completeAppArticle($addMenu, $newArticles[$content->slug], $translations, $map, $menu->background_color);
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
        $strapiTrans = json_decode($this->getContent($map['strapi_trans']['url']));
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

    }

    private function getContent($url){
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

    private function getSlug($case, $object){
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

    private function getImageUrl($url = null){
        return str_replace('dump/images/uploads/', 'images/dump/',$url) ?? '';
    }

    private function getImageUrl2($url = null){
        return str_replace('uploads/', 'assets/images/dump/',$url) ?? '';
    }

    private function getLabelTranslation($labels, &$translations){
        foreach($labels as $label){
            if( $label->language->code == $this->mainLang ){
                $inMain = $label->label; 
            }
        }
        foreach($labels as $label){
            $translations[$label->language->code][$inMain] = $label->label; 
        }
        return $inMain ?? '';
    }

    private function completeAppContent(&$addMenu, $allData, &$translations, $map, $color ){

        //$this->getImages($allData->media);

        //foreach($allData->media as $key => $image){
        //    $media[] = ['icon_url' => $this->getImageUrl2($image->url)];
        //}

        //file_put_contents(str_replace('{id}', $allData->slug, $map['content_slide']['filename']), json_encode($media, JSON_PRETTY_PRINT));

        foreach($allData->articles as $key => $article){

            // Están en dos idiomas, pero vamos a recoger solamente en uno de los dos...
            $matchMainLang = ( $article->language->code == $this->mainLang );

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
                if(isset($page->image)){ 
                    $this->getImages($page->image);
                }
    
                if($matchMainLang){
                    $mainTitle3 = $page->title;
                    $mainDescription = $page->description ?? 'page_'.$page->id;
                    $addMenu['pages'][] = [
                        'title' => $page->title ?? '',
                        'image_url' => $this->getImageUrl2($page->image->url ?? ''),
                        'description' => $page->description ?? '',
                    ];
                }
                $translations[$article->language->code][$mainTitle3] = $page->title;
                $translations[$article->language->code][$mainDescription] = $page->description;
            }

            $translations[$article->language->code][$mainTitle] = $article->title;
        
        }

        if(!empty($addMenu['pages'])){
            file_put_contents (str_replace('{id}', $allData->slug, $map['pages']['filename']), json_encode($addMenu['pages'] ?? [], JSON_PRETTY_PRINT));
        }            

        file_put_contents (str_replace('{id}', $allData->slug, $map['articles']['filename']), json_encode($addMenu['articles'], JSON_PRETTY_PRINT));

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