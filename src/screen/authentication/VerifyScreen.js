// import {
//   Pressable,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { FontAwesome5 } from "@expo/vector-icons";
// const VerifyScreen = () => {
//   const [count, setCount] = useState(20);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       //console.log("currentCount");

//       setCount((currentCount) => (currentCount > 0 ? --currentCount : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [count]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.brandLogo}>
//         <View style={styles.logo}>
//           <FontAwesome5 name="sms" size={74} color="#f3e3ed" />
//         </View>
//       </View>
//       <View style={{ width: "100%", padding: 15 }}>
//         <Text style={styles.txtVerifyStyle}>کد پیام شده را وارد کنید:</Text>
//         <View style={styles.inputField}>
//           <TextInput
//             style={styles.input}
//             placeholder="کد اعتبارسنجی"
//             placeholderTextColor="#f8f8f9"
//             autoFocus={true}
//             autoCapitalize="none"
//           />
//         </View>

//         <View style={{ flexDirection: "row", marginBottom: 20 }}>
//           <Pressable
//             style={({ pressed }) => [
//               {
//                 backgroundColor: pressed ? "#9d78be" : "#4f326b",
//               },

//               styles.loginBtn,
//             ]}
//           >
//             {/* <Spinner visible={loading} /> */}
//             <Text
//               style={{
//                 color: "white",
//                 fontSize: 18,
//                 fontFamily: "IRANSansXFaNum-Regular",
//               }}
//             >
//               ورود
//             </Text>
//           </Pressable>
//           <Pressable
//             style={({ pressed }) => [
//               {
//                 backgroundColor: pressed ? "#f2ce06" : "#f2c335",
//               },

//               styles.loginBtn,
//             ]}
//           >
//             <Text
//               style={{
//                 color: "white",
//                 fontSize: 18,
//                 fontFamily: "IRANSansXFaNum-Regular",
//               }}
//             >
//               تغییر شماره موبایل
//             </Text>
//           </Pressable>
//         </View>

//         <Text style={styles.txtVerifyStyle}>اعتبار کد تا {count} ثانیه</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default VerifyScreen;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: StatusBar.currentHeight,
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: "#00a8b1",
//   },
//   brandLogo: { alignItems: "center", justifyContent: "center" },
//   logo: {
//     backgroundColor: "#9d78be",
//     padding: 20,
//     borderRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   txtVerifyStyle: {
//     fontSize: 15,
//     color: "#fff",
//     fontFamily: "IRANSansXFaNum-ExtraBold",
//     marginBottom: 5,
//   },
//   registerBtn: {
//     fontSize: 15,
//     fontFamily: "IRANSansXFaNum-Bold",
//     color: "#1978f1",
//   },
//   inputField: {
//     borderRadius: 7,
//     padding: 17,
//     backgroundColor: "#91beb7",
//     marginBottom: 15,
//   },
//   input: {
//     fontFamily: "IRANSansXFaNum-Regular",
//     color: "#fff",
//   },
//   loginBtn: {
//     flex: 1,
//     marginHorizontal: 2,
//     padding: 17,
//     borderRadius: 7,
//     alignItems: "center",
//   },
// });
