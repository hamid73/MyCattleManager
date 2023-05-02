import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, LABELS } from "../../../constants";

const BreedingBox = ({ event }) => {
  return (
    <View style={styles.boxStyle}>
      <Text
        style={[
          styles.header,
          styles.titleTextFont,
          { backgroundColor: COLORS.weighedBox },
        ]}
      >
        {LABELS.setLabel("BreedingInsights")}
      </Text>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.titleTextFont]}>
          {LABELS.setLabel("Insemination")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>0</Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.titleTextFont]}>
          {LABELS.setLabel("Abortions")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>0</Text>
      </View>

      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.titleTextFont]}>
          {LABELS.setLabel("Remark")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          دام برای آبستنی چک شود در غیر اینصورت نیاز دارد برای تلقیح یا جفت گیری
          مجدد
        </Text>
      </View>
    </View>
  );
};
//notAborted And Pregnancy And semenUsed :دام برای آبستنی چک شود در غیر اینصورت نیاز دارد برای تلقیح یا جفت گیری مجدد;
//abortedRemark: نیاز به بررسی دارد
//smenUsed after heat Date Remark: تلقیح استفده شده یا آبستنی چک شود

export default BreedingBox;

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,

    marginBottom: 10,
    color: COLORS.white,
    fontSize: 18,
  },
  boxStyle: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    marginTop: 20,
  },

  textStyle: {
    padding: 5,
    marginLeft: 10,
    textAlign: "left",
    flex: 1,
  },
  textDetStyle: {
    padding: 5,
    textAlign: "left",
    flex: 2,
  },
  textFont: { fontFamily: FONTS.IRAN_REGULAR },
  titleTextFont: { fontFamily: FONTS.IRAN_BOLD },
  detailsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
});
