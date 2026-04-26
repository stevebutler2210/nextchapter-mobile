import { StyleSheet, View } from "react-native"

import { Text } from "@/components/Text"

export default function Scan() {
  return (
    <View style={styles.container}>
      <Text>Scan</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
