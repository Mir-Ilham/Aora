import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  Alert,
  ScrollView,
} from "react-native";

import { updateVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";

const Update = () => {
  const [uploading, setUploading] = useState(false);
  const { id } = useLocalSearchParams();

  const [form, setForm] = useState({
    title: "",
    prompt: "",
  });

  const submit = async () => {
    if ((form.prompt === "") | (form.title === "")) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await updateVideoPost(form, id);

      Alert.alert("Success", "Post updated successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Update Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Update"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Update;
