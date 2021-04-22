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

const url = "http://scwebsrv-four.site:3001/tasks/";
const filtersUrl = "http://scwebsrv-four.site:3001/filters/607893ea18ae012ff626b0dc";

//TODO:
//Filters: 
//	--Completed should be a string or number 
//Admin login

const Item = ({ item, onPress }) => {
	// This isn't working and I have no idea why
	const decidebg = item => {
		switch(item.priority) {
			case "High": 
				return "#dc322f";
				break;
			case "Medium": 
				return "#f9c2ff";
				break;
			case "Low": 
				return "#859900";
				break;
			default: return "#121212";
		}
		return  "#121212";
	}

	const bg = decidebg(item);

	return (
		<View 
			style={{
				...styles.item, 
				backgroundColor: bg
			}}
		>
		<TouchableOpacity onPress={onPress}>
			<Text> description: {item.description}</Text>
			<Text> priority: {item.priority}</Text>
			<Text> worker: {item.worker ? item.worker : "Open"}</Text>
			<Text> shift: {item.shift ? item.shift : "Any"}</Text>
			<Text> status: {item.completed ? "Completed" : "To be completed"}</Text>
		</TouchableOpacity>
		</View>
	);
}

const FilterItem = ({title, onPress}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.filterItem}>
			<Text style={{ color: "#fff" }}>{title}</Text>	
		</TouchableOpacity>
	);
}

// Pulls all attributes set for the tasks and spits out a section list 
const Attributes = (props) => {
	const [data, setData] = useState([]);
	const [workFilter, setWorkFilter] = useState("");
	const [shiftFilter, setShiftFilter] = useState("");
	const [priorityFilter, setPriorityFilter] = useState("");

	const W = 0, S = 1, P = 2;
	const onPress = ({ item }) => {
		const workers = data[W].data;
		const shifts = data[S].data;
		const priorities = data[P].data;

		const workerIdx = workers.indexOf(item);
		const shiftIdx = shifts.indexOf(item);
		const priorityIdx = priorities.indexOf(item);

		if(workerIdx > -1) {
			setWorkFilter(item);
		} else if(shiftIdx > -1) {
			setShiftFilter(item);
		} else if(priorityIdx  > -1) {
			setPriorityFilter(item);
		}
		console.log(item);
	}
	
	// Update filters into the database 
	async function putFilters() {
		try {
			const res = await axios.put(filtersUrl, {
				worker: workFilter,
				shift: shiftFilter,
				priority: priorityFilter,
			});
		} catch (error) {
			console.log(error);
		}
	}
	
	// Get all previously entered attributes from database
	async function fetchAttr() {
		try {
			const docs = await axios.get(url);
			const ddata = docs.data.data;

			// Make sure there's no duplicates with Set method 
			const workers = [
				...new Set(
					ddata.map( task => task.worker )
				)
			];	
			const shifts = [
				...new Set(
					ddata.map( task => task.shift )
				)
			];	
			const priorities = [
				...new Set(
					ddata.map( task => task.priority )
				)
			];	

			setData([
				{
					title: "Workers",
					data: workers
				},
				{
					title: "Shifts",
					data: shifts
				},
				{
					title: "Priorities",
					data: priorities
				}
			]);

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchAttr();
	}, [data]);

	useEffect(() => {
		putFilters();
	},[workFilter, shiftFilter, priorityFilter]);

	const renderItem = ({ item }) => {
		return ( 	
			<FilterItem 
				title={item} 
				onPress={() => onPress({item})}
			/> 
		);
	}

	return (
			<SectionList
				style={props.style}
				sections={ data }
				renderItem={ renderItem }  
				keyExtractor={ (item, index) => item + index }
				renderSectionHeader={ () => (
					<Text>      </Text>
				)}
				horizontal={true}
			/>
	);
}

const AllTasks = ({ priority, worker, shift, completed, navigation}) => {
	const [tasks, setTasks] = useState(true);		
	const [filters, setFilters] = useState({});


	const renderItem = ({ item }) => {
		return ( 
			<Item 
				item={item}
				onPress={() => changeStatus({item})}
				bgColor={() => decidebg({item})}
			/>
		);
	}
	
	async function clearFilters() {
		try {
			const res = await axios.put(filtersUrl , {
				worker:"",
				shift:"",
				priority:""
			});
		} catch(error) {
			console.log(error)
		}

	}

	async function fetchFilters() {
		try {
			const docs = await axios.get(filtersUrl);
			const data = docs.data.data;
			setFilters({
				worker: data.worker,
				shift: data.shift,
				priority: data.priority,
			});

		} catch (error) {
			console.log(error);
		}
	}

	async function changeStatus({ item }) {
		const updatedItem = {
			description: item.description,
			priority: item.priority,
			dateCreated: item.dateCreated,
			shift: item.shift,
			worker: item.worker,
			completed: !item.completed
		};

		try {
			const res = await axios.put(url + item._id, updatedItem);
			console.log(res.data);
		} catch(error) {
			console.log(error)
		}
	}


	async function fetchDocs({ priority, worker, shift, completed }) {
		try {
			const docs = await axios.get(url);
			const data = docs.data.data;	
			
			setTasks(
				// Only show tasks which pass the filter  
				data.filter(task => {
					// We only want to check defined arguments,
					// Else we don't care, 
					// want the corresponding expression to always be true
					return (
						task.priority === (priority ? priority : task.priority)
						&& task.shift === (shift ? shift : task.shift)
						&& task.worker === (worker ? worker : task.worker)
						&& task.completed === (!(completed === undefined) ? completed : task.completed)
					);
				// Sort by if completed or not 
				}).sort((a, b) => {
					if( !a.completed && b.completed ) { // a < b
						return -1;
					} else if( a.completed && !b.completed ) { // a > b
						return 1;
					}
					return 0; // a == b
				})
			);
			

		} catch(error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchFilters();
	}, [filters]);

	useEffect(() => {
		fetchDocs(filters);
	}, [tasks]);


	return (
		<SafeAreaView style={styles.container}>
			<Button 
				title="Clear filters"
				onPress={clearFilters}
				color="#121212"
			/>
			<View style={styles.filterContainer}>
				<Attributes />
			</View>
			<View style={styles.container}>
				<FlatList
					data={tasks}
					renderItem={renderItem}
					keyExtractor={item => item._id}
				/>
			</View>
			<Button 
				title="Create Task"
				color="#121212"
				onPress={() => navigation.navigate('Create Task')}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
container: {
	flex: 1,
	marginTop: StatusBar.currentHeight || 0,
},
	taskContainer: {
	flex:1,
},
item: {
	// backgroundColor: '#f9c2ff',
	padding: 20,
	marginVertical: 8,
	marginHorizontal: 16,
	borderRadius: 15,

},
filterItem: {
	backgroundColor: "#121212", 
	padding:10, 
	margin:4,
	borderRadius: 15
},
title: {
	fontSize: 32,
},
filterContainer: {
	padding:5,
},

});

export default AllTasks;
