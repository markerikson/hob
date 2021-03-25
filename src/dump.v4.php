<?php

class DumperClass {

    private $snapshot = 'cosa';
    private $imgDump = 'assets/dump/images';
    private $origin = 'http://161.97.167.92:1337/';
    private $mainLang = 'en-GB';

    function __construct(){
        $this->init();
        echo 'done '.$this->snapshot;
    }

    public function init(){

        $map = [
            'langs' =>         [
                'url'       => 'languages',
                'filename'  => '../public/assets/dump/others/languages.json'
            ],            
            'main_menu'     => [
                'url'       => 'app-menus', 
                'filename'  => '../public/assets/dump/menus/main-menu.json'
            ],
            'submenus'         => [
                'path'      => '../public/assets/dump/menus/',
                'filename'  => '../public/assets/dump/menus/{id}.json'
            ],
            'articles'      => [
                'url'       => 'app-articles',
                'path'      => '../public/assets/dump/articles/',
                'filename'  => '../public/assets/dump/articles/{id}.json'
            ],
            'slides' => [
                'url' => 'app-slides',
                'path' => '../public/assets/dump/articles/slides/',
                'filename' => '../public/assets/dump/articles/slides/{id}.json'
            ],
            'images' =>         [
                'path'=> 'dump/images/uploads/',
                'filename' => 'dump/images/uploads/{filename}'
            ],
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
            'contents' =>       [
                'url' => 'app-contents',
                'path'=> '../public/assets/dump/contents/',
                'filename' => '../public/assets/dump/contents/{id}.json'
            ],
            'content_slide' =>  [
                'url' => 'app-contents',
                'path'=> '../public/assets/dump/contents/',
                'filename' => '../public/assets/dump/contents/slides/{id}.json'
            ],
            'translations' =>   [
                'path' => '/i18next/',
                'filename' => './i18next/{lang}/{object}.json'
            ],
            'translation' =>    [
                'path'=> '/i18next/',
                'filename' => './i18next/{object}.json'
            ],
            'strapi_trans'  =>  [
                'url' => 'translations'
            ]*/
        ];

        foreach( $map as $key => $row){
            if(isset($row['url']) && !empty($row['url'])){
                $map[$key]['url'] = $this->origin . $map[$key]['url'];
            }
            if(isset($row['path']) && !empty($row['path'])){
                $this->cleanPath($row['path']);
            }
        }

        $this->map = $map;
        //////////////////////////////////////////////////////////////////////////////////////////
        // ARTICLES
        //////////////////////////////////////////////////////////////////////////////////////////

        // Getting App Articles...
        $oldArticles = json_decode($this->getContent($map['articles']['url']));
        foreach( $oldArticles as $key => $content ){
            $this->newArticles[$content->slug] = $content;
        }


        //////////////////////////////////////////////////////////////////////////////////////////
        // LANGUAGES
        //////////////////////////////////////////////////////////////////////////////////////////

        // Get Available languages!!        
        $oldLangs = json_decode($this->getContent($map['langs']['url']));
        foreach($oldLangs as $old){        
            $newLangs[] = (array) $old;
            $translation[$old->code] = [];
        }
        file_put_contents( $map['langs']['filename'], json_encode($newLangs, JSON_PRETTY_PRINT));
            
        //////////////////////////////////////////////////////////////////////////////////////////
        // MENUS
        //////////////////////////////////////////////////////////////////////////////////////////

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

            //////////////////////////////////////////////////////////////////////////////////////////
            // SUB MENUS
            //////////////////////////////////////////////////////////////////////////////////////////

            $newMenu[$key] = [
                'name' => $this->getLabelTranslation($menu->label, $translations),
                'resource' => $this->getSlug($menu->ionic_resource, $menu),
                'active_icon' => $this->getImageUrl2(($menu->icon->url ?? '')),
                'inactive_icon' => $this->getImageUrl2(($menu->icon_inactive->url ?? '')),
                'background_color' => $menu->background_color,
                'parent' => '/Home',
            ];

            $this->setChildren($oldMainMenu_, $menu);

            if($menu->main){
                $mainMenu[] = $newMenu[$key] ?? [];
            }

            /*
            $menu_[] = $newMenu[$key];
            file_put_contents( str_replace('{id}','full-menu-'.$menu->slug, $map['menus']['filename']), json_encode($menu_, JSON_PRETTY_PRINT));
            unset($menu_);

            file_put_contents( str_replace('{id}','sub-menu-'.$menu->slug, $map['menus']['filename']), json_encode($newMenu[$key]['menus'] ?? [], JSON_PRETTY_PRINT));
            */

        }

        //var_export($mainMenu); die();

        // Guardar todos los Menus Principales...
        file_put_contents( $map['main_menu']['filename'], json_encode(array_values($mainMenu), JSON_PRETTY_PRINT));


        //////////////////////////////////////////////////////////////////////////////////////////
        // TRANSLATIONS
        //////////////////////////////////////////////////////////////////////////////////////////

        // Getting all the translations...
        //$strapiTrans = json_decode($this->getContent($map['strapi_trans']['url']));
        //foreach( $strapiTrans as $key => $trans ){
        //    foreach( $trans->translations as $key2 => $trans2 ){
        //        $translations[$trans2->language->code][$trans->name] = $trans2->label;
        //    }
        //}

        // One file for each translation pack
        //foreach($translations as $key => $translation){
        //    //file_put_contents (str_replace('{lang}',$key, str_replace('{object}','translations',$map['translations']['filename'])), json_encode($translation, JSON_PRETTY_PRINT));
        //}   

        // Preparing a unique file with the i18next format ;)
        /*
        foreach($oldLangs as $old){
            $outTrans[$old->code]['translation'] = [];
            foreach($translations[$old->code] as $key => $translation){
                $outTrans[$old->code]['translation'][$key] = $translation;            
            }
        }

        file_put_contents( str_replace('{object}','translations',$map['translation']['filename']), json_encode($outTrans, JSON_PRETTY_PRINT));
        */

    }

    private function setChildren($oldMainMenu_, $menu){

        //////////////////////////////////////////////////////////////////////////////////////////
        // CHILDREN MENUS
        //////////////////////////////////////////////////////////////////////////////////////////

        // Setting children fields ;)
        $menu->menus = $menu->children[0]->menus ?? [];
        $menu->articles = $menu->children[0]->articles ?? [];
        //$menu->slides = $menu->children[0]->slides ?? [];
        //$menu->forms = $menu->children[0]->forms ?? [];            

        $fullMenu = [];

        if(!empty($menu->menus)){

            foreach( $menu->menus as $key => $value ){                    
                $fullMenu[] = $oldMainMenu_[$value->slug];                    
            }     

            foreach( $fullMenu as $key2 => $value ){  

                $newSubMenu[$key][$key2] = [
                    'name' => $this->getLabelTranslation($value->label, $translations),
                    'resource' => $this->getSlug($value->ionic_resource, $menu, $value->slug),
                    'active_icon' => $this->getImageUrl(($value->icon->url ?? '')),
                    'inactive_icon' => $this->getImageUrl(($value->icon_inactive->url ?? '')),
                    'background_color' => $menu->background_color,
                    'parent' => $this->getSlug($menu->ionic_resource, $menu),
                ];

            }

            if(!isset($newSubMenu[$key]) || empty($newSubMenu[$key])) $newSubMenu[$key] = [];

            file_put_contents( str_replace('{id}','sub-menu-'.$menu->slug, $this->map['submenus']['filename']), json_encode($newSubMenu[$key], JSON_PRETTY_PRINT));

        }elseif(!empty($menu->articles)){

            //////////////////////////////////////////////////////////////////////////////////////////
            // CHILDREN ARTICLE
            //////////////////////////////////////////////////////////////////////////////////////////

            $slides = $this->newArticles[$menu->articles[0]->slug]->children;
            $slidesCount = count($slides);
            $x = 0;
            foreach($slides as $key4 => $slide){
                
                if(!empty($slide->image[0])){ 
                    $this->getImages($slide->image[0]);
                }

                $addMenu['pages'][] = [
                    //'title' => $slide->title ?? '',
                    'num_tag' => ++$x.'/'.$slidesCount,
                    'image_url' => $this->getImageUrl2($slide->image[0]->url ?? ''),
                    //'description' => $slide->description ?? '',
                ];

            }

            foreach($slides as $key => $slide){

                if(isset($slide->image)){ 
                    $this->getImages($slide->image);
                }


                foreach($slide->translations as $trans ){
 
                    if(!isset($trans->language->code )) {                        
                        var_export($trans); die();
                    }

                    if(!isset($trans->description)) {                        
                        var_export($trans); die();
                    }


                    // Están en dos idiomas, pero vamos a recoger solamente en uno de los dos...
                    $matchMainLang = ( $trans->language->code == $this->mainLang );        
        
                    if($matchMainLang){
                        $mainTitle3 = $slide->name;
                        $mainDescription = $slide->description ?? 'slide_'.$slide->id;
                        $addMenu['slides'][] = [
                            'title' => $slide->name ?? '',
                            'num_tag' => ++$x.'/'.$slidesCount,
                            'image_url' => $this->getImageUrl2($slide->image[0]->url ?? ''),
                            'description' => $trans->description ?? '',
                        ];
                    }    
    
                    $translations[$trans->language->code][$mainTitle3] = $slide->name;
                    $translations[$trans->language->code][$mainDescription] = $slide->description ?? '';

                }

            }

            file_put_contents( str_replace('{id}','slide-'.$menu->articles[0]->slug, $this->map['slides']['filename']), json_encode($addMenu['slides'], JSON_PRETTY_PRINT));

        }

        //////////////////////////////////////////////////////////////////////////////////////////
        // SUB-MENUS
        //////////////////////////////////////////////////////////////////////////////////////////

        /*
                    //var_export($newMenu[$key]); die();
        
                    // Setting submenu fields ;)
                    $menu->menus = $menu->children[0]->menus ?? [];
                    $menu->slides = $menu->children[0]->slides ?? [];
        
                    var_export($menu->children); die();
        
                    foreach($menu->menus as $key2 => $submenu){             
                        
                        $thisMenu = $oldMainMenu_[$submenu->slug];
        
                        if(isset($submenu->icon)){ $this->getImages($submenu->icon); }
        
                        $addMenu = [
                            'name' => $this->getLabelTranslation($thisMenu->label, $translations),
                            'resource' => $this->getSlug($thisMenu->ionic_resource ?? '/LiveMenu', $thisMenu),
                            'inactive_icon' => $this->getImageUrl($this->imgDump.($thisMenu->icon->url ?? $menu->icon->url)),
                            'parent_icon' => $this->getImageUrl($this->imgDump.($menu->icon->url ?? '')),
                            'background_color' => $menu->background_color,
                            'parent' => $newMenu[$key]['resource'],
                        ];        
                        $newMenu[$key]['menus'][] = $addMenu;
                        var_export($thisMenu); die();
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
        */

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

    private function getImageUrl($url){
        if(!empty($url)){
            return  str_replace('dump/images/uploads/', 'images/dump/',$url);
        }else{
            return '';
        }
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

    private function completeAppArticle(&$addMenu, $allData, &$translations, $map, $color ){

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