import { Tabs } from "expo-router"
import { Text, StyleSheet } from "react-native"
import { useAppTheme } from "../../../theme/context"
import { ClubsIcon, ScanIcon, ProfileIcon } from "../../../components/TabIcons"

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.04,
    marginTop: 3,
  },
})

export default function TabLayout() {
  const { theme } = useAppTheme()
  const colors = theme.colors
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
      }}
    >
      <Tabs.Screen
        name="clubs"
        options={{
          title: "Clubs",
          tabBarIcon: ({ color, focused }) => (
            <ClubsIcon size={22} color={focused ? colors.primary : colors.outline} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <ScanIcon size={22} color={focused ? colors.primary : colors.outline} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon size={22} color={focused ? colors.primary : colors.outline} />
          ),
        }}
      />
    </Tabs>
  )
}
