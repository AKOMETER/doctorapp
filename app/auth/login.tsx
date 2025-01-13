import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton}>
        <Icon name="close" size={20} color="#000" />
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2913/2913608.png',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Login Text */}
      <Text style={styles.title}>LOGIN Book Doctor Appointment</Text>

      {/* Form */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Code" />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Email" />
          <Icon name="envelope" size={20} color="#000" style={styles.inputIcon} />
        </View>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login Now</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signUpText}>
        Don't have a Login? <Text style={styles.signUpLink}>Signup Now!</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 200, // Adjust this value
    height: 200, // Adjust this value
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  inputIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
    color: '#888',
  },
  loginButton: {
    backgroundColor: '#0056B3',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  signUpLink: {
    color: '#0056B3',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
