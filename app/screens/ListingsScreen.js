import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import Card from "../components/Card";
import listingsApi from "../api/listings";
import colors from "../config/colors";
import routes from "../navigation/routes";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import useApi from "../hooks/useApi";

function ListingScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const getListingApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingApi.loading} />
      <Screen style={styles.screen}>
        {getListingApi.error && (
          <>
            <AppText>Couldn't retrive the listings.</AppText>
            <AppButton title="Retry" onPress={getListingApi.request} />
          </>
        )}
        <FlatList
          data={getListingApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          refreshing={refreshing}
          onRefresh={getListingApi.request}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingScreen;
