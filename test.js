const readline = require("readline-sync")
const player = {
    name : "",
    life : 100,
    weapons : [],
    isAlive : true,
    attackingMonster : false,
    isRunning : false
}

const giantOctopus = {
    name : "Giant Octopus",
    life : 10,
    level : 1
}
const bigFoot = {
    name : "Big Foot",
    life : 10,
    level : 2
}
const cyclops = {
    name : "Cyclops",
    life : 10,
    level : 3
}
const medusa = {
    name : "Medusa",
    life : 10,
    level : 4
}
const zeus = {
    name : "Zeus",
    life : 10,
    level : 5,
}
let enemies = []
enemies.push(giantOctopus, bigFoot, cyclops, medusa, zeus)

let randomNumber = Math.floor(Math.random() * enemies.length)

let randomEnemy = enemies[randomNumber]


const hands = {
    definition : "Sorry No weapons yet, FIGHT!",
    damageLevel :  1
}
const club = {
    definition : "A club! Hey batter batter, Heyy batter batter,SWING!",
    damageLevel :  2
}
const sword =  {
    definition : "A sword! Stick 'em with the pointy end!",
    damageLevel :  3
}
const laserGun = {
    definition : "A laser gun! Say hello to my not so little friend!",
    damageLevel :  4
} 
const magicWand = {
    definition : "AVADA KEDAVRA!",
    damageLevel :  5
} 

player.weapons.push(hands)

function attackingEnemy(){
   

    const chooseWeapon  = readline.keyIn(`Choose your weapon [h]ands, [c]club, [s]word, [l]asr gun, [m]agic wand`, {limit: 'hcslm'})
        
    if(chooseWeapon === "h"){
        for(i = 0; i < player.weapons.length; i++){
        let eachWeapon = player.weapons.indexOf(hands)
        if(eachWeapon >= 0){
            console.log("Pow Pow")
            if(enemies[i].level < player.weapons[i].damageLevel) {
                console.log(`You beat `)
            }
        }else{
            console.log("It doesn't look like you have this weapon yet! Keep fighting to earn it!")
        }
        
        }
    }
    
    
}

attackingEnemy()