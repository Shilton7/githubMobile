import React, { Component } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import '../../config/Reactotron';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    Usuario,
    Avatar,
    Bio,
    Name,
    ProfileButton,
    ProfileButtonText,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: 'Usuários',
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    state = {
        novoUsuario: '',
        usuarios: [],
        loading: false,
    };

    async componentDidMount() {
        const usuarios = await AsyncStorage.getItem('usuarios');

        if (usuarios) {
            this.setState({ usuarios: JSON.parse(usuarios) });
        }
    }

    async componentDidUpdate(_, prevState) {
        const { usuarios } = this.state;
        if (prevState.usuarios !== usuarios) {
            AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }

    handleAddUsuario = async () => {
        const { usuarios, novoUsuario } = this.state;
        this.setState({ loading: true });

        const response = await api.get(`/users/${novoUsuario}`);
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };

        this.setState({
            usuarios: [...usuarios, data],
            novoUsuario: '',
            loading: false,
        });

        Keyboard.dismiss(); // hide teclado
    };

    handleNavigate = usuario => {
        const { navigation } = this.props;
        navigation.navigate('User', { usuario }); //nome da tela ser chamada + Objeto
    };

    render() {
        const { usuarios, novoUsuario, loading } = this.state;

        return (
            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Informe o usuário"
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddUsuario}
                        value={novoUsuario}
                        onChangeText={text =>
                            this.setState({ novoUsuario: text })
                        }
                    />

                    <SubmitButton
                        loading={loading}
                        onPress={this.handleAddUsuario}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Icon name="person-add" size={20} color="#FFF" />
                        )}
                    </SubmitButton>
                </Form>

                <List
                    data={usuarios}
                    keyExtractor={usuario => usuario.login}
                    renderItem={({ item }) => (
                        <Usuario>
                            <Avatar source={{ uri: item.avatar }} />
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton
                                onPress={() => this.handleNavigate(item)}
                            >
                                <ProfileButtonText>
                                    Ver perfil
                                </ProfileButtonText>
                            </ProfileButton>
                        </Usuario>
                    )}
                />
            </Container>
        );
    }
}
