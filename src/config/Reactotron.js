import Reactotron from 'reactotron-react-native';

//__DEV__: true=desenv /false:produção
//configure({host: '192.168.0.2'})

if (__DEV__) {
    const tron = Reactotron.configure()
        .useReactNative()
        .connect();

    console.tron = tron;
    tron.clear();
}
