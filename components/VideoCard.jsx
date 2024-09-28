import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import { deleteUserPosts, updateVideoPost } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

import { icons } from "../constants";

const VideoCard = ({
  title,
  prompt,
  creator,
  avatar,
  thumbnail,
  video,
  id,
  UDhandler,
}) => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          {creator == user.username ? (
            <View className="flex flex-row">
              <TouchableOpacity
                onPress={() => {
                  router.push(`/update/${id}`);
                }}
              >
                <Image
                  source={icons.update}
                  className="w-7 h-7"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (deleteUserPosts(id)) {
                    UDhandler();
                  }
                }}
              >
                <Image
                  source={icons.del}
                  className="w-7 h-7 ml-4"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
