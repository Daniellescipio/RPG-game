const readline = require("readline-sync")
const player = {
    name : "",
    life : 100,
    weapons : [],
    isAlive : true,
    attackingMonster : true,
    isRunning : false
}

const hands = {
    name: "these hands",
    Definition : "catch these",
    DamageLevel :  1
}
const club = {
    name : "a club",
    Definition : "A club! Hey batter batter, Heyy batter batter,SWING!",
    DamageLevel :  2
}
const sword =  {
    name : "a sword",
    Definition : "A sword! Stick 'em with the pointy end!",
    DamageLevel :  3
}
const laserGun = {
    name : "a Laser Gun",
    Definition : "A laser gun! Say hello to my not so little friend!",
    DamageLevel :  4
} 
const magicWand = {
    name : "a Magic Wand",
    Definition : "AVADA KEDAVRA!",
    DamageLevel :  5
} 

player.weapons.push(hands)


const giantOctopus = {
    name : "Giant Octopus",
    life : 10,
    level : 1,
    prizeForDefeat: club,
    
}
const bigFoot = {
    name : "Big Foot",
    life : 20,
    level : 2,
    prizeForDefeat : sword,

}
const cyclops = {
    name : "Cyclops",
    life : 30,
    level : 3,
    prizeForDefeat : laserGun,
}
const medusa = {
    name : "Medusa",
    life : 40,
    level : 4,
    prizeForDefeat : magicWand,
    
}
const zeus = {
    name : "Zeus",
    life : 50,
    level : 5,
    prizeForDefeat : "the key",
    
}
let enemies = []
enemies.push(giantOctopus, bigFoot, cyclops, medusa, zeus)







function attackingEnemy(){
   
while(player.attackingMonster === true){
    let weapon = chooseYourWeapon()
    let randomNumber = Math.floor(Math.random() * enemies.length)
    let randomEnemy = enemies[randomNumber]
    let weaponIndex = player.weapons.indexOf(weapon)
    console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
    if(weaponIndex >= 0){
        if(randomEnemy.level < weapon.DamageLevel ) {
            battleWithGoodWeapon(randomEnemy, weapon)
        }else if(randomEnemy.level === weapon.DamageLevel ){
            battleWithOkWeapon(randomEnemy, weapon)
        }else if(randomEnemy.level > weapon.DamageLevel ){
            battleWithCrappyWeapon(randomEnemy, weapon)
        }

    }else{
        console.log("It doesn't look like you have this weapon yet! Keep fighting to earn it!")
    }
}
}




attackingEnemy()


function battleWithGoodWeapon(randomEnemy, weapon,){
    
        let indexNumber = enemies.indexOf(randomEnemy)
        var newWeapon = enemies[indexNumber].prizeForDefeat
        player.weapons.push(newWeapon)
        enemies.splice(indexNumber, 1)
        console.log(`${randomEnemy.name} is no match for ${weapon.name}, you killed them and won ${newWeapon} `)
        player.attackingMonster = false
}

function battleWithOkWeapon(randomEnemy, weapon){
    let indexNumber = enemies.indexOf(randomEnemy)
    enemies[indexNumber].life = enemies[indexNumber].life - 13
    console.log(enemies[indexNumber].life)
    console.log(`You hit ${randomEnemy.name} with ${weapon.name}, you hurt them and now their angry! `)
    console.log("RAWWWRRRR")
    player.life = (player.life - 5)
    console.log(player.life)
    const nextChoice  = readline.keyIn(` ${randomEnemy.name} hit you and you lost 5 life points. Be careful! Will you keep [F]ighting or [R]un `, {limit: 'fr'})
    if(enemies[indexNumber].life <= 0){
        battleWithGoodWeapon
    }
    if(player.life === 0){
        player.isAlive = false
    }

    if (nextChoice === "r"){
        player.isRunning = true
        //runningAway()
        player.attackingMonster = false
    }else{
        player.attackingMonster = true

    }

}

function battleWithCrappyWeapon(randomEnemy, weapon){
    let indexNumber = enemies.indexOf(randomEnemy)
    enemies[indexNumber].life = enemies[indexNumber].life - 8
    console.log(enemies[indexNumber].life)
    console.log(`You hit ${randomEnemy.name} with ${weapon.name}, you've irritated them and now their angry! `)
    console.log("RAWWWRRRR")
    player.life = (player.life - 10)
    console.log(player.life)
    const nextChoice  = readline.keyIn(` ${randomEnemy.name} hit you and you lost 10 life points. Be careful! Will you keep [F]ighting or [R]un `, {limit: 'fr'})
    if(enemies[indexNumber].life <= 0){
        battleWithGoodWeapon
    }
    if(player.life === 0){
        player.isAlive = false
    }

    if (nextChoice === "r"){
        player.isRunning = true
        //runningAway()
        player.attackingMonster = false
    }else{
        player.attackingMonster = true

    }

}
function chooseYourWeapon(){
    const chooseWeapon  = readline.keyIn(`Choose your weapon [h]ands, [c]club, [s]word, [l]asr gun, [m]agic wand`, {limit: 'hcslm'}) 
      
        if(chooseWeapon === "h"){
            let weapon = hands
            return weapon
        }else if(chooseWeapon === "c"){
            let weapon = club
            return weapon
        }else if(chooseWeapon === "s"){
            let weapon = sword
            return weapon
        }else if(chooseWeapon === "l"){
            let weapon = laserGun
            return weapon
        }else if(chooseWeapon === "m"){
            let weapon = magicWand
            return weapon
        }
            
}