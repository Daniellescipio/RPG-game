const {weapons, weaponPieces} = require('./weapons')
const monsters = []
const firebBreathingDragon= {
    name : "The Fire Breathing Dragon",
    life : 100,
    level : 5,
    prizeForDefeat: weapons.key,   
}
const banditOne ={
    name : "A bandit",
    life : 10,
    level : 1,
    prizeForDefeat : weaponPieces.wood,

}
const banditTwo ={
    name : "A bandit",
    life : 10,
    level : 1,
    prizeForDefeat : weaponPieces.metal,
}
const bigFoot ={
    name : "Big Foot",
    life : 20,
    level : 2,
    prizeForDefeat : weaponPieces.blade,
}
const cyclops ={
    name : "A cyclops",
    life : 20,
    level : 2,
    prizeForDefeat : weaponPieces.crossgaurd,
}
const ogre ={
    name : "An ogre",
    life : 20,
    level : 2,
    prizeForDefeat : weaponPieces.pommel,
}    
const evilKnight={
    name : "an Evil Knight",
    life : 30,
    level : 3,
    prizeForDefeat : weaponPieces.laser,
}
const vampire={
    name : "a Vampire",
    life : 30,
    level : 3,
    prizeForDefeat : weaponPieces.action,
}
const werewolf={
    name : "werewolf",
    life : 30,
    level : 3,
    prizeForDefeat : weaponPieces.barrel,
}
const ninja={
    name : "a ninja",
    life : 30,
    level : 3,
    prizeForDefeat : weaponPieces.stock,
}    
const medusa={
    name : "Medusa",
    life : 40,
    level : 4,
    prizeForDefeat : weaponPieces.holly,   
}
const hades={
    name : "Hades",
    life : 40,
    level : 4,
    prizeForDefeat : weaponPieces.pheonixFeather,    
}
const ares={
    name : "Ares",
    life : 40,
    level : 4,
    prizeForDefeat : weaponPieces.garrickOllivander,    
}
const hera={
    name : "Zeus",
    life : 40,
    level : 4,
    prizeForDefeat : weaponPieces.magic,
}
monsters.push(banditOne, banditTwo, bigFoot, cyclops, ogre, evilKnight, vampire, werewolf, ninja, medusa, hades, hera, ares)
module.exports = {monsters, firebBreathingDragon}