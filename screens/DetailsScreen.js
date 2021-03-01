import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `http://localhost:5000/stars?name=${this.props.navigation.getParam(
        "stars_name"
      )}`
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        this.setDetails(response.data.data);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  setDetails = starsDetails => {
    const starsType = starsDetails.stars_type;
    let imagePath = "";
    switch (starsType) {
      case "Sun":
        imagePath = require("../assets/sun.png");
        break;
      case "Alpha Centauri":
        imagePath = require("../assets/alpha centauri.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/sirius.png");
        break;
      default:
        imagePath = require("../assets/sun.png");
    }

    this.setState({
      details: starsDetails,
      imagePath: imagePath
    });
  };

  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Distance: ${details.distance}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Mass : ${details.mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Radius : ${details.radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Stars Type : ${details.stars_type}`}</Text>
            </View>
            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});