const readline = require("readline-sync")
const player = {
    name : "",
    life : 100,
    stamina:10,
    inventory : {
        weapons:[],
        backpack:[],
        pieces:[],
    },
    isAlive : true,
    attackingMonster : false,
    isRunning : false,
    haskey : false,
    fightingDragon: false,
    inTheShop : false
}
const makeAWeapon = require("./weaponsShop")
const {food, medicine} = require("./foodAndMedicine")
const {weapons} = require("./weapons")
player.inventory.weapons.push(weapons.hands)
const {monsters : enemies} = require("./monsters")
const {runningAway, attackingEnemy, chooseYourWeapon, battleWithCrappyWeapon, battleWithOkWeapon, winBattle } = require("./battle")

player.name = readline.question('May I have your name? ')
console.log(`${player.name} welcome, to the Sciptopia! The Royal family is trapped in a tower (cause these villians were like 'why stop at a princess??'). `)
const goOn = readline.keyIn(`Press [X] to continue or [Q]uit`, {limit: 'xq'})
if(goOn === 'x'){
    console.log(`They need YOUR help ${player.name}. Seriously, It HAS to be YOU ${player.name}.`)
    console.log("Here's what you'll need to know...")
    const monsterInfo = readline.keyIn(`Press [X] to continue`, {limit: 'xq'})
    if(monsterInfo === 'x'){
        console.log(`There are monsters of different strengths running through the jungle you'll need to cross to save the Royal family, and then there's the matter of the Dragon.... `)
        console.log(`Right now, all you have to protect you are your hands, and don't get me wrong, these hands are a formidable weapon, but I wouldn't try it with any monster over a level one.`)
        console.log(`But don't worry, for every monster you defeat, you'll get a peice of a weapon, visit the weapons shop to put them together and you'll be ready to fight the big guys.(ideally you want a weapon equal to or greater than the level of your opponent, duh right?)`)
        const staminaAndLife = readline.keyIn(`Press [X] to continue`, {limit: 'xq'})
        if(staminaAndLife === 'x'){
            console.log(`Wander the jungle to collect medicine and food to increase your stamina and life, but don't get greedy, only use it if you need it, otherwise add it to your inventory.`)
            console.log(`Of course, there's always one stup- I mean, "brave" player who wants to fight the dragon right away(that usually goes well).  Can you defeat the monsters, collect the weapons, and save the Royal Family???`);
        }else{
            console.log(`....ok, BYE! (but seriously, come back and play later, kay?)`)
            player.isAlive = false
        }
    }else{
        console.log(`....ok, BYE! (but seriously, come back and play later, kay?)`)
        player.isAlive = false
    }
}else{
    console.log(`....ok, BYE! (but seriously, come back and play later, kay?)`)
    player.isAlive = false
}


while(player.isAlive){
    if(player.life <= 0){
        console.log("LOSER")
        player.isAlive = false
    }else{
    const walk = readline.keyIn(`Press [W]ander to wander the Jungle, [V]isit to visit the Weapons Shop or Be Brave and [R]escue the Royal Family or [F]ight the Dragon. (You can also check your [I]nvetory and [L]ife, [E]at some food, or [A]dminister medicine. [Q]uit the game`, {limit: 'wiqlfreav'})
        if(walk.toLowerCase()==='v'){
            console.log(`Welcome to the weapons Shop`)
            player.inTheShop = true
            visitWeaponsShop()
        }else if(walk.toLowerCase() === "w"){
                if(enemies.length > 0){
                    walking()
                }else{
                    console.log(`It looks like you beat all the monsters in the jungle, time to face the Dragon. READY OR NOT!`)
                    player.fightingDragon = true
                    fightTheDragon()
                }
        }else if(walk.toLowerCase() === "i"){
            let foodAndMeds = player.inventory.backpack.reduce((final, item)=>{
                if (item.name === "food"){
                    final.food+=1
                }else if(item.name === "medicine"){
                    final.medicine+=1
                }
                return final
            }, {food:0, medicine:0})
            console.log(`Weapons: ${player.inventory.weapons.map(weapon=>weapon.name)} Food: ${foodAndMeds.food} Medicine: ${foodAndMeds.medicine} Weapon pieces: ${player.inventory.pieces}`)
        }else if(walk.toLowerCase() === "l"){
            console.log(`You have ${player.life} life points and ${player.stamina} stamina points left`)
        }else if(walk.toLowerCase() === "e"){
           if(player.inventory.backpack.indexOf(food)<0){
               console.log(`You don't have any food, wander the jungle to find some`)
           }else{
               food(player)
           }
        }else if(walk.toLowerCase() === "a"){
            if(player.inventory.backpack.indexOf(medicine)<0){
                console.log(`You don't have any medicine, wander the jungle to find some`)
            }else{
                medicine(player)
            }
        }else if(walk.toLowerCase() === "f"){
            player.fightingDragon = true
            fightTheDragon()
        }else if(walk.toLowerCase() === "r"){
            if(player.weapons.indexOf(key) >= 0){
                saveTheRoyalFamily()
            }else if(player.weapons.indexOf(key) < 0){
                console.log("You don't have a key! Did you fight the Dragon yet???? Then WHY ARE YOU HERE?! BEGONE!")
            }
        }else{
            player.isAlive = false
        }
    }
}
function visitWeaponsShop(){
    while(player.inTheShop){
        const welcometoTheShop = readline.keyIn(`What would you like to make?[A]xe, [S]word, [L]aser gun, [M]agic Wand`, {limit:'aslm'})
        if(welcometoTheShop.toLowerCase()=== 'a'){
            makeAWeapon(weapons.axe, player) 
        }else if(welcometoTheShop.toLowerCase()=== 's'){
            makeAWeapon(weapons.sword, player)
        }else if(welcometoTheShop.toLowerCase()==='l'){
            makeAWeapon(weapons.laserGun, player)
        }else{
            makeAWeapon(weapons.magicWand, player)
        }
           
    }
}
function walking (){
    let randomNumber =  Math.floor((Math.random()*16)) 
    if(randomNumber < 5 ){
        let randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]
        console.log(`Oh no, a ${randomEnemy.name} is blocking your way! ${randomEnemy.name} is a level ${randomEnemy.level} enemy with ${randomEnemy.life} life points. Think you can take 'em?`)
        const decision  = readline.keyIn(`Will you : [R]un or [F]ight`, {limit: 'rf'})
        if (decision === "r"){
            player.isRunning = true
            runningAway(randomEnemy, player)
            }else{
                player.attackingMonster = true
            attackingEnemy(randomEnemy, player)
            }
    }else  if(randomNumber > 10){
        console.log("Nothing here, better continue on!")
    }else{
        if(Math.floor(Math.random() * 11)<6){ 
            findFood(player)
        }else{
            findMedicine(player)
        }
    }
}
function findFood(){
    const takeTheFood = readline.keyIn(`You found some food, do you want to [U]se it to increase your stamina, [A]dd it to your inventory, or [I]gnore it?`,{limit:'uai'})
    if(takeTheFood==='u'){
        food(player)
    }else if(takeTheFood==='a'){       
        player.inventory.backpack.push(food)
        console.log(`Ok, your stamina is currently ${player.stamina}, you can eat your food when ever your ready!`)
    }else if(takeTheFood==='i'){ 
        console.log(`...I mean you could have used that food....but ok....I guess...`)
    }    
}
function findMedicine(){
    const takeTheMedicine = readline.keyIn(`You found a medicine pack, do you want to [U]se it to increase your health, [A]dd it to your inventory, or [I]gnore it?`,{limit:'uai'})
    if(takeTheMedicine === 'u'){
        medicine(player)
    }else if(takeTheMedicine==='a'){
        player.inventory.backpack.push(medicine)
        console.log(`Ok, your life is currently ${player.life}, you can use your medicine when ever your ready!`)
    }else if(takeTheMedicine=== 'i'){
        console.log(`...to good for medicine.... ok....I guess...`)
    }
}

function fightTheDragon(){
    while(player.fightingDragon === true){
        if(player.weapons.indexOf(key)<0){ 
            let randomEnemy = firebBreathingDragon
            console.log(`So you're a brave one huh...`)
            let weapon = chooseYourWeapon()
            if(player.weapons.indexOf(weapon) >= 0){        
                if(weapon.DamageLevel < randomEnemy.level){
                    console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                    console.log(`You hit ${randomEnemy.name} with ${weapon.name}, they barely felt it! `)
                    console.log("RAWWWWR *FIREBALL* RAWWWWR *FIREBALL *RAWWWWR *FIREBALL* ")
                    player.life = (player.life - 50)
                    console.log(player.life)
                    if(player.life >0){ 
                        const nextChoice  = readline.keyIn(` ${randomEnemy.name} hit you and you lost FIFTY life points. You should definitely RUN NOW! Will you keep [F]ighting or [R]un `, {limit: 'fr'})
                        if (nextChoice === "r"){
                        player.isRunning = true
                        runningAway(randomEnemy, weapon)
                        player.fightingDragon = false
                        }else{ 
                        player.fightingDragon = true
                        }
                    }else{
                        console.log("THE DRAGON ATE YOU AND NOW YOUR DEAD. BETTER LUCK NEXT TIME!")
                        player.fightingDragon = false
                        player.isAlive - false
                    }
                }else if(weapon.DamageLevel >= randomEnemy.level){
                    console.log(`You chose ${weapon.name}, ${weapon.Definition}`)
                    console.log(`You hit ${randomEnemy.name} with ${weapon.name}, they're reeling!!' `)
                    console.log("RAWWWWR *FIREBALL* RAWWWWR *FIREBALL *RAWWWWR *FIREBALL* ")
                    console.log(`This dragon is no one year old wizard cloaked in love so the killng curse did them in!!`)
                    player.weapons.push(randomEnemy.prizeForDefeat)
                    console.log(`Oh Look, A key!`)
                
                    player.fightingDragon = false
                }
            }else{
            console.log("It doesn't look like you have this weapon yet! Keep fighting to earn it!")
            }
        }else{
            console.log("You already beat this dragon....is there a reason you won't go save the family or.....")
            player.fightingDragon = false
        }
    }
} 


function saveTheRoyalFamily(){
    console.log('WOW Your amazing astonishing amazing!!!! You saved the royal family and they want to reward you, with money, a palace, a princess, a prince, whatever your into! You should be poud')
    console.log(`THE END`)
    player.isAlive = false
}
    