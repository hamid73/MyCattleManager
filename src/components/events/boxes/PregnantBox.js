import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { COLORS, FONTS, ICONS, LABELS } from "../../../constants";
import { CATTLESQUERY, PREGNANTQUERY } from "../../../queries";
import { useEffect } from "react";
import { useState } from "react";
import EventMenu from "../../menu/EventMenu";

const PregnantBox = ({ eventData, general }) => {
  useEffect(() => {
    getResultPregnant(eventData?.relationId);
  }, []);

  const [result, setResult] = useState();
  const [fPlaque, setFplaque] = useState();
  const getResultPregnant = async (id) => {
    setResult(await PREGNANTQUERY.getPregnantById(id));
  };
  useEffect(() => {
    getFatherPlaque(result?.cattleId);
  }, [result]);
  const getFatherPlaque = async (id) => {
    id && setFplaque(await CATTLESQUERY.getCattleById(id));
  };

  return (
    <View style={styles.boxStyle} key={eventData.relationId}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={ICONS.pregnancyTest}
            style={{ width: 25, height: 25 }}
          />
          <Text style={[styles.titleTextFont, styles.titleHeader]}>
            {LABELS.setLabel("Pregnant")}
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
          {LABELS.setLabel("MatingDate")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {" "}
          {result?.matingDate}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel("DeliveryDate")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {result?.deliveryDate}
        </Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={[styles.textStyle, styles.textFont]}>
          {LABELS.setLabel("Semen/Tag")}:
        </Text>
        <Text style={[styles.textDetStyle, styles.textFont]}>
          {fPlaque?.plaque}
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

export default PregnantBox;

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    backgroundColor: COLORS.pregnantBox,
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
