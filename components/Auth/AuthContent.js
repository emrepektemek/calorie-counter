import { useState} from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AuthForm from './AuthForm';

import { Colors } from '../../constants/colors';

import { LinearGradient } from 'expo-linear-gradient';
import Button from '../ui/Button';



function AuthContent({ isLogin, onAuthenticate,email,password }) {

  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {

    if(isLogin){
      navigation.replace('AdKayitEkrani');
    }
    else{
      navigation.replace('GirisEkrani');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length >= 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
        Alert.alert('Invalid input', 'Please check your entered credentials.');
        setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        email={email}
        password={password}
      />
      <View style={styles.buttons}>
        <Button style={{width: '50%'}} onPress={switchAuthModeHandler}>
          {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
        </Button>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  
  buttons: {
    marginTop: 8,
    alignItems: 'center'
  },
});
