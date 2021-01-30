const readline = require("readline-sync")
const food = (player)=>{
    const eatTheFood = readline.keyIn(`Do you want to eat this food to increase your stamina? [Y] or [N]`,{limit:'yn'})
    if(eatTheFood==='y' && player.stamina ===10){
        console.log("Your stamina was already at 10, the extra food makes you sleepy and slow(I beleive they call that the 'itis'), you lost 2 stamina points")
        player.stamina = player.stamina - 2
        console.log(player.stamina)
    }else if(eatTheFood==='y'&& player.stamina <10){
        if(player.stamina + 2 >= 10){
            player.stamina = 10
            console.log(`The food energized you, are now at 100% stamina!`)
            console.log(player.stamina)
        }else{
            player.stamina = player.stamina + 2
            console.log(`The food energized you, you gained 2 stamina points!`)
            console.log(player.stamina)
        }  
    }else if(eatTheFood==='n'&& player.stamina ===10){
        console.log("Good thing, your stamina is already full, the extra food would only slow you down in a fight")
    }else if(eatTheFood==='n'&& player.stamina <100){
        console.log(`...to good for food.... ok....I guess...`)
    }
    return 'Hamburger'
}
const medicine = (player)=>{
    const useTheMedicine = readline.keyIn(`Do you want to use it to increase your health?`,{limit:'yn'})
    if(useTheMedicine === 'y' && player.life ===100){
        console.log("Your life was already at 100, the extra medicine gives you a stomache, you lost 10 life points")
        player.life = player.life - 10
        console.log(player.life)
    }else if(useTheMedicine==='y'&& player.life <100){
        if(player.life + 10 >= 100){
            player.life = 100
            console.log(`The medicine healed you, are now at 100% life!`)
            console.log(player.life)
        }else{
            player.life = player.life + 10
            console.log(`The medicine healed you, you gained ten life points`)
            console.log(player.life)
        }  
    }else if(useTheMedicine==='n'&& player.life ===100){
        player.inventory.backpack.push('')
        console.log(`Good thing, your life is already full, the extra medice might have made you sick`)
    }else if(useTheMedicine==='n'&& player.life <100){
    }
    return 'pill'
}

module.exports = {food, medicine}
