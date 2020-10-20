const readline = require("readline-sync")
// const userName = readline.question('May I have your name? ');
const player = {
    name : readline.question('May I have your name? '),
    life : 100,
    weapons : [],
    isAlive : true,
    attackingMonster : true
}
// if(player.life === 0){
//     player.isAlive = false
// }
// let isAlive = true
// let attackingMonster = false



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

// let weapons = []
player.weapons.push(hands)

function attackingEnemy(){
        let randomNumber = Math.floor(Math.random() * enemies.length)
        let randomEnemy = enemies[randomNumber]
        console.log(randomEnemy)
        console.log(`Oh no, a ${randomEnemy} is attacking you!`)
        const decision  = readline.keyIn(`Will you : [R]un or [F]ight`, {limit: 'rf'})
        if (decision === "r"){
           var random = Math.floor((Math.random()*10)+1)
           if(random >= 5){
               console.log("You got away!")
           }else{
               console.log(`You tripped and fell, ${randomEnemy} atacked you and you lost 10 life points`)
               player.life = (player.life - 10)
               console.log(player.life)
           }
        }
        

}

console.log(`${userName} welcome, to the JUNGLE! Can you defeat the monsters, collect the weapons and save the princess?`);

while(isAlive){
    const walk = readline.keyIn(`To continue forward, press [W]alk`, {limit: 'w'})
    if (walk == "w"){
        let randomEnemy =  Math.floor((Math.random()*10)+1)        
        if(randomEnemy <= 4 ){
            attackingEnemy()
            monsterAttacking = true

        }else{
            console.log("nothing here, better continue on")
        }
    }

}