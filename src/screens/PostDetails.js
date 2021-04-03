import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, Text,FlatList, } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BASE_URL } from "../constant/Constant";
import Loading from "../customcomponent/Loading";
function PostDetails() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
/**
   * Description:This function will fetch post list data from server
   */
 const fetchPostDetails = async (postid) => {
  try {
    let response = await fetch(`${BASE_URL}comments?postId=${postid}`);
    let json = await response.json();
    setIsLoading(false);
    setData(json);
  } catch (error) {
    setIsLoading(false);
    console.error(error);
  }
};
  useEffect(() => {
    if (route.params?.selectpost) {
      console.log("selectpost", route.params?.selectpost);
      fetchPostDetails(route.params?.selectpost.id);
    }
  }, [route.params?.selectpost]);

  
  
  return (
    <View style={style.root}>
      {isLoading ? (
        <View style={style.loadingview}>
          <Loading loading={isLoading} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item, index }) => {
            return (
             
                <View style={style.container}>
                  <View style={style.postdetailbody}>
                <Text style={style.heading}>PostId:</Text>
                  <Text style={style.title}>{item.postId}</Text>
                </View>
                <View style={style.postdetailbody}>
                <Text style={style.heading}>Name:</Text>
                  <Text style={style.title}>{item.name}</Text>
                </View>
                <View style={style.postdetailbody}>
                <Text style={style.heading}>Email:</Text>
                  <Text style={style.title}>{item.email}</Text>
                </View>
                <View style={style.postdetailbody}>
                <Text style={style.heading}>Comment:</Text>
                  <Text style={style.title}>{item.body}</Text>
                </View>
                </View>
             
            );
          }}
        />
      )}
    </View>
  );
}

export default memo(PostDetails);

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
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
  },
  
  heading:{
    color: "black",
    fontWeight: "bold",
    alignItems: "flex-start",
    fontSize: 16,
  },
  title: {
    color: "grey",
    fontWeight: "normal",
    marginLeft:10,
    alignItems: "center",
    fontSize: 14,
  },
  postdetailbody:{
    flexDirection:'row',
    marginVertical:1
  }
});

