const readline = require("readline-sync")
const player = {
    name : "",
    life : 100,
    weapons : [],
    isAlive : true,
    attackingMonster : false,
    isRunning : false
}

player.name = readline.question('May I have your name? ')
console.log(`${player.name} welcome, to the JUNGLE! Can you defeat the monsters, collect the weapons and save the princess?`);


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
    Definition : "Sorry No weapons yet, FIGHT!",
    DamageLevel :  1
}
const club = {
    Definition : "A club! Hey batter batter, Heyy batter batter,SWING!",
    DamageLevel :  2
}
const sword =  {
    Definition : "A sword! Stick 'em with the pointy end!",
    DamageLevel :  3
}
const laserGun = {
    Definition : "A laser gun! Say hello to my not so little friend!",
    DamageLevel :  4
} 
const magicWand = {
    Definition : "AVADA KEDAVRA!",
    DamageLevel :  5
} 

player.weapons.push(hands)


while(player.isAlive){
walking()    
if(player.life === 0){
    player.isAlive = false
}
}

function walking (){
    const walk = readline.keyIn(`To continue forward, press [W]alk`, {limit: 'w'})
    if (walk == "w"){
        let randomNumber =  Math.floor((Math.random()*10)+1)        
        if(randomNumber <= 4 ){
            console.log(`Oh no, a ${randomEnemy.name} is blocking your way!`)
            const decision  = readline.keyIn(`Will you : [R]un or [F]ight`, {limit: 'rf'})
            if (decision === "r"){
                runningAway()
             }else{
                attackingEnemy()
             }
        }else{
            console.log("nothing here, better continue on")
            console.log(player.isRunning)
        }
    }

}


function runningAway(){
    while(player.isRunning = true){
    var random = Math.floor((Math.random()*10)+1)
        if(random >= 5){
            console.log(`You tripped and fell, ${randomEnemy.name} attacked you and you lost 10 life points`)
            player.life = (player.life - 10)
            console.log(player.life)
            var decisionTwo = readline.keyIn(`Will you : keep [R]unning or stand and [F]ight`, {limit: 'rf'})
            if(decisionTwo === "r"){
                player.isRunning = true
            }else{
                attackingEnemy()
                player.isRunning = false
            }          
        }else{
            console.log("You got away!")
            player.isRunning = false
            walking()
                    
        }
}
}


function attackingEnemy(){
   

    const chooseWeapon  = readline.keyIn(`Choose your weapon [h]ands, [c]club, [s]word, [l]asr gun, [m]agic wand`, {limit: 'hcslm'})
        
    if(chooseWeapon === "h"){
        for(i = 0; i < player.weapons.length; i++){
        let eachWeapon = player.weapons.indexOf(hands)
        if(eachWeapon >= 0){
            console.log("Pow Pow")
            if(enemies[i].level < e) {

                console

            }
        }else{
            console.log("It doesn't look like you have this weapon yet! Keep fighting to earn it!")
        }
        
        }
    }
    
    
}