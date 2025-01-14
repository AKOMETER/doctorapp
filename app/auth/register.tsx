import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterScreen = () => {
  const [selectedRole, setSelectedRole] = useState('Patient');

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
            uri: 'https://cdn-icons-png.flaticon.com/512/8189/8189797.png',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Register Text */}
      <Text style={styles.title}>Register</Text>

      {/* Role Selection */}
      <View style={styles.roleContainer}>
        {['Doctor', 'Patient', 'Labs'].map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.roleButton,
              selectedRole === role && styles.roleButtonSelected,
            ]}
            onPress={() => setSelectedRole(role)}>
            <Text
              style={[
                styles.roleText,
                selectedRole === role && styles.roleTextSelected,
              ]}>
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="First Name" />
          <Icon name="user" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Last Name" />
          <Icon name="user" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Email" />
          <Icon name="envelope" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Code" />
          <Icon name="phone" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="Mobile no" />
          <Icon name="mobile" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
          <Icon name="lock" size={20} color="#000" style={styles.inputIcon} />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink}>Login Now!</Text>
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
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  roleButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  roleButtonSelected: {
    borderColor: '#0056B3',
    backgroundColor: '#EAF3FF',
  },
  roleText: {
    fontSize: 14,
    color: '#888',
  },
  roleTextSelected: {
    color: '#0056B3',
  },
  formContainer: {
    marginBottom: 20,
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
  registerButton: {
    backgroundColor: '#0056B3',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  loginLink: {
    color: '#0056B3',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
