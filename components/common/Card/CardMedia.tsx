import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { SIZES } from "../../../consts/sizes";

const CardMedia = ({
  source,
  borderBottomRadius = false,
}: {
  source: any;
  borderBottomRadius?: boolean;
}) => {
  return (
    <View
      style={[styles.media].concat(
        //@ts-ignore'
        borderBottomRadius ? styles.borderBottomRadius : null
      )}
    >
      <Image style={styles.image} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  media: {
    flex: 1,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  borderBottomRadius: {
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
});

export default CardMedia;
