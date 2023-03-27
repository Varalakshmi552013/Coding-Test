
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Avatar, Text, Icon, Input } from 'react-native-elements';
import './translation';
import data from './data';

const App = () => {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedId, setSelectedId] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [centerList, setCenterList] = useState(data);

  useMemo(() => {
    setCenterList(data.filter((i) => searchText.length > 0 ? i.title.toLowerCase().includes(searchText.toLowerCase()) : i));
  }, [searchText]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle} >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Text style={styles.header} h3>{t('title')}</Text>
      <Input placeholder={t("search").toString()} leftIcon={{ type: 'material-icons', name: 'search' }} onChangeText={(value) => setSearchText(value)} />
      <View style={styles.container}>
        <FlatList data={centerList}
          renderItem={({ item }) => <TouchableOpacity onPress={() => selectedId == item.id ? setSelectedId(0) : setSelectedId(item.id)}>
            <View style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Avatar
                  rounded
                  source={{
                    uri: item.url,
                  }}
                  size={52}
                />
                <Text style={styles.itemTitle} >{item.title}</Text>
                <Text style={styles.itemIcon}>
                  {(selectedId == item.id) ?
                    <Icon name='chevron-down-outline' type='ionicon' color='grey' />
                    : <Icon name='chevron-forward-outline' type='ionicon' color='grey' />}
                </Text>
              </View>
              {(selectedId == item.id) && <Text style={styles.itemDescription}>{item.description}</Text>}
            </View>
          </TouchableOpacity>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 12
  },
  container: {
    height: 730
  },
  itemContainer: {
    margin: 10,
    marginTop: 2,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  itemTitle: {
    flex: 1,
    justifyContent: 'flex-start',
    color: 'black',
    paddingLeft: 8,
    fontSize: 20,
  },
  itemIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    color: 'grey',
    fontSize: 20,
  },
  itemDescription: {
    fontSize: 16,
    paddingLeft: 16,
    paddingTop: 16
  }
});

export default App;