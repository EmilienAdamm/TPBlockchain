<?php
    include 'connexion.php';
?>

<html>

    <head>

    </head>


    <body>

        <?php
            if(isset($_GET['erreur'])) {
                echo $_GET['erreur'];
                var_dump($_GET);
            }
        ?>

        <h1>Creation de compte</h1>
        <form action='index.php' method='POST'>

            <label>Nom d'utilisateur</label>
            <input type="text" name="uName" required>

            <label>Mot de passe</label>
            <input type="password" name="pwd" required>

            <input type="submit" value="Creer" name="creer">
        </form>

        <a href="index.php">Se connecter</a>
    </body>


</html>