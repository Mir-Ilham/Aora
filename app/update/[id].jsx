import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ScrollView } from "react-native";

import { updateVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";

import Toast from "react-native-simple-toast";

const Update = () => {
  const [uploading, setUploading] = useState(false);
  const { id } = useLocalSearchParams();

  const [form, setForm] = useState({
    title: "",
    prompt: "",
  });

  const submit = async () => {
    if ((form.prompt === "") | (form.title === "")) {
      Toast.show("Please fill in all fields");
      return;
    }

    setUploading(true);
    try {
      await updateVideoPost(form, id);

      Toast.show("Post updated successfully");
      router.push("/home");
    } catch (error) {
      Toast.show("Error");
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
