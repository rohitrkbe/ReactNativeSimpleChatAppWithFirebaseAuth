import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Home extends React.Component {
  state = {
    name: ''
  };

  render() {
    return (<View>
      <Text style={styles.titleStyle}>Enter Your Name :</Text>
      <TextInput style={styles.nameStyle} onChangeText={(name) => {
          this.setState({name})
        }} placeholder='Name Here'/>
      <TouchableOpacity onPress={() => {
          Actions.chat({username: this.state.name});
        }}>
        <Text style={styles.titleStyle}>Next</Text>
      </TouchableOpacity>
    </View>);
  }
};

const styles = {
  titleStyle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20
  },
  nameStyle: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    borderWidth: 0.5
  }
}

export default Home;
