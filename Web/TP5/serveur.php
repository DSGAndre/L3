<?php
$dir=$_GET["q"];


// Ouvre un dossier bien connu, et liste tous les fichiers
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        $i = 0;
        while (($file = readdir($dh)) !== false) {
            $listeFichier[$i] = $file;
            //$listeFichier[$i][1] = filetype($file);
            $i+=1;
        }
        closedir($dh);
        echo json_encode($listeFichier);
    }
}
?>