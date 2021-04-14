import Home from "./home/index";


 export const routes = [
    {
        component : Home ,
        root :"/home",
        exact : false
    },
    {
        component : Home ,
        root :"/",
        exact : true
    }
]