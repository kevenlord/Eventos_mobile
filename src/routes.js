import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Listar from './pages/Listar';
import Reservar from './pages/Reservar';


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Listar,
        Reservar
    })
);

export default Routes;
