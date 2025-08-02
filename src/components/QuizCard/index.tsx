import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const TouchableAnimatedOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

import type { QUIZZES } from '../../data/quizzes';
import { THEME } from '../../styles/theme';

import { LevelBars } from '../LevelBars';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  data: (typeof QUIZZES)[0];
  index: number;
};

export function QuizCard({ index, data, ...rest }: Props) {
  const Icon = data.svg;

  return (
    <TouchableAnimatedOpacity
      entering={FadeInUp.delay(index * 100)}
      style={styles.container}
      {...rest}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {Icon && <Icon size={24} color={THEME.COLORS.GREY_100} />}
        </View>

        <LevelBars level={data.level} />
      </View>

      <Text style={styles.title}>{data.title}</Text>
    </TouchableAnimatedOpacity>
  );
}
