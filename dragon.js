const {firebBreathingDragon} = require('./monsters')
const readline = require("readline-sync")
const {chooseYourWeapon, battleWithOkWeapon, runningAway} = require('./battle')
const {weapons} = require('./weapons')

const key = weapons.key
function fightTheDragon(player){
    while(player.fightingDragon === true){
        const fightTheDragon = readline.keyIn(`Are you sure you want to do this...[Y]es or [N]o`, {limit:`yn`})
        if(fightTheDragon === 'n'){
            player.fightingDragon = false
        }else{
        if(player.inventory.weapons.indexOf(key)<0){ 
            let randomEnemy = firebBreathingDragon
            let weapon = chooseYourWeapon()
            if(player.inventory.weapons.indexOf(weapon) >= 0){        
                if(weapon.DamageLevel < randomEnemy.level){
                    console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                    console.log(`You hit ${randomEnemy.name} with ${weapon.name}, they barely felt it! `)
                    console.log("RAWWWWR *FIREBALL* RAWWWWR *FIREBALL *RAWWWWR *FIREBALL* ")
                    player.life = (player.life - 50)
                    console.log(player.life)
                    
                }else if(weapon.DamageLevel >= randomEnemy.level){
                    console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                    if(player.stamina<6||player.life<60){
                        console.log(`You're tired and week, and you say Avada kedavRAH instead of Avada keDAVra and hit the dragon with an enlarging spell instead of the killing curse. The enormous beast swings it's tail and knocks you across the lair`)
                        player.life = (player.life - 30)
                        console.log(`Remaining life: ${player.life}`)
                    }else if(player.stamina<4|| player.life<40){
                        console.log(`You can barely stand, you point you wand and mumble a weak spell that bounces off the wall, not even denting it. The Dragon is offended and bites off your head`)
            
                    }else if(player.stamina === 10 &&player.life ===100){
                        firebBreathingDragon.life=0
                    }else{
                        battleWithOkWeapon(randomEnemy, weapon, player)
                    }
                }
                if(firebBreathingDragon.life<=0){
                    console.log("RAWWWWR *FIREBALL* RAWWWWR *FIREBALL *RAWWWWR *FIREBALL* ")
                    console.log(`This dragon is no one year old wizard cloaked in love so the killng curse did them in!!`)
                    player.inventory.weapons.push(randomEnemy.prizeForDefeat)
                    console.log(`Oh Look, A key!`)
                    player.fightingDragon = false
                }
                if(player.life >0){ 
                    const nextChoice  = readline.keyIn(`Will you keep [F]ighting or [R]un `, {limit: 'fr'})
                    if (nextChoice === "r"){
                    player.isRunning = true
                    runningAway(randomEnemy, player)
                    player.fightingDragon = false
                    }else{ 
                    player.fightingDragon = true
                    }
                }else{
                    console.log("THE DRAGON ATE YOU AND NOW YOUR DEAD. BETTER LUCK NEXT TIME!")
                    player.fightingDragon = false
                    player.isAlive - false
                }
                
            }else{
            console.log("It doesn't look like you have this weapon yet! Keep fighting to earn it!")
            }
        }else{
            console.log("You already beat this dragon...is there a reason you won't go save the family or...")
            player.fightingDragon = false
        }
    }
    }
} 
module.exports = fightTheDragon