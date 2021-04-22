import React, { useState, useEffect } from 'react';
import { 
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

const url = "http://scwebsrv-four.site:3001/shifts";
const tasksUrl = "http://scwebsrv-four.site:3001/tasks/";

const ShiftItem = ({ title, onPress }) => (
	<View>	
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.container}>{title}</Text>
		</TouchableOpacity >
	</View>	
)

const SelectShift = ({ navigation }) => {
	const [shifts, setShifts] = useState([]);

	async function fetchShifts() {
		try {
			const res = await axios.get(url);
			const data = res.data.data;

			setShifts(data);
		} catch(error) {
			console.log(error);
		}
	}

	async function selectShift() {
		try {

		} catch (error) {
			console.log(error);
		}
	}

	const onPress = ({ item }) => {
		
	}

	const renderItem = ({ item }) => (
		<ShiftItem
			title={item.title}
			onPress={() => navigation.navigate( 'Create Task', item)}
		/>
	);

	useEffect(() => {fetchShifts()}, []);
	
	return (
		<View>
			<FlatList
				data={shifts}
				renderItem={renderItem}
				keyExtractor={item => item._id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 5,
		padding: 20,
		color: "white",
		backgroundColor: "#121212"
	}
});

export default SelectShift; 
