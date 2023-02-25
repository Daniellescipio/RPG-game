const readline = require("readline-sync")

const {weapons, weaponPieces} = require("./weapons")
function makeAWeapon(weapon, player, choice){  
    while(player.inTheShop.making){ 
       // console.log(returnToEntrance)
        if(player.inventory.weapons.indexOf(weapon)<0){
            console.log(weapon.Definition)
            console.log(`Damage Level : ${weapon.DamageLevel}`)
            console.log(`to make this weapon you will need`, weapon.pieces.map(piece=>piece.name))
            let canYouMakeIt =readline.keyIn(`Would you like to make this weapon?[Y]es, [N]o, [C]heck my inventory`, {limit:`ync`})
            let willYouMakeIt
            if(canYouMakeIt.toLowerCase()===`c`){
                console.log(player.inventory.pieces)
                willYouMakeIt =readline.keyIn(`Would you like to make this weapon?[Y]es, [N]o`, {limit:`yn`})
            }
            if(canYouMakeIt.toLowerCase()=== 'y'||willYouMakeIt ==='y'){
                let countPieces =0
                for(let i = 0; i<weapon.pieces.length;i++){
                    eachPiece = weapon.pieces[i]
                    if(player.inventory.pieces.indexOf(eachPiece)>=0){
                        countPieces++
                    }
                }
                if(countPieces === weapon.pieces.length){
                    console.log(`You made a ${weapon.name} and gone up a level!`)
                    player.inventory.weapons.push(weapon)
                    for(let i =0;i<weapon.piece.length;i++){
                        let indexNumber =player.inventory.pieces.indexOf(weapon.pieces[i])
                        player.inventory.pieces.splice(indexNumber, 1)
                    }
                    player.level = player.level + 1
                    console.log(`Hello level ${player.level} player`)
                    player.inventory.pieces.filter(piece=>piece.name === weapon.pieces.name)
                }else{
                    console.log(`You do not have all the pieces to make this weapon`)
                }
            }
        }else{
            console.log(`You already have this weapon`)
        } 
        const keepLooking = readline.keyIn(`Would you like to make something else?[Y]es or [N]o`,{limit:`yn`})
        if(keepLooking.toLowerCase() === 'n'){
            player.inTheShop.shopping = false
        }  
        player.inTheShop.making =false
        console.clear()
    }
}

module.exports = makeAWeapon