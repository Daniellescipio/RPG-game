const readline = require("readline-sync")
const {food, medicine} = require("./foodAndMedicine")
const {weapons} = require("./weapons")
const {monsters, firebBreathingDragon} = require("./monsters")
function runningAway(randomEnemy, player){
    var runPrompt={question:`Will you : keep [R]unning or stand and [F]ight. You can also [E]at food to increase Stamina, or [A]dminister medicine to increade life`,options:{limit: 'raef'}}
    while(player.isRunning === true){
        if(player.life <= 0){
            console.log("HERE LIES THE (NOT SO) BRAVE WARRIOR WHO DIED...*checks notes*....RUNNING AWAY!")
            player.isRunning = false
        }else{
            var random = Math.floor(Math.random()* player.stamina)
            if(random < 3 && player.stamina < 5){
                lifeLoss=Math.floor(((Math.random()*(15-5)+5))/player.stamina)
                console.clear()
                console.log(` Your stamina is low! You tripped and fell, ${randomEnemy.name} attacked you and you lost ${lifeLoss} life points`)
                player.life = (player.life - lifeLoss)
                console.log(`You still have ${player.life} life points left`)
                console.clear()
                var decisionTwo = readline.keyIn(runPrompt.question, runPrompt.options)
                if(decisionTwo === "r"){
                    player.isRunning = true
                }else if(decisionTwo === 'e'){
                    food(player)
                    decisionTwo = readline.keyIn(runPrompt.question, runPrompt.options)
                }else if(decisionTwo==='a'){
                    medicine(player)
                    decisionTwo = readline.keyIn(runPrompt.question, runPrompt.options)
                }else{
                    player.attackingMonster = true
                    attackingEnemy(randomEnemy)
                    player.isRunning = false
                }          
            }else{
                console.log("You got away! But running tired you out, you lost 2 stamina points")
                player.stamina=player.stamina-2
                player.isRunning = false             
            }
        }
    }
}

function attackingEnemy(randomEnemy, player){ 
    while(player.attackingMonster === true){
        if(player.life <= 0){
            let winner
            if(randomEnemy.level<3)
            {
                winner = "LOL A " + randomEnemy.name + "sorry lol, really it was...brave."
            }else{
                winner = "A VICIOUS" + randomEnemy.name
            }
            console.log("HERE LIES THE GLORIOUSLY BRAVE WARRIOR WHO DIED ENGAGED IN HEATED BATTLE WITH ", winner )
            player.attackingMonster = false
        }else{
            let weapon = chooseYourWeapon()
            var battleObject = {
                heroAttack: Math.floor(Math.random()*weapon.attack.length),
                heroCatchPhrase: Math.floor(Math.random()*weapon.catchPhrase.length),
                heroFinishingMove: Math.floor(Math.random()*weapon.finishingMove.length),
                monsterDodge:Math.floor(Math.random()*randomEnemy.dodge.length),
                monsterHit:Math.floor(Math.random()*randomEnemy.hit.length),
                monsterAttack:Math.floor(Math.random()*randomEnemy.attack.length),
            }
            if(randomEnemy.life > 0){ 
                let weaponIndex = player.inventory.weapons.indexOf(weapon) 
                if(weaponIndex >= 0){
                    console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                    if(randomEnemy.level < weapon.DamageLevel ) {
                        winBattle(randomEnemy, weapon, player, battleObject)
                    }else{
                        battleWithWeapon(randomEnemy, weapon, player, weapon.DamageLevel, battleObject)
                    }
                }else{
                    console.log("It doesn't look like you have this weapon yet! Keep fighting to earn it!")
                }
            }else{
                winBattle(player, randomEnemy, weapon, battleObject)
            }
        }
    }
}
function chooseYourWeapon(){
    const chooseWeapon  = readline.keyIn(`Choose your weapon [h]ands, [a]xe, [s]word, [l]asr gun, [m]agic wand`, {limit: 'haslm'}) 
    let weapon    
    if(chooseWeapon === "h"){
        weapon = weapons.hands
        return weapon
    }else if(chooseWeapon === "a"){
        weapon = weapons.axe
        return weapon
    }else if(chooseWeapon === "s"){
        weapon = weapons.sword
        return weapon
    }else if(chooseWeapon === "l"){
        weapon = weapons.laserGun
        return weapon
    }else if(chooseWeapon === "m"){
        weapon = weapons.magicWand
        return weapon
    }            
} 
function missEnemy(player, randomEnemy, weapon, battleObject, weaponLevel){
    let lostLife=Math.floor(((Math.random()*randomEnemy.life)/weaponLevel) +1)
    if(player.stamina<4){
        console.log(`Your stamina is low!`)
    }
    console.log(`You ${weapon.attack[battleObject.heroAttack]} with ${weapon.name}, but ${randomEnemy.name} ${randomEnemy.dodge[battleObject.monsterDodge]} and you miss.`)
    player.life = (player.life - lostLife)
    console.log(` ${randomEnemy.name} ${randomEnemy.attack[battleObject.monsterAttack]}. You lose ${lostLife} life points.`)
    console.log(`Remaining life: ${player.life}`)
    if(player.life > 0){
        const nextChoice  = readline.keyIn(`${randomEnemy.name} still has ${randomEnemy.life} life points left. Be careful! Will you keep [F]ighting or [R]un `, {limit: 'fr'})
        if (nextChoice === "r"){
            player.isRunning = true
            runningAway(randomEnemy, player)
            player.attackingMonster = false
        }else{ 
            player.attackingMonster = true
        }
    }else{
        console.log("You think you put up a pretty good fight, but history is written by the winner and ", randomEnemy.name, "is telling everyone you never landed a single punch")
        player.isAlive = false
        player.attackingMonster =false
    }
}
function hitEnemy(player, randomEnemy, weapon, battleObject, weaponLevel){
    let attackPower=Math.floor((Math.random()*(8-4)+4))*weaponLevel
    let lostLife=Math.floor(((Math.random()*randomEnemy.life)/weaponLevel) +1)
    randomEnemy.life = randomEnemy.life - attackPower
    console.log(`You brandish ${weapon.name} and declare ${weapon.catchPhrase[battleObject.heroCatchPhrase]} before you ${weapon.attack[battleObject.heroAttack]} ${randomEnemy.name} with ${weapon.name}. ${randomEnemy.name} ${randomEnemy.hit[battleObject.monsterHit]}, you hurt them and they lost ${attackPower} life points. Now their angry! `)
    if(randomEnemy.life >0){ 
        player.life = (player.life - lostLife)
        console.log(`${randomEnemy.name} ${randomEnemy.attack[battleObject.monsterAttack]}. You lose ${lostLife} life points.`)
        console.log(`Remaining life: ${player.life}`)
        if(player.life>0){
            const nextChoice  = readline.keyIn(`${randomEnemy.name} still has ${randomEnemy.life} life points left. Be careful! Will you keep [F]ighting or [R]un `, {limit: 'fr'})
            if (nextChoice === "r"){
                player.isRunning = true
                runningAway(randomEnemy, player)
                player.attackingMonster = false
            }else{    
                player.attackingMonster = true    
            }
        }else{
            console.log(`${randomEnemy.name} ${randomEnemy.finishingMove} as they yell  ${randomEnemy.WinPhrase}`)
            player.isAlive = false
            player.attackingMonster =false
        }
    }else{
        winBattle(randomEnemy, weapon, player, battleObject)
    }
}
function battleWithWeapon(randomEnemy, weapon, player, weaponLevel, battleObject){  
    const randomNum = Math.floor(Math.random()* player.stamina)
    if(randomNum < 3 && randomEnemy !==firebBreathingDragon){
        missEnemy(player, randomEnemy, weapon, battleObject, weaponLevel)
    }else{ 
        hitEnemy(player, randomEnemy, weapon, battleObject, weaponLevel)
    }
}
function winBattle(randomEnemy, weapon, player, battleObject){
    let indexNumber = monsters.indexOf(randomEnemy)
    var newWeaponPiece = monsters[indexNumber].prizeForDefeat
    player.inventory.pieces.push(newWeaponPiece)
    monsters.splice(indexNumber, 1)

    console.log(`You can sense this fight is coming to an end. "Any last Words?" you demand as you stand over ${randomEnemy.name}. "${randomEnemy.losePhrase}" they shout. You use ${weapon.name} to ${weapon.finishingMove[battleObject.heroFinishingMove]} ${randomEnemy.name}, This fight is over. As the dust settles, you see a ${newWeaponPiece.name} lying on the ground. `)
    player.attackingMonster = false
}

module.exports = {runningAway, attackingEnemy, chooseYourWeapon, battleWithWeapon, winBattle }