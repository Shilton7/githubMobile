import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Form, Input, SubmitButton } from './styles';

export default function Main() {
    return (
        <Container>
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Informe o usuário"
                />

                <SubmitButton>
                    <Icon name="person-add" size={20} color="#FFF" />
                </SubmitButton>
            </Form>
        </Container>
    );
}

Main.navigationOptions = {
    title: 'Usuários',
};
