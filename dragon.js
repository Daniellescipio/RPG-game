const {firebBreathingDragon} = require('./monsters')
const readline = require("readline-sync")
const {chooseYourWeapon, battleWithWeapon, runningAway} = require('./battle')
const {weapons} = require('./weapons')

const key = weapons.key
function fightTheDragon(player){
    const fightTheDragon = readline.keyIn(`Are you sure you want to do this?? Do you feel healthy and high energy?? Do you Have the right weapons??[Y]es or [N]o`, {limit:`yn`})
    while(player.fightingDragon === true){
        if(fightTheDragon === 'n'){
            player.fightingDragon = false
        }else{
            if(player.inventory.weapons.indexOf(key)<0){ 
                let randomEnemy = firebBreathingDragon
                let weapon = chooseYourWeapon()
                var battleObject = {
                    heroAttack: Math.floor(Math.random()*weapon.attack.length),
                    heroCatchPhrase: Math.floor(Math.random()*weapon.catchPhrase.length),
                    heroFinishingMove: Math.floor(Math.random()*weapon.finishingMove.length),
                    dragonDodge:Math.floor(Math.random()*randomEnemy.dodge.length),
                    dragonHit:Math.floor(Math.random()*randomEnemy.hit.length),
                    dragonAttack:Math.floor(Math.random()*randomEnemy.attack.length),
                }
                if(player.inventory.weapons.indexOf(weapon) >= 0){        
                    if(weapon.DamageLevel < randomEnemy.level){
                        console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                        console.log(`You hit ${randomEnemy.name} with ${weapon.name}, the ${randomEnemy.name} barely notices it as it ${randomEnemy.dodge[battleObject.dragonDodge]} and ${randomEnemy.attack[battleObject.dragonAttack]}`)
                        bigLifeLoss=Math.floor((Math.random()*(75-25)+25))/weapon.DamageLevel
                        bigStaminaLoss=Math.floor((Math.random()*(9-5)+5))/weapon.DamageLevel
                        player.life = (player.life - bigLifeLoss)
                        player.stamina = player.stamina - bigStaminaLoss
                        console.log(`You lose ${bigLifeLoss} life points and ${bigStaminaLoss} stamina points.Life: ${player.life} Stamina:${player.stamina}`)
                    }else if(weapon.DamageLevel >= randomEnemy.level){
                        console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                        if(player.stamina<6||player.life<60){
                            console.log(`You're tired and week, and you say Avada kedavRAH instead of Avada keDAVra and hit the dragon with an enlarging spell instead of the killing curse. The the ${randomEnemy.name} ${randomEnemy.dodge[battleObject.dragonDodge]} and ${randomEnemy.attack[battleObject.dragonAttack]}`)
                            mediumLifeLoss=Math.floor((Math.random()*(75-25)+25))/weapon.DamageLevel
                            mediumStaminaLoss=Math.floor((Math.random()*(9-5)+5))/weapon.DamageLevel
                            player.life = (player.life - mediumLifeLoss)
                            player.stamina=player.life - mediumStaminaLoss
                            console.log(`You lose ${mediumLifeLoss} life points and ${mediumStaminaLoss} stamina points.Life: ${player.life} Stamina:${player.stamina}`)
                        }else if(player.stamina<4|| player.life<40){
                            console.log(`You can barely stand, you point your wand and mumble a weak spell that bounces off the wall, not even denting it. The Dragon is offended and ${randomEnemy.finishingMove}`)
                            console.log(`The ${randomEnemy.name} roars ${randomEnemy.winPhrase} as your ashes blow around it's dungeon`)
                            player.life=0
                        }else if(player.stamina === 10 &&player.life ===100){
                            console.log(`You wave your wand and with all your might shout a killing spell. the ${randomEnemy.name} ${randomEnemy.hit[battleObject.dragonHit]}. ${randomEnemy.losePhrase} the dragon gasp as their eyes fall closed`)
                            firebBreathingDragon.life=0
                        }else{
                            battleWithWeapon(randomEnemy, weapon, player, weapon.DamageLevel, battleObject)
                        }
                    }
                    if(firebBreathingDragon.life<=0){
                        console.log(`That dragon was no one year old wizard cloaked in love so the killng curse did them in!!`)
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
                        console.log(`The ${randomEnemy.name} ${randomEnemy.finishingMove}`)
                        console.log(`The ${randomEnemy.name} roars ${randomEnemy.winPhrase} as your ashes blow around it's dungeon`)
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