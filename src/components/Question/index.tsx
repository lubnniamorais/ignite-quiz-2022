import { Dimensions, Text } from 'react-native';
import Animated, { Keyframe } from 'react-native-reanimated';

import { Option } from '../Option';
import { styles } from './styles';

type QuestionProps = {
  title: string;
  alternatives: string[];
};

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
};

// Pegamos a largura da tela
const SCREEN_WIDTH = Dimensions.get('window').width;

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
}: Props) {
  // No Keyframe definimos o que vai acontecer no inicio, no meio e no fim da animação,
  // ou seja, a primeira animação vai ser de 0% para 70% e a segunda de 70% para 100%
  const enteringKeyframe = new Keyframe({
    // Quando estiver em 0 queremos que o componente fique do lado de fora da tela
    0: {
      opacity: 0,
      transform: [{ translateX: SCREEN_WIDTH }, { rotate: '90deg' }],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: '0deg' }],
    },
  });

  const exitingKeyframe = new Keyframe({
    from: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: '0deg' }],
    },
    to: {
      opacity: 0,
      transform: [{ translateX: SCREEN_WIDTH * -1 }, { rotate: '-90deg' }],
    },
  });

  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyframe.duration(400)}
      exiting={exitingKeyframe.duration(400)}
    >
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  );
}
