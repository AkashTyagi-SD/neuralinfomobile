import React, { memo, useState, useCallback, Fragment } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../constant/Constant";
import Loading from "../customcomponent/Loading";
import Animation from "./Animation";
function AllPostList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  /**
   * Description:This function will fetch post list data from server
   */
  const fetchPostList = async () => {
    try {
      let response = await fetch(`${BASE_URL}posts`);
      let json = await response.json();
      setIsLoading(false);
      setData(json);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          inlineImageLeft='search_icon'
          
          //value={query}
          //onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  /**
   * Description:This function will call when user pull down list from top
   */
  const refreshdata = () => {
    setIsLoading(true);
    fetchPostList();
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchPostList();
      return () => {};
    }, [])
  );

  /**
   * Description:This function is used for open post detail screen and pass selected post data from this screen to next targeting screen
   * @param {*} item
   */
  const redirectToPostDetailScreen = (item) => {
    navigation.navigate("postdetails", { selectpost: item });
  };

  return (
    <View style={style.root}>
      {isLoading ? (
        <View style={style.loadingview}>
          <Loading loading={isLoading} />
        </View>
      ) : (
        <Animation>
        <Fragment>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("imagepick");
            }}
          >
            <View
              style={{
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Select Image</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("mapscreen");
            }}
          >
            <View
              style={{
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Open Location</Text>
            </View>
          </TouchableOpacity>
          <FlatList
          ListHeaderComponent={renderHeader}
            data={data}
            keyExtractor={(item) => item.id}
            refreshing={isLoading}
            onRefresh={() => {
              refreshdata();
            }}
            contentContainerStyle={{ padding: 15 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    redirectToPostDetailScreen(item);
                  }}
                >
                  <View style={style.container}>
                    <Text style={style.heading}>Title: </Text>
                    <Text style={style.title}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </Fragment>
        </Animation>
      )}
    </View>
  );
}

export default memo(AllPostList);

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
  },

  heading: {
    color: "black",
    fontWeight: "bold",
    alignItems: "flex-start",
    fontSize: 16,
  },
  title: {
    color: "grey",
    fontWeight: "normal",
    alignItems: "center",
    fontSize: 14,
  },
});
