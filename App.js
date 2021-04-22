import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AllTasks from './components/all_tasks';
import CreateTask from './components/create_task';
import HomeScreen from './components/homescreen';
import SelectShift from './components/select_shift';
import Login from './components/login';
import Register from './components/register';

const Stack = createStackNavigator();

export default function App() {
  return (
	<NavigationContainer >
		<Stack.Navigator >
	  		<Stack.Screen
	  			name="All Tasks"
	  			component={AllTasks}
	  			options={ ({ navigation, route }) => ({
					headerCenter: () => ( 
						<Text>Logged in as: (something AsyncStorage)</Text>
					),
						
					headerRight: () => (
						<View style={styles.header}>
						<View style={styles.container}>
						<Button
							onPress={() => navigation.navigate('Login')}
							title="admin login"
							color="black"
						/>
						</View>
						<View style={styles.container}>
						<Button
							onPress={() => navigation.navigate('Register')}
							title="admin register"
							color="black"
						/>
						</View>
						</View>
					)
				}) }
	  		/>
	  		<Stack.Screen
	  			name="Login"
	  			component={Login}
	  		/>
	  		<Stack.Screen
	  			name="Register"
	  			component={Register}
	  		/>
	  		<Stack.Screen
				name="Create Task"
				component={CreateTask}
				options={{ title: 'Hello Fren' }}
			  />
	  		<Stack.Screen
	  			name="Select Shift"
	  			component={SelectShift}
	  		/>
		</Stack.Navigator>
	</NavigationContainer>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 3,
		
	},
	header: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center"
	}
});
