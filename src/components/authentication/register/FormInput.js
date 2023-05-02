import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const FormInput = () => {
  return (
    <>
      <View style={{  padding: 15}}>
        <View
          style={{
            flexDirection: "row-reverse",
            alignContent: "space-between",
          }}
        >
          <View style={[styles.inputField, { marginLeft: 10 }]}>
            <TextInput
              style={styles.input}
              placeholder="نام"
              placeholderTextColor="#a6a4ae"
              autoFocus={true}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputField}>
            <TextInput
              style={styles.input}
              placeholder="نام خانوادگی"
              placeholderTextColor="#a6a4ae"
              autoFocus={true}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="موبایل"
            placeholderTextColor="#a6a4ae"
            autoFocus={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#a6a4ae"
            autoCorrect={false}
            placeholder="پسورد"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#a6a4ae"
            autoCorrect={false}
            placeholder="تکرار پسورد"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#fe9493" : "#fb6a68",
            },

            styles.loginBtn,
          ]}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "IRANSansXFaNum-Bold",
            }}
          >
            ورود
          </Text>
        </Pressable>
        <View style={styles.registerBox}>
          <View>
            <Text style={styles.quesReg}>قبلا ثبت نام کرده اید؟</Text>
          </View>
          <Pressable style={{ marginRight: 10 }}>
            <Text style={styles.registerBtn}>ورود</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
    borderRadius: 7,
    padding: 17,

    backgroundColor: "#fff",
    marginBottom: 15,
  },
  input: {
    fontFamily: "IRANSansXFaNum-Regular",
  },
  loginBtn: { padding: 17, borderRadius: 7, alignItems: "center" },
  quesReg: { fontSize: 15, fontFamily: "IRANSansXFaNum-Regular" },
  registerBox: {
    flexDirection: "row-reverse",
    marginTop: 20,
  },
  registerBtn: {
    fontSize: 15,
    fontFamily: "IRANSansXFaNum-Bold",
    color: "#1978f1",
  },
});
