
import React, { useState, useEffect } from 'react';
import { 
	FlatList, 
	SafeAreaView, 
	StyleSheet, 
	Text, 
	View, 
	StatusBar,
	Button
} from 'react-native';

const HomeScreen = ({ navigation }) => (
	<View style={styles.container}>
		<View style={styles.button}>
			<Button
				title="Make a new task"
				onPress={() => navigation.navigate('Create Task')}
				color="black"
			/>
		</View>
		<View style={styles.button}>
			<Button 
				title="View all tasks"
				onPress={() => navigation.navigate('All Tasks')}
			/>
		</View>
	</View>
);

const styles=StyleSheet.create({
	button: {
		padding: 4,
	},
	container: {
		backgroundColor: "#121212"
	}
});

export default HomeScreen;
