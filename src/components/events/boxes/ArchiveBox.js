import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, LABELS } from "../../../constants";

const ArchiveBox = ({ event }) => {
  return (
    <View style={styles.boxStyle}>
      <Text
        style={[
          styles.header,
          styles.titleTextFont,
          { backgroundColor: COLORS.abortedBox },
        ]}
      >
        {LABELS.setLabel("ArchiveDet")}
      </Text>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.titleTextFont]}>
          {LABELS.setLabel("EventDate")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {event.createdAt}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.titleTextFont]}>
          {LABELS.setLabel("Reason")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {LABELS.setLabel(event.type)}
        </Text>
      </View>
      {event.type === "sold" && (
        <View style={styles.detailsStyle}>
          <Text style={[styles.textStyle, styles.titleTextFont]}>
            {LABELS.setLabel("Amount")}:
          </Text>
          <Text
            style={[
              styles.textDetStyle,
              styles.titleTextFont,
              { fontSize: 17 },
            ]}
          >
            0 ريال
          </Text>
        </View>
      )}
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.titleTextFont]}>
          {LABELS.setLabel("Note")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>{event.note}</Text>
      </View>
    </View>
  );
};

export default ArchiveBox;

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
