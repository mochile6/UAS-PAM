import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: "",
      dataMovie: [],
    };
  }

  getData = () => {
    fetch(
      "http://www.omdbapi.com/?i=tt3896198&apikey=4e21dc9d&s=" +
        this.state.searchData
    )
      .then((response) => response.json())
      // .then((json) => {
      //   // this.setState({ dataMovie: responseJson.Search });
      //   this.setState({ dataMovie: json }, () => console.log(json));
      // });
      .then((json) =>
        this.setState({ dataMovie: json.Search }, () => console.log(json))
      )
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Welcome To Movie
          </Text>
        </View>
        <View style={{ flex: 7 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <View>
              <TextInput
                placeholder="Search Movie"
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "#000",
                  margin: 10,
                  padding: 10,
                  width: "90%",
                }}
                onChangeText={(value) => this.setState({ searchData: value })}
                // onChangeText={(searchData) => this.setState({ searchData })}
                // value={this.state.searchData}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.getData()}
                style={{
                  backgroundColor: "#000",
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderRadius: 10,
                  elevation: 5,
                }}
              >
                <Text style={{ color: "white" }}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          data={this.state.dataMovie}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{
                  uri: item.Poster,
                }}
              />
              <Text>{item.Title}</Text>
              <Text>{item.Year}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
