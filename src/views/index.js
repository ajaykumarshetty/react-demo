import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


import { routes } from "./routesComponent"

const Home = () => {
    return (
        <Router>
            <Switch>
                {routes.map((data , index) => {
                        return <Route key={index} component={data.component} exact={data.exact} path={data.root} />
                    })
                }
            </Switch>
        </Router>
    )
}

export default Home


