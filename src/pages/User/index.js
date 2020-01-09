import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Favoritos,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';
import api from '../../services/api';
//import { Header } from 'react-native/Libraries/NewAppScreen';

export default class User extends Component {
    //console.tron.log(navigation.getParam('usuario').name);

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('usuario').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    state = {
        favoritos: [],
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const usuario = navigation.getParam('usuario');

        const response = await api.get(`/users/${usuario.login}/starred`);
        this.setState({ favoritos: response.data });
    }

    render() {
        const { navigation } = this.props;
        const { favoritos } = this.state;

        const usuario = navigation.getParam('usuario');

        return (
            <Container>
                <Header>
                    <Avatar source={{ uri: usuario.avatar }} />
                    <Name>{usuario.name}</Name>
                    <Bio>{usuario.bio}</Bio>
                </Header>

                <Favoritos
                    data={favoritos}
                    keyExtractor={favorito => String(favorito.id)}
                    renderItem={({ item }) => (
                        <Starred>
                            <OwnerAvatar
                                source={{ uri: item.owner.avatar_url }}
                            />
                            <Info>
                                <Title>{item.name}</Title>
                                <Author>{item.owner.login}</Author>
                            </Info>
                        </Starred>
                    )}
                />
            </Container>
        );
    }
}
