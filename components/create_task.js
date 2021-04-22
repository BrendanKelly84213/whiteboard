import React, { useState, useEffect } from 'react';
import { 
	FlatList,
	SafeAreaView, 
	ScrollView, 
	StyleSheet, 
	Text, 
	TextInput, 
	Button, 
	View 
} from 'react-native';
import axios from 'axios';

const url = "http://scwebsrv-four.site:3001/tasks";
const shiftUrl = "http://scwebsrv-four.site:3001/shifts";

const CreateTask = ({ route, navigation }) => {
	const [desc, setDesc] = useState("");
	const [prty, setPrty] = useState("None");
	const [shft, setShft] = useState("Any shift");
	const [wrkr, setWrkr] = useState("Open");

	useEffect(() => {
		if(!route.params) {
			setShft("");
		} else {
			setShft(route.params.title);
		}
	}, [route.params]);

	const handleSubmit = async e => {
		e.preventDefault();	
		
		if(!desc) {
			alert("Please enter a description");
			return;
		} 
		if(!prty) {
			alert("Please choose a priority");
			return;
		}

		try {
			const res = await axios.post(url, {
				description: desc, 
				priority: prty,
				dateCreated: Date.now(),
				shift: shft,
				worker:wrkr
			});

			if(res.data.success) {
				alert("Post successful");	
				navigation.navigate('All Tasks');
			} 
			 
		} catch (error) {
			console.log(error);
			alert("Error, failed to post" + '\n' + error);	
		}
	}
	
	return (
		<View style= {styles.container}>
			<TextInput
				style={{height: 60}}
				placeholder="Enter description"
				onChangeText={setDesc}
			/>
			<TextInput
				style={{height: 60, marginBottom: 10}}
				placeholder="Enter person for the job, or leave open"
				onChangeText={setWrkr}
				
			/>

			<Button
				title={"Shift: " + (shft ? shft : "Any Shift")}
				onPress={() => navigation.navigate('Select Shift')}
				color="black"
			/>
				
			<Text>Choose Priority. Currently: {prty}</Text>
			<View style={styles.menu}>
				<Button 
					title="High"
					color="#dc322f"
					onPress={() => setPrty("High")}
				/>
			</View>
			<View style={styles.menu}>
				<Button 
					title="Medium"
					color="#f9c2ff"
					onPress={() => setPrty("Medium")}
				/>
			</View>
			<View style={styles.menu}>
				<Button 
					title="Low"
					color="#859900"
					onPress={() => setPrty("Low")}
				/>
			</View>
			<View style={styles.menu}>
			<Button 
				title="submit" 
				onPress={handleSubmit}
				color="#121212"
			/>
			</View>
		</View>
	);
}

const styles=StyleSheet.create({
	container: {
		flex:1,
		padding:4,
		justifyContent: "center",
		margin: 200,
		
	},
	menu: {
		marginTop: 15,
		marginBottom: 15
	}
});

export default CreateTask;
