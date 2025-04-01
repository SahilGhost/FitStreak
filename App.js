import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutsPage from './screens/WorkoutsPage';
import LeaderboardPage from './screens/LeaderboardPage';
import ProfileScreen from './screens/ProfileScreen';
import ForumPage from './screens/ForumPage';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom tab bar component
function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          let label = route.name;
          
          if (route.name === 'Home') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'Workouts') {
            iconName = isFocused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = isFocused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = isFocused ? 'person' : 'person-outline';
          } else if (route.name === 'Forum') {
            iconName = isFocused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.navItem}
            >
              <Ionicons 
                name={iconName} 
                size={24} 
                color={isFocused ? '#FF9500' : '#555555'} 
              />
              <Text 
                style={[
                  styles.tabLabel, 
                  { color: isFocused ? '#FF9500' : '#555555' }
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {Platform.OS === 'ios' && <View style={styles.bottomSafeArea} />}
    </View>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsPage} />
      <Tab.Screen name="Leaderboard" component={LeaderboardPage} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Forum" component={ForumPage} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <RootStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <RootStack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      </RootStack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomNavContainer: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
    width: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'space-between', // This ensures even spacing
    width: '100%',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '20%', // Each item takes exactly 20% of the width (for 5 items)
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center', // Centers the text
  },
  bottomSafeArea: {
    height: Platform.OS === 'ios' ? 24 : 0,
    backgroundColor: '#FFFFFF',
  }
});