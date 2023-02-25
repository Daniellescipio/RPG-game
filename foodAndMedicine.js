const readline = require("readline-sync")
const foodOptions=[
    {
        name:"bowl of ramen",
        nutritionalValue:2,
        loss:3,
        yum:"Instant ramen gives you a small but instant energy boost.",
        yuck:"Who eats instant ramen if they don't HAVE to?",
        qnty:0
    },
    {
        name:"cup of coffee",
        nutritionalValue:4,
        loss:4,
        yum:"What a blast of energy! Hury up and fight something before it wears off!",
        yuck:"The caffine makes you jittery and gives you a panic attack, you spend hours running from your shadow.",
        qnty:0
    },
    {
        name:"sandwhich",
        nutritionalValue:6,
        loss:3,
        yum:"Just what you needed, the perfect bite to keep you going!",
        yuck:"You feel bloated and weighed down, you look for a tree to sleep under.",
        qnty:0
    },
    {
        name:"fruit smoothie",
        nutritionalValue:8,
        loss:0,
        yum:"A nutrious and delicous smootie. Yum!",
        yuck:"But I guess there's not much harm in a smoothie...if you don't mid being wasteful",
        qnty:0
    },
    {
        name:"protien Bar",
        nutritionalValue:10,
        loss:0,
        yum:"Just what you needed a blast of protien to energize you!",
        yuck:"But I guess there's not much bad that can come from a protien bar...if you don't mind being wasteful",
        qnty:0
    }
]
const medOptions=[
    {
        name:"bandaid",
        healthValue:10,
        loss:0,
        feelBetter:"I mean...it's a bandaid...it doesn't do much but scrapes you together enough to keep pushing.",
        feelWorse:"Well that was wasteful",
        qnty:0
    },
    {
        name:"tylenol",
        healthValue:20,
        loss:20,
        feelBetter:"The pain in your body suddenly(in 20 minutes) fades and you walk a little lighter.",
        feelWorse:"The unneccessary medicine rips wholes into your stomach",
        qnty:0
    },
    {
        name:"holistic diet",
        healthValue:30,
        loss:10,
        feelBetter:`Wow everything is so clean and fresh. You feel like a new person. Now to keep it up...`,
        feelWorse:"You spend hours huntng for the right ingrideints and preparing food and you don't feel any better for it at the end of the day.",
        qnty:0
    },
    {
        name:"doctor",
        healthValue:40,
        loss:40,
        feelBetter:"Just what the doctor ordered. This guy will have you up and ready to go in no time!",
        feelWorse:"The doctor suspects you're faking and draws blood to teach you a lesson. He took too much and now there are two of everything in front of you.",
        qnty:0
    },
    {
        name:"nurse",
        healthValue:50,
        loss:0,
        feelBetter:"The true backbones of the medical field, you feel better than you've felt in days!! Any dragons around?",
        feelWorse:"You get sick from visiting the Dr's office for no reason.",
        qnty:0
    }
]
function findFood(player){
    var randomNum=Math.floor(Math.random()*100) 
    var lessRandomNum = Math.floor(Math.random()*(2-1)+1)
    var leastRndomNum=Math.floor(Math.random()*(4-3)+3)
    var foodOption=randomNum<60 ? foodOptions[0] : randomNum >60 && randomNum <90 ? foodOptions[lessRandomNum] : foodOptions[leastRndomNum]
    const takeTheFood = readline.keyIn(`You found a ${foodOption.name}, it'll give you ${foodOption.nutritionalValue} stamina points do you want to [U]se it to increase your stamina, [A]dd it to your inventory, or [I]gnore it?`,{limit:'uai'})
    if(takeTheFood==='u'){
        food(player, foodOption)
    }else if(takeTheFood==='a'){
        var foundFood= foodOptions.find(element=>element.name===foodOption.name)       
        if(foundFood.qnty>0){
            foundFood.qnty = foundFood.qnty +1
        }else{
            foundFood.qnty =1
            player.inventory.backpack.food.push(foodOption.name)
        }
        console.log(`Ok, your stamina is currently ${player.stamina}, you can eat your ${foundFood.name} when ever your ready!`)
    }else if(takeTheFood==='i'){ 
        console.log(`...I mean you could have used that food....but ok....I guess...`)
    }    
}
function findMedicine(player){
    var randomNum=Math.floor(Math.random()*100) 
    var lessRandomNum = Math.floor(Math.random()*(2-1)+1)
    var leastRndomNum=Math.floor(Math.random()*(4-3)+3)
    var medOption=randomNum<60 ? medOptions[0] : randomNum >60 && randomNum <90 ? medOptions[lessRandomNum] : medOptions[leastRndomNum]
    const takeTheMedicine = readline.keyIn(`You found a ${medOption.name}, you will gain ${medOption.healthValue} health points if you use the ${medOption.name}. Right now your health is at ${player.life} do you want to [U]se it to increase your health, [A]dd it to your inventory, or [I]gnore it?`,{limit:'uai'})
    if(takeTheMedicine === 'u'){
        medicine(player, medOption)
    }else if(takeTheMedicine==='a'){
            var foundMed= medOptions.find(element=>element.name===medOption.name)     
            if(foundMed.qnty>0){
                foundMed.qnty = foundMed.qnty +1
            }else{
                foundMed.qnty =1
                player.inventory.backpack.medicine.push(medOption.name)
            }
           // console.log(foundMed, medOptions, player.inventory.backpack) 
        console.log(`Ok, your life is currently ${player.life}, you can use a ${medOption.name} when ever your ready!`)
    }else if(takeTheMedicine=== 'i'){
        console.log(`...to good for a ${medOption.name}.... ok....I guess...`)
    }
}
const food = (player, foundFood)=>{
    if(foundFood){
        var eatTheFood = readline.keyIn(`Are you sure you want to consume a ${foundFood.name} to increase your stamina (which right now is  ${player.stamina} out of 10) ${foundFood.nutritionalValue} points? [Y]es or [N]o`,{limit:'yn'})
    }else{
        var index = readline.keyInSelect(player.inventory.backpack.food, 'Which item would you like to consume?');
        foundFood = index>=0 && foodOptions.find(element=>element.name===player.inventory.backpack.food[index])
        eatTheFood ='y'
    }
    if(foundFood){
        if(eatTheFood==='y' && player.stamina ===10){
            console.log(`Your stamina was already at 10, ${foundFood.yuck} You lose ${foundFood.loss} `)
            player.stamina = player.stamina - foundFood.loss
            console.log(`You have ${player.stamina} out of 10 stamina points`)
            if(foundFood.qnty>0){
                foundFood.qnty = foundFood.qnty-1
            }else{
                const foodIndex = player.inventory.backpack.food.indexOf(foundFood.name)
                player.inventory.backpack.food.splice(foodIndex, 1)
            }
        }else if(eatTheFood==='y'&& player.stamina <10){
            if(player.stamina + foundFood.stamina >= 10){
                player.stamina = 10
            }else{
                player.stamina = player.stamina + foundFood.nutritionalValue
            } 
            console.log(`${foundFood.yum}`)
            console.log(`You have ${player.stamina} out of 10 stamina points`)
            if(foundFood.qnty>0){
                foundFood.qnty = foundFood.qnty-1
            }else{
                const foodIndex = player.inventory.backpack.food.indexOf(foundFood.name)
                player.inventory.backpack.food.splice(foodIndex, 1)
            }
        }else if(eatTheFood==='n'&& player.stamina ===10){
            console.log("Good thing, your stamina is already full, the extra food would only slow you down in a fight. I'll put it in your backpack for later!")
            player.inventory.backpack.food.push(foundFood.name)
        }else if(eatTheFood==='n'&& player.stamina <10){
            console.log(`Ok, your stamina is currently ${player.stamina}, you can consume ${foundFood.name} when ever your ready!`)
        }
    }
}
const medicine = (player, foundMeds)=>{
    if(foundMeds){
        var useTheMedicine = readline.keyIn(`Are you sure you want to use a ${foundMeds.name} to increase your life (which right now is  ${player.life} out of 100) ${foundMeds.healthValue} points? [Y]es or [N]o`,{limit:'yn'})
    }else{
        var index = readline.keyInSelect(player.inventory.backpack.medicine, 'Which item would you like to consume?');
        foundMeds = index>=0 && medOptions.find(element=>element.name===player.inventory.backpack.medicine[index])
        useTheMedicine ='y'
    }
    if(foundMeds){
        if(useTheMedicine === 'y' && player.life ===100){
            console.log(`Your life was already at 100, ${foundMeds.feelWorse}. You lose ${foundMeds.loss} life points `)
            player.life = player.life - foundMeds.loss
            console.log(`You have ${player.life} out of 100 life points`)
            if(foundMeds.qnty>0){
                foundMeds.qnty = foundMeds.qnty-1
            }else{
                const medIndex = player.inventory.backpack.medicine.indexOf(foundMeds.name)
                player.inventory.backpack.medicine.splice(medicineIndex, 1)
            }
        }else if(useTheMedicine==='y'&& player.life <100){
            if(player.life + foundMeds.healthValue >= 100){
                player.life = 100
            }else{
                player.life = player.life + foundMeds.healthValue
            }  
            console.log(`${foundMeds.feelBetter}`)
            console.log(`You have ${player.life} out of 100 life points`)
            if(foundMeds.qnty>0){
                foundMeds.qnty = foundMeds.qnty-1
            }else{
                const medIndex = player.inventory.backpack.medicine.indexOf(foundMeds.name)
                player.inventory.backpack.medicine.splice(medIndex, 1)
            }
        }else if(useTheMedicine==='n'&& player.life ===100){
            console.log(`Good thing, your life is already full, the ${foundMeds.name} might have made you sick. I'll put it away for later!`)
            player.inventory.backpack.medicine.push(foundMeds.name)
        }else if(useTheMedicine==='n'&& player.life <100){
            console.log(`Ok, your life is currently ${player.stamina}, you can use a ${foundMeds.name} when ever your ready!`)
        }
    }
}

module.exports = {food, medicine, findFood, findMedicine, foodOptions, medOptions}
