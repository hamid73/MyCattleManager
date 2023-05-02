import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS, FONTS, ICONS, LABELS } from "../../../constants";
import React, { useEffect, useState } from "react";
import { CATTLESQUERY } from "../../../queries";

import EventMenu from "../../menu/EventMenu";

const GiveBirthBox = ({ eventData, general }) => {
  useEffect(() => {
    getResultMates(eventData.name);
  }, []);
  const [result, setResult] = useState();
  const getResultMates = async (id) => {
    id && setResult(await CATTLESQUERY.getCattleById(id));
  };

  return (
    <View style={styles.boxStyle} key={eventData.relationId}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Image source={ICONS.childbirth} style={{ width: 25, height: 25 }} />
          <Text style={[styles.titleTextFont, styles.titleHeader]}>
            {LABELS.setLabel("GiveBirth")}
          </Text>
        </View>
        <EventMenu
          showCopy={false}
          eventId={eventData.id}
          relationId={eventData.relationId}
          type={eventData.type}
          general={general}
        />
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel("eventDate")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {eventData.createdAt}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel("Semen/Tag")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {result?.plaque}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel("Plaque")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {eventData.plaque}
        </Text>
      </View>

      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel("Note")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {(eventData.note && eventData.note) || "-"}
        </Text>
      </View>
    </View>
  );
};

export default GiveBirthBox;

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    backgroundColor: COLORS.giveBirthBox,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleHeader: { color: COLORS.white, fontSize: 15, marginLeft: 10 },
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
  textFont: { fontFamily: FONTS.IRAN_REGULAR },
  titleTextFont: { fontFamily: FONTS.IRAN_BOLD },
  textStyle: {
    padding: 5,
    marginLeft: 10,
    textAlign: "left",
    flex: 1,
  },
  textDetStyle: {
    padding: 5,
    textAlign: "left",
    flex: 1,
  },
  detailsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
});
