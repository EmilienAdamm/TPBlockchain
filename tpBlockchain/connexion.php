<?php

    function connexion() {
        $connexion = mysqli_connect('localhost', 'root');

        if ($connexion) {
            echo "<script>console.log('Connexion réussie!')</script>";
        } else {
            echo "<script>console.log('Connexion échouée!')</script>";
        }

        return $connexion;
    }

    function ouvDB($connexion, $table) {
        $db = mysqli_select_db($connexion, $table);

        if ($db) {
            echo "<script>console.log(`Table sélectionnée`)</script>";
        } else {
            echo "<script>console.log('Echec de la sélection')</script>";
        }
        return $db;
    }

?>