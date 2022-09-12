<?php
    include 'connexion.php';

    if (isset($_POST['connexion'])) {

        $connexion = connexion();
        $base = mysqli_select_db($connexion, "bcadress");

        $requete = "SELECT * FROM comptes";

        $reponse = mysqli_query($connexion, $requete);
        $erreur = mysqli_error($connexion);

        if ($erreur) {
            echo "Erreur: $erreur <br>";
        }

        $passed = false;
        while ($table = mysqli_fetch_assoc($reponse)) {
            if(($table['uName'] == $_POST['uName']) and ($table['password'] == $_POST['pwd'])) {
                session_start();
                $_SESSION['account'] = $table['uName'];
                $_SESSION['adress'] = $table['adresse'];
                $_SESSION['solde'] = $table['solde'];

                $passed = true;
            }
        }
        if ( ! $passed) {
            $erreur = "Mauvais identifiants";
            header("Location: index.php?erreur=".$erreur);
            exit(); 
        }
    }
?>
<!-- DEBUT TP -->
<!-- décomposition en facteur premiers -->
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
        <link href="style.css" rel="stylesheet">
    </head>

    <body>
        <button id="demarrer">Démarrer</button>
        <p id="explications">Les questions du TP sont à réaliser dans l'ordre.<br>Ne pas fermer la page pour ne pas perdre sa progression.</p>
        <div class="account" id="account">
            <p id="adresse">Adresse: <?php
                echo $_SESSION['adress'];
            ?></p>
            <p id="solde">Solde: <?php
                echo $_SESSION['solde'];
            ?></p>
        </div>

        <div id="transaction" class="transaction">
            <form onsubmit="transac(event)" id="formTransac">
                <label>Nombre de jetons:</label>
                <input type="number" min="0" id="numTokens" required>

                <label>Adresse:</label>
                <select id="adresseR" required>
                    <option value="">Choisir une adresse</option>
                    <option value="d297e77b8e0f41e9a5b45727ae2c73f29e25b24f4eb69b62cae11db8a5644ca1">d297e77b8e0f41e9a5b45727ae2c73f29e25b24f4eb69b62cae11db8a5644ca1</option>
                    <option value="183a4fdc6d9c4231558acc91a0757595db2e05a355a2af47d86dcfcd46c9ba21">183a4fdc6d9c4231558acc91a0757595db2e05a355a2af47d86dcfcd46c9ba21</option>
                    <option value="c89f78f404f9510fb7e0042f511c74edbda3ee32a90a621c9ab924dece64d1fb">c89f78f404f9510fb7e0042f511c74edbda3ee32a90a621c9ab924dece64d1fb</option>
                    <option value="61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4">61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4</option>
                </select>
                <input type="submit" value="Envoyer" id="transacEnvoy">
            </form>
        </div>

        <h1 class="transacTitle" id="transacTitle">Transactions en attente</h1>
        <div id="pendingTransactions" class="pendingTransactions">
        </div>

        <h1 class="minageTitle" id="minageTitle">Minage</h1>
        <div class="minage" id="minage">
            <button id="miner" class="miner">Miner un block</button>
        </div>

        <div class="blockchain" id="blockchain">
        </div>
    </body>
    <script src="script.js"></script>
</html>