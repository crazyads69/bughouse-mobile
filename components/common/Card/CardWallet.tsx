import React from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from "react-native";

const width_screen = Dimensions.get("window").width;

const card_item = width_screen - 24 * 2;

const card_size = {
  width: 325,
  height: 196,
};

const CardWallet = () => {
  return (
    <ImageBackground source={require("../../../assets/card_visa_bg.png")} style={styles.card}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image source={require("../../../assets/card_icon.png")} />

        <Text
          style={{
            color: "white",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          BugHouse Card
        </Text>
      </View>
      <View style={styles.cardNumber}>
        <Text style={styles.cardNumberText}>{`3112 2022 1133 6236`}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardHolderName}>Chủ thẻ</Text>
          <Text style={styles.cardName}>Yone Doan</Text>
        </View>
        <Image source={require("../../../assets/visa_text.png")} />
      </View>
    </ImageBackground>
  );
};

export default CardWallet;

const styles = StyleSheet.create({
  card: {
    width: card_item,
    height: (card_item * card_size.height) / card_size.width,
    padding: 24,
  },
  cardNumber: {
    flex: 1,
    justifyContent: "center",
  },
  cardNumberText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
  cardHolderName: { color: "rgba(255,255,255,0.4)" },
  cardName: { color: "white", fontSize: 14 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
