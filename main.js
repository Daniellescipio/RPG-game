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
    inTheShop : false,
    level : 1
}
console.log(player.level)
const makeAWeapon = require("./weaponsShop")
const {food, medicine} = require("./foodAndMedicine")
const {weapons} = require("./weapons")
const fightTheDragon = require('./dragon')
player.inventory.weapons.push(weapons.hands)
const {monsters, levels, firebBreathingDragon} = require("./monsters")
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
                if(monsters.length > 0){
                    walking()
                }else{
                    console.log(`It looks like you beat all the monsters in the jungle(make sure you have a strong enough weapon) or Save the royal family(make sure you have the key)`)
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
            console.log(`Weapons: ${player.inventory.weapons.map(weapon=>weapon.name)} Food: ${foodAndMeds.food} Medicine: ${foodAndMeds.medicine} Weapon pieces: ${player.inventory.pieces.map(piece=>piece.name)}`)
        }else if(walk.toLowerCase() === "l"){
            console.log(`You have ${player.life} life points and ${player.stamina} stamina points left`)
        }else if(walk.toLowerCase() === "e"){
           if(player.inventory.backpack.indexOf(food)<0){
               console.log(`You don't have any food, wander the jungle to find some`)
           }else{
               food(player)
               const foodIndex = player.inventory.backpack.indexOf(food)
               player.inventory.backpack.splice(foodIndex, 1)
           }
        }else if(walk.toLowerCase() === "a"){
            if(player.inventory.backpack.indexOf(medicine)<0){
                console.log(`You don't have any medicine, wander the jungle to find some`)
            }else{
                medicine(player)
                const medsIndex = player.inventory.backpack.indexOf(medicine)
                player.inventory.backpack.splice(medsIndex, 1)
            }
        }else if(walk.toLowerCase() === "f"){
            player.fightingDragon = true
            if(monsters.length>0){
                console.log(`So you're a brave one huh...`)
                fightTheDragon(player)
            }else{
                    console.log(`...took you long enough.`)
                    fightTheDragon(player)
            }
            
        }else if(walk.toLowerCase() === "r"){
            if(player.inventory.weapons.indexOf(weapons.key) >= 0){
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
    if(player.life<60){
        findMedicine(player)
    }
    if(player.stamina<5){
        findFood(player)
    }
    levels.levelOne = monsters.filter(monster=>monster.level === 1)
    levels.levelTwo = monsters.filter(monster=>monster.level === 2)
    levels.levelThree = monsters.filter(monster=>monster.level === 3)
    levels.levelFour = monsters.filter(monster=>monster.level === 4)
    let randomNumber =  Math.floor((Math.random()*16)) 
    let enemies
    let randomEnemy
    if(randomNumber < 5 ){
        if(player.level === 1){ 
            if(levels.levelOne.length>0){
            enemies = Math.floor((Math.random()*5))===1 ? [...levels.levelOne, monsters[2]] : levels.levelOne
            }else{
                enemies = monsters
            }
        }else if(player.level===2){
            if(levels.levelTwo.length>0){
            enemies =Math.floor((Math.random()*5))===1 ? [...levels.levelTwo, monsters[4]] : levels.levelTwo
            }else{
                enemies = monsters
            }
        }else if(player.level ===3){
            if(levels.levelThree.length>0){
            enemies =Math.floor((Math.random()*5))===1 ? [...levels.levelThree, monsters[5]]: levels.levelThree
            }else{
                enemies = monsters
            }
        }else if(player.level === 4){
            if(levels.levelFour.length >0){
            enemies = levels.levelFour
            }else{
                enemies = monsters
            }
        }
        randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]    
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



function saveTheRoyalFamily(){
    console.log('WOW Your amazing astonishing amazing!!!! You saved the royal family and they want to reward you, with money, a palace, a princess, a prince, whatever your into! You should be poud')
    console.log(`THE END`)
    player.isAlive = false
}
    
