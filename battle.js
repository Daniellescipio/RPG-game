const readline = require("readline-sync")
const {food, medicine} = require("./foodAndMedicine")
const {weapons} = require("./weapons")
const {monsters, firebBreathingDragon} = require("./monsters")
function runningAway(randomEnemy, player){
    while(player.isRunning === true){
        if(player.life <= 0){
            console.log("LOSER")
            player.isRunning = false
        }else{
            var random = Math.floor(Math.random()* player.stamina)
            if(random < 3 && player.stamina < 5){
                console.log(` Your stamina is low! You tripped and fell, ${randomEnemy.name} attacked you and you lost 10 life points`)
                player.life = (player.life - 10)
                console.log(`You still have ${player.life} life points left`)
                var decisionTwo = readline.keyIn(`Will you : keep [R]unning or stand and [F]ight. You can also [E]at food to increase Stamina, or [A]dminister medicine to increade life`, {limit: 'raef'})
                if(decisionTwo === "r"){
                    player.isRunning = true
                }else if(decisionTwo === 'e'){
                    food(player)
                    decisionTwo = readline.keyIn(`Will you : keep [R]unning or stand and [F]ight. You can also [E]at food to increase Stamina, or [A]dminister medicine to increade life`, {limit: 'rf'})
                }else if(decisionTwo==='a'){
                    medicine(player)
                    decisionTwo = readline.keyIn(`Will you : keep [R]unning or stand and [F]ight. You can also [E]at food to increase Stamina, or [A]dminister medicine to increade life`, {limit: 'rf'})
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
            console.log("LOSER")
            player.attackingMonster = false
        }else{
            if(randomEnemy.life > 0){ 
                let weapon = chooseYourWeapon()
                let weaponIndex = player.inventory.weapons.indexOf(weapon) 
                if(weaponIndex >= 0){
                    console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                    if(randomEnemy.level < weapon.DamageLevel ) {
                        console.log(randomEnemy)
                        winBattle(randomEnemy, weapon, player)
                    }else if(randomEnemy.level === weapon.DamageLevel ){
                        battleWithOkWeapon(randomEnemy, weapon, player)
                    }else if(randomEnemy.level > weapon.DamageLevel ){
                        battleWithCrappyWeapon(randomEnemy, weapon, player)
                    }
                }else{
                    console.log("It doesn't look like you have this weapon yet! Keep fighting to earn it!")
                }
            }else{
                winBattle(player, randomEnemy, weapon)
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
function winBattle(randomEnemy, weapon, player){
    
    let indexNumber = monsters.indexOf(randomEnemy)
    var newWeaponPiece = monsters[indexNumber].prizeForDefeat
    player.inventory.pieces.push(newWeaponPiece)
    monsters.splice(indexNumber, 1)
    console.log(`${randomEnemy.name} is no match for ${weapon.name}, you killed them and won ${newWeaponPiece.name} `)
    player.attackingMonster = false
}

function battleWithOkWeapon(randomEnemy, weapon, player){  
    const randomNum = Math.floor(Math.random()* player.stamina)
    if(randomNum <3 && randomEnemy !==firebBreathingDragon){
        if(player.stamina<5){
            console.log(`Your Stamina is low!You swung and missed!`)
        }
        console.log(`You swung and missed!`)
        console.log("RAWWWRRRR")
        player.life = (player.life - 10)
        console.log(`${randomEnemy.name} hit you and you lost 10 life points.`)
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
            player.isAlive = false
            player.attackingMonster =false
        }
    }else{ 
        randomEnemy.life = randomEnemy.life - 10
        console.log(`You hit ${randomEnemy.name} with ${weapon.name}, you hurt them and now their angry! `)
        console.log("RAWWWRRRR")
        if(randomEnemy.life >0){ 
            player.life = (player.life - 10)
            console.log(`${randomEnemy.name} hit you and you lost 10 life points.`)
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
                player.isAlive = false
                player.attackingMonster =false
            }
        }else{
            winBattle(randomEnemy, weapon, player)
        }
    }
}

function battleWithCrappyWeapon(randomEnemy, weapon, player){
    const randomNum = Math.floor(Math.random()* player.stamina)
    if(randomNum <3){
        if(player.stamina<5){
            console.log(`Your Stamina is low!You swung and missed!`)
        }
        console.log(`You swung and missed!`)
        console.log("RAWWWRRRR")
        player.life = (player.life - 20)
        console.log(`${randomEnemy.name} hit you and you lost 20 life points.`)
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
            player.isAlive = false
            player.attackingMonster =false
        }
    
    }else{
        randomEnemy.life = randomEnemy.life - 6
        console.log(`You hit ${randomEnemy.name} with ${weapon.name}, you've irritated them and now their angry! `)
        console.log(`${randomEnemy.name} now has ${randomEnemy.life} life left`)
        console.log("RAWWWRRRR")
        if(randomEnemy.life >0){ 
            console.log(`${randomEnemy.name} hit you and you lost 20 life points.`)
            player.life = (player.life - 20)
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
                player.isAlive = false
                player.attackingMonster =false
            }
        }else{
            winBattle(randomEnemy,weapon, player)
        }
    }
}

module.exports = {runningAway, attackingEnemy, chooseYourWeapon, battleWithCrappyWeapon, battleWithOkWeapon, winBattle }