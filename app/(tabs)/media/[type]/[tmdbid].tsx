import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { PosterResolver, getTitle, getReleaseDate, type MediaDetails } from 'lib/utils';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { TMDB } from 'tmdb-ts';

if (!process.env.EXPO_PUBLIC_TMDB_READ_API_KEY) {
  throw new Error('EXPO_PUBLIC_TMDB_READ_API_KEY is not defined in the environment variables.');
}
const tmdb = new TMDB(process.env.EXPO_PUBLIC_TMDB_READ_API_KEY);

// Code is very very goofy much to do especially for mobile, on desktop it looks decent

export default function MediaDetailsScreen() {
  const { type, tmdbid } = useLocalSearchParams<{ type: string; tmdbid: string }>();
  const [media, setMedia] = useState<MediaDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth < 768;

  useEffect(() => {
    const fetchMediaDetails = async () => {
      if (!tmdbid || !type) return;

      try {
        setLoading(true);
        if (type === 'movie') {
          const result = await tmdb.movies.details(parseInt(tmdbid, 10));
          setMedia(result);
        } else if (type === 'tv') {
          const result = await tmdb.tvShows.details(parseInt(tmdbid, 10));
          setMedia(result as unknown as MediaDetails);
        }
      } catch (error) {
        console.error('Error fetching media details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [tmdbid, type]);
  const title = media ? getTitle(media) : '';
  const releaseDate = media ? getReleaseDate(media) : '';

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerTitle: title || 'Media Details',
          headerShown: true,
          headerStyle: { backgroundColor: '#120a11' },
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-center active:bg-primary/20 ml-2 aspect-square rounded-full bg-primaryMuted p-2"
              style={{
                elevation: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons name="arrow-back" size={24} color="#e91e63" />
            </TouchableOpacity>
          ),
        }}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#e91e63" />
        </View>
      ) : media ? (
        <ScrollView>
          {isMobile ? (
            <View>
              <View className="relative">
                <Image
                  className="w-full"
                  source={{ uri: PosterResolver(media.backdrop_path) }}
                  style={{ width: '100%', height: 200 }}
                  blurRadius={7}
                />
              </View>

              <View className="-mt-16 items-center px-4">
                <Image
                  className="mb-4 rounded-lg shadow-2xl"
                  source={{ uri: PosterResolver(media.poster_path) }}
                  style={{ width: 240, height: 360 }}
                />

                <View className="mt-4 w-full">
                  <Text className="mb-1 text-center text-xl font-bold text-foreground">
                    {title}
                  </Text>
                  <Text className="mb-4 text-center text-mutedForeground text-opacity-70">
                    {releaseDate ? releaseDate.split('-')[0] : 'N/A'} •{' '}
                    {type === 'tv' ? 'Show' : type === 'movie' ? 'Movie' : type}
                  </Text>
                  <TouchableOpacity
                    className="mb-4 w-full flex-row items-center justify-center rounded-full bg-accent py-3"
                    onPress={() => {
                      console.log('Play Implementation');
                    }}>
                    <MaterialIcons name="play-arrow" size={24} color="#fff" />
                    <Text className="ml-2 font-bold text-white">Play</Text>
                  </TouchableOpacity>
                  <View className="mb-2 flex-row justify-evenly">
                    <View className="items-center">
                      <TouchableOpacity
                        className="aspect-square items-center justify-center rounded-full bg-zinc-800 p-3"
                        onPress={() => {
                          console.log('Like Implementation');
                        }}>
                        <MaterialIcons name="thumb-up-off-alt" size={24} color="#e91e63" />
                      </TouchableOpacity>
                      <Text className="mt-1 text-xs text-foreground">Like</Text>
                    </View>

                    <View className="items-center">
                      <TouchableOpacity
                        className="aspect-square items-center justify-center rounded-full bg-zinc-800 p-3"
                        onPress={() => {
                          console.log('Dislike Implementation');
                        }}>
                        <MaterialIcons name="thumb-down-off-alt" size={24} color="#e91e63" />
                      </TouchableOpacity>
                      <Text className="mt-1 text-xs text-foreground">Dislike</Text>
                    </View>

                    <View className="items-center">
                      <TouchableOpacity
                        className="aspect-square items-center justify-center rounded-full bg-zinc-800 p-3"
                        onPress={() => {
                          console.log('Bookmark Implementation');
                        }}>
                        <MaterialIcons name="bookmark-border" size={24} color="#e91e63" />
                      </TouchableOpacity>
                      <Text className="mt-1 text-xs text-foreground">Bookmark</Text>
                    </View>
                  </View>
                </View>

                <View className="mt-2 px-2">
                  <Text className="text-lg font-semibold text-foreground">Overview</Text>
                  <Text className="text-foreground">{media.overview}</Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View className="relative">
                <Image
                  className="w-full"
                  source={{ uri: PosterResolver(media.backdrop_path) }}
                  style={{ width: '100%', height: 200 }}
                  blurRadius={7}
                />
                <View className="absolute" style={{ left: 16, top: 100 }}>
                  <Image
                    className="rounded-lg shadow-2xl"
                    source={{ uri: PosterResolver(media.poster_path) }}
                    style={{ width: 220, height: 330 }}
                  />
                </View>
              </View>

              <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ width: 220, marginRight: 16 }} />
                  <View style={{ flex: 1 }}>
                    <View>
                      <Text className="text-xl font-bold text-foreground">{title}</Text>
                      <Text className="text-mutedForeground text-opacity-70">
                        {releaseDate ? releaseDate.split('-')[0] : 'N/A'} •{' '}
                        {type === 'show' ? 'Show' : type === 'movie' ? 'Movie' : type}
                      </Text>
                    </View>
                    <TouchableOpacity
                      className="mb-4 mt-3 flex-row items-center justify-center rounded-full bg-accent py-3"
                      onPress={() => {
                        console.log('Play Implementation');
                      }}>
                      <MaterialIcons name="play-arrow" size={24} color="#fff" />
                      <Text className="ml-2 font-bold text-white">Play</Text>
                    </TouchableOpacity>
                    <View className="mb-4 flex-row justify-start space-x-8">
                      <View className="items-center">
                        <TouchableOpacity
                          className="aspect-square items-center justify-center rounded-full bg-zinc-800 p-3"
                          onPress={() => {
                            console.log('Like Implementation');
                          }}>
                          <MaterialIcons name="thumb-up-off-alt" size={24} color="#e91e63" />
                        </TouchableOpacity>
                        <Text className="mt-1 text-xs text-mutedForeground">Like</Text>
                      </View>

                      <View className="items-center">
                        <TouchableOpacity
                          className="aspect-square items-center justify-center rounded-full bg-zinc-800 p-3"
                          onPress={() => {
                            console.log('Dislike Implementation');
                          }}>
                          <MaterialIcons name="thumb-down-off-alt" size={24} color="#e91e63" />
                        </TouchableOpacity>
                        <Text className="mt-1 text-xs text-mutedForeground">Dislike</Text>
                      </View>

                      <View className="items-center">
                        <TouchableOpacity
                          className="aspect-square items-center justify-center rounded-full bg-zinc-800 p-3"
                          onPress={() => {
                            console.log('Bookmark Implementation');
                          }}>
                          <MaterialIcons name="bookmark-border" size={24} color="#e91e63" />
                        </TouchableOpacity>
                        <Text className="mt-1 text-xs text-mutedForeground">Bookmark</Text>
                      </View>
                    </View>
                    <View className="mt-4">
                      <Text className="text-lg font-semibold text-foreground">Overview</Text>
                      <Text className="ml-1 text-foreground">{media.overview}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-foreground">Media not found</Text>
        </View>
      )}
    </View>
  );
}
