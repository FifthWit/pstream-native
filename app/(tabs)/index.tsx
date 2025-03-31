import { MediaCard } from 'components/MediaCard';
import { useState, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { TMDB, Search, MultiSearchResult } from 'tmdb-ts';

if (!process.env.EXPO_PUBLIC_TMDB_READ_API_KEY) {
  throw new Error('EXPO_PUBLIC_TMDB_READ_API_KEY is not defined in the environment variables.');
}
const tmdb = new TMDB(process.env.EXPO_PUBLIC_TMDB_READ_API_KEY);

export default function HomeScreen() {
  const [movies, setMovies] = useState<Search<MultiSearchResult> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await tmdb.search.multi({ query: 'South Park' });
        setMovies(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View className="flex-1 items-center justify-start bg-background">
      <Text className="mb-4 mt-4 text-xl text-foreground">Home Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="flex w-full px-4">
          <ScrollView className="w-full">
            <View className="flex flex-row flex-wrap">
              {movies?.results?.map((item) => (
                <View key={`${item.id}-${item.media_type}`} className="m-2">
                  <MediaCard media={item} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
