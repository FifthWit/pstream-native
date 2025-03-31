import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { PosterResolver } from 'lib/utils';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import '../global.css';
import { Media } from 'tmdb-ts';

interface MediaCardProps {
  media: Media;
}

export function MediaCard({ media }: MediaCardProps) {
  return (
    <Link
      asChild
      href={{
        pathname: '/(tabs)/media/[type]/[tmdbid]',
        params: { type: media.media_type, tmdbid: media.id },
      }}>
      <Pressable>
        <View className="rounded-xl">
          <View>
            <View style={{ position: 'relative' }}>
              <Image
                source={{ uri: PosterResolver(media.poster_path) }}
                style={{ width: 342 / 2, height: 513 / 2 }}
                className="rounded-lg"
              />
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(65, 32, 62, 0.7)',
                  borderRadius: 20,
                  padding: 8,
                }}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    console.log('Bookmark to be implemented');
                  }}>
                  <MaterialIcons name="bookmark-outline" size={20} color="pink" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-2 justify-between p-1">
              <View className="flex-row items-center justify-between">
                <Text className="flex-1 font-semibold text-foreground">
                  {media.media_type === 'movie' ? media.original_name : media.name}
                </Text>
                <Text className="text-right text-mutedForeground">
                  {media.first_air_date ? media.first_air_date.substring(0, 4) : ''} •{' '}
                  {media.media_type === 'tv'
                    ? 'Show'
                    : media.media_type === 'movie'
                      ? 'Movie'
                      : media.media_type}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
