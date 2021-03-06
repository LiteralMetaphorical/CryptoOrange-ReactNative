import React from 'react';
import { Platform, Dimensions } from 'react-native';
import {
  createDrawerNavigator,
  createAppContainer,
  DrawerItems
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import BalancesScreen from '../screens/BalancesScreen';
import BuySellScreen from '../screens/BuySellScreen';
import DepositScreen from '../screens/DepositScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import HistoryScreen from '../screens/HistoryScreen';
import NewsScreen from '../screens/NewsScreen';
import SupportScreen from '../screens/SupportScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

const WIDTH = Dimensions.get('window').width;
const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  drawerBackgroundColor: '#282c34',
  edgeWidth: 0,
  contentOptions: {
    activeTintColor: 'orange',
    inactiveTintColor: 'white'
  }
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Balances: {
      screen: BalancesScreen
    },
    BuySell: {
      screen: BuySellScreen
    },
    Deposit: {
      screen: DepositScreen
    },
    Withdraw: {
      screen: WithdrawScreen
    },
    AllHistory: {
      screen: HistoryScreen
    },
    News: {
      screen: NewsScreen
    },
    Support: {
      screen: SupportScreen
    },
    Exchange: {
      screen: ExchangeScreen
    }
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator);
