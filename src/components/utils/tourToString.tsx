import React from 'react'

function tourToString(tour:number):string {
    switch(tour){ 
        case 1 : 
            return '1er tour'
        case 2 :
            return "2e tour"
        case 3 : 
            return "3e tour"
        case 4 :
            return "Huitieme"
        case 5 : 
            return "Quart"
        case 6 :
            return "Demi"
        case 7 :
            return "Finale"
        default:
            return 'undefined'
    }
}

export default tourToString
