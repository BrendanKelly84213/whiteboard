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
const loginUrl = url + "/login";

const Login = ({navigation}) => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	async function login() {
		try {
			const res = await axios.post(loginUrl, {
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
			<Button
				title="Login"
				onPress={login}
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

export default Login;
