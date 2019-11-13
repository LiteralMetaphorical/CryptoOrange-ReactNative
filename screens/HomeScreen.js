import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput
} from 'react-native';
import {
  WebView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  ThemeProvider,
  Header,
  SearchBar
} from 'react-native-elements';
import { MonoText } from '../components/StyledText';
import * as testiranje from './test.js';
import { AntDesign } from '@expo/vector-icons';

const coinbaseWS = 'wss://ws-feed.pro.coinbase.com';

const websocketUrl = 'ws://192.168.0.180:8000/charts';

const areaChartHtml = `
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 mimum-scale=1">
<style>body {margin: 0}</style>
<body>
  <div id="areachartdiv"></div>
</body>
<script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>
`;

const candleChartHtml = `
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 mimum-scale=1">
<style>body {margin: 0}</style>
<body>
  <div id="candlechartdiv"></div>
</body>
<script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>
`;

function AreaChart() {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const areaChartJS = testiranje.areaChart(width);

  return(
    <View>
      <WebView
        originWhitelist={['*']}
        useWebKit={true}
        source={{ html: areaChartHtml }}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        style={styles.WebViewStyle}
        injectedJavaScript={areaChartJS}
      />
    </View>
  );
}

function CandleChart() {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const candleChartJS = testiranje.candleChart(width);

  return(
    <View>
      <WebView
        originWhitelist={['*']}
        useWebKit={true}
        source={{ html: candleChartHtml }}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        style={styles.WebViewStyle}
        injectedJavaScript={candleChartJS}
      />
    </View>
  );
}

export default function HomeScreen() {

  const [selectedChart, setChart] = useState('area');
  const [currencyPair, setPair] = useState('BTC-USD');

  useEffect(() => {
    opensocket(coinbaseWS);
  });

  const opensocket = (coinbaseWS) => {
    const ws = new WebSocket(coinbaseWS);
    ws.onopen = () => {
      ws.send(JSON.stringify(
        {
          'type': 'subscribe',
          'product_ids': [currencyPair],
          'channels': ['ticker']
        }
      ));
    }
    ws.onmessage = (message) => {
      console.log(JSON.parse(message.data).price);
    }
  }

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const areaChartJS = testiranje.areaChart(width);
  const candleChartJS = testiranje.candleChart(width);

  const disableScroll = () => {
    console.log('disabled scroll')
    setScroll(false);
  };

  const enableScroll = () => {
    console.log('enabled scroll')
    setScroll(true);
  }

  const changeChart = () => {
    if (selectedChart === 'candle') {
      setChart('area');
    } else {
      setChart('candle');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList

        renderItem={({ item }) => <Text>{item.key}</Text>}
        ListHeaderComponent={
          <View>
            <Text>LOL</Text>
            {selectedChart === 'area' ? <AreaChart /> : <CandleChart />}
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={{width: '10%', backgroundColor: 'green'}} onPress={changeChart}><Text>{selectedChart === 'area' ? 'Candle' : 'Area'}</Text></TouchableOpacity>
              <TouchableOpacity style={{width: '10%', backgroundColor: 'green'}} onPress={changeChart}><Text>{selectedChart === 'area' ? 'Candle' : 'Area'}</Text></TouchableOpacity>
              <TouchableOpacity style={{width: '10%', backgroundColor: 'green'}} onPress={changeChart}><Text>{selectedChart === 'area' ? 'Candle' : 'Area'}</Text></TouchableOpacity>
              <TouchableOpacity onPress={changeChart} style={{width: '10%', borderColor: 'orange', borderWidth: 1, borderRadius: 2}}>
                <AntDesign name={selectedChart === 'area' ? 'barschart' : 'linechart'} size={32} color='orange' />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      <View style={styles.contentBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          BTC/USD
          <Text style={{ color: 'red' }}>10.00000000000</Text>
        </Text>
      </View>
      <View style={styles.contentBox}>
        <Text>test1</Text>
        <Text>test1</Text>
        <Text>test1</Text>
      </View>
      <View style={styles.contentBox}>
        <Text>test2</Text>
        <Text>test2</Text>
        <Text>test2</Text>
      </View>
      <View style={styles.contentBox}>
        <Text>test1</Text>
        <Text>test1</Text>
        <Text>test1</Text>
      </View>
      <View style={styles.contentBox}>
        <Text>test2</Text>
        <Text>test2</Text>
        <Text>test2</Text>
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: '#282c34'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: 'white'
  }
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  WebViewStyle: {
    flex: 2,
    backgroundColor: '#3f444d',
    height: 300
  },
  container: {
    flex: 1,
    backgroundColor: '#343942',
    marginTop: 0
  },
  contentBox: {
    backgroundColor: '#282c34',
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderBottomColor: 'black',
    marginBottom: 10
  },
  buttonStyle: {
    width: 30,
    maxWidth: 30,
    textAlign: 'center',
    backgroundColor: 'red'
  }
});

// <WebView
//   source={{html: html}}
//   domStorageEnabled={true}
//   javaScriptEnabled={true}
//   style={styles.WebViewStyle}
//   injectedJavaScript={injectJS}
// />
