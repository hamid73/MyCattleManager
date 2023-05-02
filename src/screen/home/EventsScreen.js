import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { COLORS, FONTS, MESSAGES } from "../../constants";
import { useEffect } from "react";
import { SetEvent } from "../../components/events";
import { useDispatch, useSelector } from "react-redux";
import { getEventsByCattleId } from "../../redux/features/eventSlice";
import Spinner from "react-native-loading-spinner-overlay";

const EventsScreen = ({ route }) => {
  const { id } = route.params;
  // console.log(
  //   "🚀 ~ file: EventsScreen.js:11 ~ EventsScreen ~ route.params",
  //   route.params
  // );

  const { events, loading } = useSelector((state) => ({
    ...state.event,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventsByCattleId({ cattleId: id }));
  }, []);
  useEffect(() => {}, [events]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Spinner visible={loading} />
        {(events &&
          events.length > 0 &&
          events.map((item) => {
            return SetEvent(item.type, item, { general: false });
          })) || (
          <Text style={[styles.notFoundStyle, styles.titleTextFont]}>
            {MESSAGES.setMessage("notFoundEvents")}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: "100%",
    backgroundColor: COLORS.backGround,
    paddingBottom: 20,
  },
  titleTextFont: { fontFamily: FONTS.IRAN_BOLD },
  textFont: { fontFamily: FONTS.IRAN_REGULAR },
  notFoundStyle: {
    flex: 1,
    color: COLORS.gray,
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
    height: 400,
  },
});
