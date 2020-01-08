import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            User,
        },
        {
            headerLayoutPreset: 'center', //titulo centro
            headerBackTitleVisible: false, //mantem só icone do voltar da pagina e remove o texto
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#7159c1',
                },
                headerTintColor: '#FFF', //cor titulo
            },
        }
    )
);

export default Routes;
