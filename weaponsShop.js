const readline = require("readline-sync")
function makeAWeapon(weapon, player){   
    if(player.inventory.weapons.indexOf(weapon)<0){
        console.log(weapon.Definition)
        console.log(`Damage Level : ${weapon.DamageLevel}`)
        console.log(weapon.peices.map(piece=>piece.name))
        let canYouMakeIt =readline.keyIn(`Would you like to make this weapon?[Y]es, [N]o, [C]heck my inventory`, {limit:`ync`})
        if(canYouMakeIt.toLowerCase()===`c`){
            console.log(player.inventory.pieces)
            makeTheWeapon =readline.keyIn(`Would you like to make this weapon?[Y]es, [N]o`, {limit:`yn`})
            if(makeTheWeapon.toLowerCase()=== 'y'){
                console.log(`yes`)
                let countPieces =0
                
                for(let i = 0; i<weapon.peices.length;i++){
                    eachPiece = weapon.peices[i]
                    console.log(eachPiece)
                    if(player.inventory.pieces.indexOf(eachPiece)>=0){
                        countPieces++
                    }
                }
                console.log(countPieces, weapon.peices.length)
                if(countPieces === weapon.peices.length){
                    console.log(`You made a ${weapon.name} and gone up a level!`)
                    player.inventory.weapons.push(weapon)
                    player.level = player.inventory.weapons.length 
                    console.log(`hello ${player.level}`)
                    for(let i =0; i<weapon.pieces; i++){
                    player.inventory.peices = player.inventory.peices.filter(piece=>piece!==weapon.peices[i])
                    }
                    const maybeLastDecision = readline.keyIn(`Would you like to make anything else? [Y]es or[N]o?`)
                    if(maybeLastDecision === `y`){
                    player.inTheShop = true
                    }else{
                    player.inTheShop = false
                    player.isAlive = true
                    }
                }else{
                    console.log(`You do not have all the pieces to make this weapon`)
                    const keepLooking = readline.keyIn(`Would you like to make something else?[Y]es or [N]o`,{limit:`yn`})
                    if(keepLooking.toLowerCase === `y`){
                        player.inTheShop =true
                    }else{
                        player.inTheShop = false
                        player.isAlive = true
                    }
                }
            }else{
                const keepLooking = readline.keyIn(`Would you like to make something else?[Y]es or [N]o`,{limit:`yn`})
                if(keepLooking.toLowerCase === `y`){
                    player.inTheShop =true
                }else{
                    player.inTheShop = false
                    player.isAlive = true
                }
            }
        }else if(canYouMakeIt.toLowerCase()=== 'y'){
            let countPieces =0
            for(let i = 0; i<weapon.peices.length;i++){
                eachPiece = weapon.peices[i]
                if(player.inventory.pieces.indexOf(eachPiece)>=0){
                    countPieces++
                }
            }
            if(countPieces === weapon.peices.length){
                console.log(`You made a ${weapon.name} and gone up a level!`)
                player.inventory.weapons.push(weapon)
                player.level = player.inventory.weapons.length 
                console.log(`${player.level}`)
                const maybeLastDecision = readline.keyIn(`Would you like to make anything else? [Y]es or[N]o?`)
                if(maybeLastDecision === `y`){
                    player.inTheShop = true
                }else{
                    player.inTheShop = false
                    player.isAlive = true
                }
            }else{
                console.log(`You do not have all the pieces to make this weapon`)
                const keepLooking = readline.keyIn(`Would you like to make something else?[Y]es or [N]o`,{limit:`yn`})
                if(keepLooking.toLowerCase === `y`){
                    player.inTheShop =true
                }else{
                    player.inTheShop = false
                    player.isAlive = true
                }
            }
        }else{
            const keepLooking = readline.keyIn(`Would you like to make something else?[Y]es or [N]o`,{limit:`yn`})
            if(keepLooking.toLowerCase === `y`){
                player.inTheShop =true
            }else{
                player.inTheShop = false
                player.isAlive = true
            }
        }
    }else{
        console.log(`You already have this weapon`)
        const keepLooking = readline.keyIn(`Would you like to make something else?[Y]es or [N]o`,{limit:`yn`})
            if(keepLooking.toLowerCase === `y`){
                player.inTheShop =true
            }else{
                player.inTheShop = false
                player.isAlive = true
            }
    } 
    
}

module.exports = makeAWeapon