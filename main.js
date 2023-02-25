const readline = require("readline-sync")
//player object icludes player name, life stats, inventory, and several booleans to keep track of the game. 
const player = {
    name : "",
    life : 100,
    stamina:10,
    inventory : {
        weapons:[],
        backpack:{medicine:[], food:[]},
        pieces:[],
    },
    //game runs while this is true
    isAlive : true,
    //triggers monster fight
    attackingMonster : false,
    //triggers flee from monster fight
    isRunning : false,
    //allows player to/bars player from dragon fight
    haskey : false,
    //triggers dragon fight
    fightingDragon: false,
    //for shopping in and creating a weapon in the weapons shop
    inTheShop : {
        shopping:false,
        making:false
    },
    //All players start at level one
    level : 1
}

//imports
const makeAWeapon = require("./weaponsShop")
const {food, medicine, findFood, findMedicine, foodOptions, medOptions} = require("./foodAndMedicine")
const {weapons, weaponPieces} = require("./weapons")
const {monsters, levels} = require("./monsters")
const {runningAway, attackingEnemy} = require("./battle")
const fightTheDragon = require('./dragon')
//all players start with these hands
player.inventory.weapons.push(weapons.hands)
//**Enter Cheat code below */
//player.inventory.pieces.push(weaponPieces.wood, weaponPieces.metal)


//introduction and exits defined + game intro
const continueIntroScript = {question:`Press [X] to continue or [Q]uit`, options:{limit: 'xq'}}
var intro = true
var niceExit="...ok, BYE! (but seriously, come back and play later, kay?)"
var meanExit="LOSER!"
console.clear()
player.name = readline.question('May I have your name? ')
console.log(`${player.name} welcome, to the Sciptopia! The ENTIRE Royal family is trapped in a tower (cause these villians were like 'why stop at a princess??'). `)
var goOn = readline.keyIn(continueIntroScript.question,continueIntroScript.options )
//both conditions allow player to exit during intro
while(intro && player.isAlive){
    if(goOn === 'x'){
        console.clear()
        console.log(`They need YOUR help ${player.name}. Seriously, It HAS to be YOU ${player.name}. Some other people tried and ... NVM`)
        console.log("Here's what you'll need to know...")
        const monsterInfo = readline.keyIn(continueIntroScript.question,continueIntroScript.options )
        if(monsterInfo === 'x'){
            console.clear()
            console.log(`There are monsters running through the jungle, which you'll need to cross in order to save the royal family. Some monsters are super scary, some not so much. And of course there's the matter of the Dragon.... `)
            console.log(`Right now, all you have to protect you are your hands, and don't get me wrong, these hands are a formidable weapon, but you'll need to fight monsters to get better weapons.`)
            console.log(`Every monster you defeat will surrender a weapon piece. Visit the weapons shop to put them together and you'll be ready to fight the big guys.`)
            const staminaAndLife = readline.keyIn(continueIntroScript.question,continueIntroScript.options )
            if(staminaAndLife === 'x'){
                console.clear()
                console.log(`If you get beat up, you can collect medicine to heal yourself. If you lose to much energy from running away -_-, you can find food to increase stamina. Always remember its best to store food and medicine in your inventory when you don't need it!`)
                console.log(`When you're ready(And we I don't recommend trying it any sooner) Find and Fight the Dragon to save the royal family.  Can you defeat the monsters, collect the weapons, and save the Day???`);
                const finsihIntro = readline.keyIn(continueIntroScript.question,continueIntroScript.options )
                if(finsihIntro === 'x'){
                    console.clear()
                    console.log("Alrighty Then...")
                    intro=false
                }
            }
        }
    }
        console.log(niceExit)
        player.isAlive = false
}
//Condenses and displays player inventory
function checkInventory(bool){
    var foodItems="You have "
    var medItems = "You have "
    for (let i=0;i<player.inventory.backpack.food.length; i++){
        var foodStuff= foodOptions.find(element=>element.name===player.inventory.backpack.food[i])
        foodItems=foodItems.concat(foodStuff.name, `(X${foodStuff.qnty}) `)
    }
    for (let i=0;i<player.inventory.backpack.medicine.length; i++){
        var healthStuff= medOptions.find(element=>element.name===player.inventory.backpack.medicine[i])
        medItems = medItems.concat(healthStuff.name, `(X${healthStuff.qnty}) `)
    }
    if(!bool){
        console.log(
            `
            Weapons: ${player.inventory.weapons.length >0 ?player.inventory.weapons.map(weapon=>weapon.name):"no weapons"},  
            Food: ${player.inventory.backpack.food.length >0 ?foodItems : "no food"}, 
            Medicine: ${player.inventory.backpack.medicine.length >0 ? medItems:"no medicine"}, 
            Weapon pieces: ${player.inventory.pieces.length===0 ? 'no weapon pieces':player.inventory.pieces.map(piece=>piece.name)}`
            )
    }else{
        console.log(
            `
            Weapons: ${player.inventory.weapons.length >0 ?player.inventory.weapons.map(weapon=>weapon.name):"no weapons"},  
            Weapon pieces: ${player.inventory.pieces.length===0 ? 'no weapon pieces':player.inventory.pieces.map(piece=>piece.name)}`
            )
    }
   
}
//This is the game loop, it will run calling different functions until a player dies or exits
while(player.isAlive){
    //if the function starts and the player is dead we can assume they died somewhere in the game so this will end the game before the prompt to continue the game is called
    if(player.life <= 0){
        console.log(meanExit)
        player.isAlive = false
    }else{
        //reoccuring choice for the player. after every function is complete, the player should return here
    const walk = readline.keyIn(`Press [W]ander to wander the Jungle, [V]isit to visit the Weapons Shop or Be Brave and [R]escue the Royal Family or [F]ight the Dragon. (You can also check your [I]nvetory and [L]ife, [E]at some food, or [A]dminister medicine. [Q]uit the game`, {limit: 'wiqlfreav'})  
    if(walk.toLowerCase()==='v'){
    //triggers the weapons shop 
        console.log(`You make your way through the woods to an old dilapilated shack. Inside is a gruff older man, a fire blazing behind him. "What do you want!?" He shouts.`)
            player.inTheShop.shopping = true
            visitWeaponsShop()
        }else if(walk.toLowerCase() === "w"){
            //Triggers walking funtion ***this is changing soon, but for now , a player can only wander the jungle if there are no more mosters. 
            console.clear()
                if(monsters.length > 0){
                    walking()
                }else{
                    console.log(`It looks like you beat all the monsters in the jungle. It's time to Fight the dragon(make sure you have a strong enough weapon) or Save the royal family(make sure you have the key)`)
                }
                
        }else if(walk.toLowerCase() === "i"){
            //displays a players inventory
            checkInventory()
        }else if(walk.toLowerCase() === "l"){
            //displays a players life and stamina stats
            console.clear()
            console.log(`You have ${player.life} out of 100 life points and ${player.stamina} out of 10 stamina points left`)
        }else if(walk.toLowerCase() === "e"){
            console.clear()
            //triggers a gamble if a player has no food
           if(player.inventory.backpack.food.length<=0){
               gambleWithSupplies("food")
           }else{
            //triggers eating function
               food(player)
           }
        }else if(walk.toLowerCase() === "a"){
            console.clear()
            if(player.inventory.backpack.medicine.length<=0){
                  //triggers a gamble if a player has no medicine
                gambleWithSupplies("med")
            }else{
                //triggers medicin function
                medicine(player)
            }
        }else if(walk.toLowerCase() === "f"){
            //triggers dragon fight
            console.clear()
            player.fightingDragon = true
            //if they don't have the magic wand yet...
            if(monsters.length>0){
                console.log(`So you're a brave one huh...`)
                fightTheDragon(player)
                //if they have the wand
            }else{
                    console.log(`...took you long enough.`)
                    fightTheDragon(player)
            }
            
        }else if(walk.toLowerCase() === "r"){
            //rescues the royal family
            if(player.inventory.weapons.indexOf(weapons.key) >= 0){
                //if the player has the key ...
                console.log(`...took you long enough.`)
                saveTheRoyalFamily()
            }else if(player.inventory.weapons.indexOf(weapons.key) < 0){
                //if the player does not have the key...
                console.log("You don't have a key! Did you fight the Dragon yet???? Then WHY ARE YOU HERE?! BEGONE!")
            }
        }else{
            //ends the game
            if(player.life<=0){
                console.log(meanExit)
            }else{
                console.log(niceExit)
            }
            player.isAlive = false
        }
    }
}


function visitWeaponsShop(){
    // this is hopping in the weapons shop, it allows a player to choose a weapon and triggers making a weapon in the weapons shop
    while(player.inTheShop.shopping){
        const welcometoTheShop = readline.keyIn(`What would you like to make?[A]xe, [S]word, [L]aser gun, [M]agic Wand, [X]Exit You may also [C]heck your weapons inventory`, {limit:'aslmxc'})
        player.inTheShop.making=true
        if(welcometoTheShop.toLowerCase()=== 'a'){
            //makes an axe
            makeAWeapon(weapons.axe, player) 
        }else if(welcometoTheShop.toLowerCase()=== 's'){
             //makes a sword
            makeAWeapon(weapons.sword, player)
        }else if(welcometoTheShop.toLowerCase()==='l'){
             //makes a laser gun
            makeAWeapon(weapons.laserGun, player)
        }else if(welcometoTheShop.toLowerCase()==='m'){
             //makes a magic wand
            makeAWeapon(weapons.magicWand, player)
        }else if(welcometoTheShop.toLowerCase()==='c'){
            //shows a player their weapons and weapon pieces
            console.clear()
            console.log("The old man grumbles something about wasting his time as you look through your bag...")
            checkInventory(true)
        }else{
            //ejects player from weapons shop and triggers opreoccuring prompt
            player.inTheShop.shopping=false
        }
           
    }
}
//main function to get a player through the game. trigger several other functions. 
function walking (){
    //if a player has low life they will find medicine
    if(player.life<20){
        findMedicine(player)
    }
     //if a player has low stamina they will find food
    if(player.stamina<2){
        findFood(player)
    }
    //sorts monsters into appropriate levels
    levels.levelOne = monsters.filter(monster=>monster.level === 1)
    levels.levelTwo = monsters.filter(monster=>monster.level === 2)
    levels.levelThree = monsters.filter(monster=>monster.level === 3)
    levels.levelFour = monsters.filter(monster=>monster.level === 4)
    //player has 50% chance of encounter a random monster, about 20% chance of finding nothing and the prompt starting over, and about a 30% chance of finding food or medicine .
    let randomNumber =  Math.floor((Math.random()*14)) 
    let enemies
    let randomEnemy
    if(randomNumber < 7 ){
        //players level is evaluated and if there are monsters on the same level, they are put into an array, if there are no more players on the player level, all remaining monsters are entered into array(this means that the player has the ability to level up but has not.)
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
        //a random enemy is selected and displayed from the previously create enemy array
        randomEnemy = enemies[Math.floor(Math.random() * enemies.length)]    
        console.log(`Oh no, ${randomEnemy.name} is blocking your way! ${randomEnemy.name} is a level ${randomEnemy.level} enemy with ${randomEnemy.life} life points. Think you can take 'em?`)
        //the player can choose to fight or run
        const decision  = readline.keyIn(`Will you : [R]un or [F]ight`, {limit: 'rf'})
        if (decision === "r"){
            //trigger running function
            player.isRunning = true
            runningAway(randomEnemy, player)
            }else{
                //triggers fighting
            player.attackingMonster = true
            attackingEnemy(randomEnemy, player)
            }
    }else  if(randomNumber > 11){
        //20% chance of nothing
        console.log("Nothing here, better continue on!")
    }else{
        //another random number to choose between food and medicine triggers this is 50/50
        if(Math.floor(Math.random() * 11)<6){ 
            findFood(player)
        }else{
            findMedicine(player)
        }
    }
}

//if a player does not have supplies but chooses to use them anyway, they will randomly succeed or fail based on how much they need the supply. The more they need it, the more likely they are to succeed.
function gambleWithSupplies(supply){
    if(supply === 'med'){
        //if a pl      
        if(player.life === 100){
            var gamble = readline.keyIn("You don't have any Medicine, Do you want to [U]se something around you or [C]hange you're mind ",{limit: 'uc'})
            if(gamble==="u"){
                console.log("There's nothing wrong with you(not that you have any medicine even if there was), but you feel the need to be healed, you eat some berries you think will make you feel better and are temporarily poisoned. You lose 30 life points.")
                player.life=player.life-30
            }
            
        }
        else{
            var gamble = readline.keyIn("You don't have any Medicine, Do you want to [U]se something around you or [C]hange you're mind ",{limit: 'uc'})
            if(gamble==="u"){
                if(Math.floor(Math.random() * 11)<6){
                    console.log("You don't have any medicine, but you're desparate for first aid. You smash some mud in an open wound and the wound immediately begins to fester. Bad idea maybe? You lose 20 life points.")
                    if(player.life-20<=0){
                        console.log("It won't stop festering!! someone help!! It's spreading oh noooo! someonendajfkbfdibfiodsjkfnvid.....")
                    }
                    player.life=player.life-20
                    console.log(`new stamina:${player.stamina}`)
                }else{
                    console.log("You don't have any medicine, but you're desparate for first aid. You find some horsetail and boil it into some tea, you can feel your bones healing as you sip.")
                    player.life=player.life+20>=100 ? 100 :player.life+20
                    console.log(`new stamina:${player.stamina}`)
                }
            
            }
        }
    }else{
        if(player.stamina === 10){
            var gamble = readline.keyIn("You don't have any food, Do you want to [E]at something around you or [C]hange you're mind ",{limit: 'ec'})
            if(gamble==="e"){
                console.log("Yoe feel full and well rested, but have the stupidest-I'm sorry - oddest urge to eat a spotted frog you see. You eat the frog and begin to feel sluggish you lose half your stamina.")
            player.stamina=player.stamina/2||0
            console.log(`new stamina:${player.stamina}`)
            }
        }
        else{
            var gamble = readline.keyIn("You don't have any food, Do you want to [E]at something around you or [C]hange you're mind ",{limit: 'ec'})
            if(gamble==="e"){
                if(Math.floor(Math.random() * 11)<6){
                    console.log("You don't have any food, but you're famished, you find some brightly colored fruit hanging from a tree, it taste funny enough for you to stop, but it's to late, the strange fruit makes you lethargic. You lose all your stamina")
                    player.stamina=0
                    console.log(`new stamina:${player.stamina}`)
                }else{
                    console.log("You don't have any food but you're famished, you find some cavasa burried in the ground and dig it up, you make some flavorful cavassa soup and feel better than ever.")
                    player.stamina=player.stamina +7 >=10 ? 10 : player.stamina + 7
                    console.log(`new stamina:${player.stamina}`)
                }
            }
        }
    }
}

function saveTheRoyalFamily(){
    console.log('WOW Your amazing astonishing amazing!!!! You saved the royal family and they want to reward you, with money, a palace, a princess, a prince, whatever your into! You should be poud')
    console.log(`THE END`)
    player.isAlive = false
}
    
