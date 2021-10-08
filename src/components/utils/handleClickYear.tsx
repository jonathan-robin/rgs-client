export const HandleClickYear = (history:any, year:any) => {
    return history.push({pathname:'/searchYear', state:{year:year}})
}

