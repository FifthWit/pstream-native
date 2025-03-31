import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { PosterResolver, getTitle, getReleaseDate, type MediaDetails } from 'lib/utils';
import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
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
              className="flex-center bg-primaryMuted active:bg-primary/20 ml-2 aspect-square rounded-full p-2"
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
                  style={{ width: 150, height: 225 }}
                />
              </View>
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View style={{ width: 150, marginRight: 16 }} />
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text className="text-xl font-bold text-foreground">{title}</Text>
                      <Text className="text-mutedForeground text-opacity-70">
                        {releaseDate ? releaseDate.split('-')[0] : 'N/A'} •{' '}
                        {type === 'show' ? 'Show' : type === 'movie' ? 'Movie' : type}
                      </Text>
                    </View>

                    <View className="flex flex-row rounded-full border-2 border-accent bg-zinc-900 px-2">
                      <TouchableOpacity
                        className="bg-primary/10 aspect-square rounded-full p-2 hover:bg-slate-800"
                        onPress={() => {
                          console.log('Like Implementation');
                        }}>
                        <MaterialIcons
                          name="thumb-up-off-alt"
                          size={24}
                          color="var(--color-accent)"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="bg-primary/10 rounded-full p-2"
                        onPress={() => {
                          console.log('Dislike Implementation');
                        }}>
                        <MaterialIcons
                          name="thumb-down-off-alt"
                          size={24}
                          color="var(--color-accent)"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="bg-primary/10 rounded-full p-2"
                        onPress={() => {
                          console.log('Bookmark Implementation');
                        }}>
                        <MaterialIcons
                          name="bookmark-border"
                          size={24}
                          color="var(--color-accent)"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className="mt-4">
                    <Text className="text-lg font-semibold text-foreground">Overview</Text>
                    <Text className="ml-1 text-foreground">{media.overview}</Text>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 125 }} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-foreground">Media not found</Text>
        </View>
      )}
    </View>
  );
}
