
const blockchain = document.getElementById('blockchain')
blockchain.classList.remove("blockchain")
let blockCounter = 0
let transactions = []
let isMining = false
let hasStarted = false

const demarrer = document.getElementById('demarrer')

document.getElementById("account").style.display="none"
document.getElementById("transaction").style.display="none"
document.getElementById("transacTitle").style.display="none"
document.getElementById("minageTitle").style.display="none"
document.getElementById("minage").style.display="none"
document.getElementById("pendingTransactions").style.display="none"

demarrer.addEventListener('click', () => {

    hasStarted = true

    document.getElementById("account").style.display="inline"
    document.getElementById("transaction").style.display="inline"
    document.getElementById("transacTitle").style.display="inline"
    document.getElementById("minageTitle").style.display="inline"
    document.getElementById("minage").style.display="inline"
    document.getElementById("pendingTransactions").style.display="inline"
    document.getElementById("explications").style.display="none"

    let genesisBlock = document.createElement('div')
    genesisBlock.classList.add("genBlock")
    genesisBlock.innerText = "Block genesis"

    genBlockHash = document.createElement("p")
    genBlockHash.innerHTML = `Hash du bloc: ${CryptoJS.SHA256("Genesis block").toString()}`;
    genBlockHash.classList.add("hash")

    blockIndex = document.createElement('p')
    blockIndex.innerText = `${blockCounter}`
    blockCounter++

    blockchain.appendChild(genesisBlock)
    genesisBlock.appendChild(genBlockHash)
    genesisBlock.appendChild(blockIndex)
    blockchain.classList.add("blockchain")

    demarrer.parentNode.removeChild(demarrer)

})

const bttMiner = document.getElementById("miner")
bttMiner.addEventListener("click", async (e) => {
        bttMiner.style.display ='none';
        isMining = true
        const zone = document.getElementById("minage")
        let sendButton = document.getElementById("transacEnvoy").disabled = true
        const lastHash = findHash(blockchain.lastChild)
        const index = findIndex(blockchain.lastChild) + 1

        if (transactions.length < 3) {
            const numOfTransMissing = 3 - transactions.length
            for (let i = 0; i < numOfTransMissing; i++) {
                transactions.push(fakeTransaction())
            }
        }

        let transactionsE = transactions
        let transStr = ""
        for(let i = 0; i < transactions.length ; i++) {
            transStr += transactionsE[i]
        }

        const hashSentence = document.createElement("p")
        hashSentence.innerHTML = `Contenu à hasher: ${lastHash}-${index}-${transStr}-incrément`
        hashSentence.setAttribute("name", "toDel")
        zone.appendChild(hashSentence)

        const diff = document.createElement("p")
        diff.innerHTML = "Difficulté: commence par '0'"
        diff.setAttribute("name", "toDel")
        zone.appendChild(diff)

        const increment = document.createElement("p")
        increment.innerHTML = "Incrément: "
        increment.setAttribute("name", "toDel")
        zone.appendChild(increment)

        const hash = document.createElement("p")
        hash.innerHTML = "Hash: "
        hash.setAttribute("name", "toDel")
        zone.appendChild(hash)

        let foundHash = ""
        let nonce = 0
        while (! foundHash.startsWith("0")) {
            foundHash = CryptoJS.SHA256(`${lastHash}-${index}-${transStr}-${nonce}`).toString()
            nonce++

            const pendingTransactions = document.getElementById("pendingTransactions")
            .innerHTML = ''
            transactions = []

            hash.innerHTML = `Hash: ${foundHash}`
            increment.innerHTML = `Incrément: ${nonce}`

            await sleep(1500);
        }

        const newBlock = document.createElement("div")
        newBlock.classList.add("block")
        newBlock.innerHTML = `<br>Hash précédent: ${lastHash}`

        const blockTransac = document.createElement("p")
        blockTransac.innerHTML = `Transactions: <br>-${transactionsE[0]} <br>-${transactionsE[1]} <br>-${transactionsE[2]}`
        newBlock.appendChild(blockTransac)

        const blockHash = document.createElement("p")
        blockHash.innerHTML = `Hash: ${foundHash}`
        newBlock.appendChild(blockHash)

        const pow = document.createElement("p")
        pow.innerHTML = `Preuve de travail: ${nonce}`
        newBlock.appendChild(pow)

        const indexDisp = document.createElement("p")
        indexDisp.innerHTML = index
        newBlock.appendChild(indexDisp)

        blockchain.appendChild(newBlock)


        let childrenList = document.getElementsByName("toDel")
        while (childrenList.length > 0) {
            for (const element of childrenList) {
                element.remove();
            }
        }
        //zone.innerHTML = ''

        const solde = document.getElementById("solde").textContent.replace("Solde: ", "")
        const newSolde = parseInt(solde) + getRandomInt(30)

        document.getElementById("solde").textContent = `Solde: ${newSolde}`
        isMining = false

        bttMiner.style.display ='inline';
        sendButton = document.getElementById("transacEnvoy").disabled = false

    })

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fakeTransaction() {
    const adressses = ["d297e77b8e0f41e9a5b45727ae2c73f29e25b24f4eb69b62cae11db8a5644ca1", "183a4fdc6d9c4231558acc91a0757595db2e05a355a2af47d86dcfcd46c9ba21", "c89f78f404f9510fb7e0042f511c74edbda3ee32a90a621c9ab924dece64d1fb", "61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4", "70f98078fb2c7d7bfb3ae17330b91eaa018110b03896979b4c88bfaed3805906", "cc353d17f77ce8eca34561588db03279ac0c7f33bad6b018248c9fd3fee0aef7", "6955b2914394a4d173715e0c6fd3922cb2e4397463351d60c40eac27882fac0c"]
    const tokenAmounts = getRandomInt(1000)

    let adSender = ""
    let adReceiver = ""

    while (adReceiver === adSender) {
        adSender = adressses[getRandomInt(adressses.length)]
        adReceiver = adressses[getRandomInt(adressses.length)]
    }

    transactionToAdd = `${adSender} sent ${adReceiver} ${tokenAmounts} tokens`
    return transactionToAdd
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var reps = 0;
var superTransac = setInterval(function () {
    if (! isMining && hasStarted) {
        const adressses = ["d297e77b8e0f41e9a5b45727ae2c73f29e25b24f4eb69b62cae11db8a5644ca1", "183a4fdc6d9c4231558acc91a0757595db2e05a355a2af47d86dcfcd46c9ba21", "c89f78f404f9510fb7e0042f511c74edbda3ee32a90a621c9ab924dece64d1fb", "61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4", "70f98078fb2c7d7bfb3ae17330b91eaa018110b03896979b4c88bfaed3805906", "cc353d17f77ce8eca34561588db03279ac0c7f33bad6b018248c9fd3fee0aef7", "6955b2914394a4d173715e0c6fd3922cb2e4397463351d60c40eac27882fac0c"]
        const superAdress = "ff69e58d0686f5e708df2a04893f55deef8015e54667c592644103f799a0a864"
        const tokenPoss = [30, 70, 150]

        const adReceiver = adressses[getRandomInt(adressses.length)]
        transactionToAdd = `${superAdress} sent ${adReceiver} ${tokenPoss[reps]} tokens`

        addTransac(transactionToAdd)

        reps++

        if (reps === 3) {
            window.clearInterval(superTransac);
        }
    }
}, 70000);

var ajoutTransacs = setInterval(() => {
    if (! isMining && hasStarted) {
        const adressses = ["d297e77b8e0f41e9a5b45727ae2c73f29e25b24f4eb69b62cae11db8a5644ca1", "183a4fdc6d9c4231558acc91a0757595db2e05a355a2af47d86dcfcd46c9ba21", "c89f78f404f9510fb7e0042f511c74edbda3ee32a90a621c9ab924dece64d1fb", "61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4", "70f98078fb2c7d7bfb3ae17330b91eaa018110b03896979b4c88bfaed3805906", "cc353d17f77ce8eca34561588db03279ac0c7f33bad6b018248c9fd3fee0aef7", "6955b2914394a4d173715e0c6fd3922cb2e4397463351d60c40eac27882fac0c"]
        const tokenAmounts = getRandomInt(1000)

        let adSender = ""
        let adReceiver = ""

        while (adReceiver === adSender) {
            adSender = adressses[getRandomInt(adressses.length)]
            adReceiver = adressses[getRandomInt(adressses.length)]
        }

        transactionToAdd = `${adSender} sent ${adReceiver} ${tokenAmounts} tokens`

        addTransac(transactionToAdd)
    }
}, 30000);

function findIndex (chaine) {

    let chainee = chaine.innerHTML
    let len = chainee.length
    const nums = "0123456789"
    let compteur = 0

    while (nums.indexOf(chainee[len-5].toString()) != -1) {

        compteur ++
        len--

    }

    chainee = chainee.substring(len-4)

    chainee = chainee.substring(0, compteur)

    return parseInt(chainee)
}

function findHash(chaine) {
    
    let chainee = chaine.innerHTML

    if (chainee.startsWith('Block genesis<p class="hash">Hash du bloc: ')) {

        chainee = chainee.replace('Block genesis<p class="hash">Hash du bloc: ', "");
        chainee = chainee.substring(0, 64)

    } else {

        let remStart = chainee.indexOf("Hash:")
        chainee = chainee.substring(remStart+5)

        remstart = chainee.indexOf("</p>")
        chainee = chainee.substring(1, remstart)

    }

    return chainee
}

function createHash(lastHash, index, Blocktransactions) {
    const difficulty = "0"
    let foundHash = ""
    let nonce = 0
    let transStr = ""
    for (let i = 0; i < Blocktransactions.length; i++) {
        transStr += Blocktransactions[i]
    }

    while (! foundHash.startsWith(difficulty)) {
        foundHash = CryptoJS.SHA256(`${lastHash}-${index}-${transStr}-${nonce}`).toString()
        nonce++
    }

    return [foundHash, nonce]
}

function addBlock () {

    const lastHash = findHash(blockchain.lastChild)
    const index = findIndex(blockchain.lastChild) + 1
    const hash = createHash(lastHash, index, transactions)

    const newBlock = document.createElement("div")
    newBlock.classList.add("block")
    newBlock.innerHTML = `<br>Hash précédent: ${lastHash}`

    const blockTransac = document.createElement("p")
    blockTransac.innerHTML = `Transactions: <br>-${transactions[0]} <br><br>-${transactions[1]} <br><br>-${transactions[2]}`
    newBlock.appendChild(blockTransac)

    const blockHash = document.createElement("p")
    blockHash.innerHTML = `Hash: ${hash[0]}`
    newBlock.appendChild(blockHash)

    const pow = document.createElement("p")
    pow.innerHTML = `Preuve de travail: ${hash[1]}`
    newBlock.appendChild(pow)

    const indexDisp = document.createElement("p")
    indexDisp.innerHTML = index
    newBlock.appendChild(indexDisp)


    blockchain.appendChild(newBlock)

    const pendingTransactions = document.getElementById("pendingTransactions")
        .innerHTML = ''

}

function transac(event) {

    event.preventDefault()

    const sender = document.getElementById("adresse").textContent.replace("Adresse: ", "")
    const solde = document.getElementById("solde").textContent.replace("Solde: ", "")
    const numTokens = document.getElementById("numTokens").value
    const adresse1 = document.getElementById("adresseR")
    const adresse2 = adresse1.options[adresse1.selectedIndex].value;

    if (parseInt(numTokens) > parseInt(solde)) {
        window.alert("Solde insufisant.")
    }
    else {
        transactionToAdd = `${sender} sent ${adresse2} ${numTokens} tokens`
        document.getElementById("solde").innerHTML = `Solde: ${solde - numTokens}`
        addTransac(transactionToAdd)
    }

}

function addTransac(newTransac) {
    transactions.push(newTransac)

    if (transactions.length > 2) {
        addBlock()
        transactions = []
    } else {
        const area = document.getElementById("pendingTransactions")
        const newText = document.createElement("p")
        newText.innerHTML = newTransac

        area.appendChild(newText)
    }
}