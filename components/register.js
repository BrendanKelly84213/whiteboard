import React, { useState, useEffect } from 'react';
import { 
	TextInput,
	SectionList,
	Button,
	TouchableOpacity, 
	FlatList, 
	SafeAreaView, 
	StyleSheet, 
	Text, 
	View, 
	StatusBar 
} from 'react-native';
import axios from 'axios';

const url = "http://scwebsrv-four.site:3001/auth";
const registerUrl = url + "/register";

const Register = ({navigation}) => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	async function register() {
		if(confirm === password) {
			try {
				const res = await axios.post(registerUrl, {
					username: user,
					password: password
				});

				if(res.data.success) {
					alert(res.data.message);
					navigation.navigate('All Tasks');
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("passwords don't match");
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="username"
				onChangeText={setUser}
			/>

			<TextInput
				style={styles.input}
				placeholder="password"
				onChangeText={setPassword}
				secureTextEntry={true}
			/>
			<TextInput
				style={styles.input}
				placeholder="confirm password"
				onChangeText={setConfirm}
				secureTextEntry={true}
			/>
			<Button
				title="Register"
				onPress={register}
				color="black"
			/>

		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		height: 40,
		margin: 10
	}
});

export default Register;
