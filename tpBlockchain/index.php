<?php
    include 'connexion.php';
    ?>

<?php
    if (isset($_POST['creer'])){
        $connexion = connexion();
        $base = mysqli_select_db($connexion, "bcadress");

        $requete = "SELECT * FROM comptes;";

        $reponse = mysqli_query($connexion, $requete);
        $erreur = mysqli_error($connexion);

        while ($table = mysqli_fetch_assoc($reponse)) {
            if(($table['uName'] == $_POST['uName']) and ($table['password'] == $_POST['pwd'])) {
                $erreur = "Nom déja utilisé";

                header("Location: creation.php?". $erreur);
                exit();
            }
        }

            $adresse = hash("sha256", "". $_POST['uName']."". $_POST['pwd']."");

            $requete = "INSERT INTO comptes (uName, password, adresse)
                        VALUES ('". $_POST['uName']."','" . $_POST['pwd'] . "','". $adresse."');";
            
            $reponse = mysqli_query($connexion, $requete);
            $erreur = mysqli_error($connexion);
            if ($erreur) {
                echo $erreur;
            }
            header("Location: index.php");
    }
    else {
        echo "
        <html>

            <head>
        
            </head>
            <body>";

        if(isset($_GET['erreur'])){
            echo"<p>".$_GET['erreur']."</p>";
        }   
        echo "
                <h1>Connexion</h1>

                <form action='main.php' method='post'>
                    <label>Nom d'utilisateur:</label>
                    <input type='text' name='uName' required>

                    <label>Mot de passe:</label>
                    <input type='password' name='pwd' required>

                    <input type='submit' value='connexion' name='connexion'>
                </form>
                <br>
                <p>Pas de compte? <a href='creation.php'>cliquez ici.</a></p>
            </body>
        </html>
        ";
    }
?>
