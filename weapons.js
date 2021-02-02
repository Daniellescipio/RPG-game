const weaponPieces = {
    wood: {
        name : 'wood',
        description: 'a peice of wood, good for carving into weapons'
    },
    metal:{
        name : 'metal',
        description: 'a peice of metal, good for molding into a weapon'
    }, 
    blade:{
        name : 'blade',
        description: 'the pointy part of a sword'
    },
    pommel:{
        name : 'pommel',
        description: `so you don't cut yourself holding a sword`
    },
    crossgaurd:{
        name : 'crossgaurd',
        description: `idk, but theSearches said you need one to make a sword`
    },
    action:{
        name : 'action',
        description: 'The part that make the gun GO'
    },
    stock: {
        name : 'stock',
        description:`the handle of your gun`
    },
    barrel:{
        name : 'barrel',
        description: 'Where the laser will come from'
    },
    laser: {
        name : 'laser',
        description:`a laser, because this isn't just any gun...`
    },
    holly: {
        name : 'holly',
        description:`the difference between stick and wand...`
    },
    pheonixFeather: {
        name : 'pheonix Feather',
        description:`Magic bird feather for the magic core of your magic wand`
    },
    garrickOllivander:{
        name : 'Garrick Ollivander',
        description: "Unless you know how to make wands your gonna need this dude."
    },
    magic:{
        name : 'magic',
        description: `A little pixie dust so you can work the wand when you need to`
    },
}

const weapons ={
    hands:{
        name: "these hands",
        Definition : "Sorry No weapons yet, FIGHT!",
        DamageLevel :  1
    },
    axe:{
        name : "an axe",
        Definition : "This is good for cutting big trees down, wonder who else it could cut down...",
        DamageLevel :  2,
        peices: [weaponPieces.wood, weaponPieces.metal]
    },
    sword: {
        name : "a sword",
        Definition : "A sword! Stick 'em with the pointy end!",
        DamageLevel :  3,
        peices: [weaponPieces.blade, weaponPieces.pommel,weaponPieces.crossgaurd ]
    },
    laserGun:{
        name : "a Laser Gun",
        Definition : "A laser gun! Say hello to my not so little friend!",
        DamageLevel :  4,
        peices: [weaponPieces.action, weaponPieces.stock, weaponPieces.barrel, weaponPieces.laser ]
    } ,
    magicWand:{
        name : "a Magic Wand",
        Definition : "AVADA KEDAVRA!",
        DamageLevel :  5,
        peices: [weaponPieces.holly, weaponPieces.pheonixFeather, weaponPieces.garrickOllivander, weaponPieces.magic ]
    } ,
    key:{
        name : "a key",
        defintion : "It's no weapon, but it'll get you the girl!",
        DamageLevel : null
    }
}

module.exports = {weapons, weaponPieces}