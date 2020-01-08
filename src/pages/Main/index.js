import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import '../../config/Reactotron';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    state = {
        novoUsuario: '',
        usuarios: [],
    };

    handleAddUsuario = async () => {
        const { usuarios, novoUsuario } = this.state;

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
        });

        Keyboard.dismiss(); // hide teclado
    };

    render() {
        const { usuarios, novoUsuario } = this.state;

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

                    <SubmitButton onPress={this.handleAddUsuario}>
                        <Icon name="person-add" size={20} color="#FFF" />
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

                            <ProfileButton onPress={() => {}}>
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

Main.navigationOptions = {
    title: 'Usuários',
};
