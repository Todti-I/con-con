import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Button, TextInput } from 'react-native';
import { TabParamList } from './types';

const CreatePostScreen = ({
  navigation,
}: BottomTabScreenProps<TabParamList, 'CreatePost'>) => {
  const [postText, setPostText] = useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
          });
        }}
      />
    </>
  );
};

export default CreatePostScreen;
