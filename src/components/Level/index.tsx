import { useEffect } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { THEME } from '../../styles/theme';
import { styles } from './styles';

// Criando um componente animado
const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
};

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
};

export function Level({
  title,
  type = 'EASY',
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  const COLOR = TYPE_COLORS[type];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // Dentro do value é onde temos o conteúdo do useSharedValue, ou seja, o valor 1
        { scale: scale.value },
      ],
      // Para o interpolateColor funcionar, temos que passar o value do checked,
      // que vai ser 0 ou 1. O segundo parâmetro é o array com os valores possíveis.
      // O terceiro parâmetro também é um array com as cores que queremos definir para
      // cada valor, ou seja, se o value for 0, a cor vai ser a primeira, se for 1,
      // a cor vai ser a segunda.
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', COLOR]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100]
      ),
    };
  });

  function onPressIn() {
    scale.value = withTiming(1.1);
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }

  // Quando o isChecked for true, o value vai ser 1, se for false, o value vai ser 0
  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0);
  }, [isChecked]);

  return (
    <PressableAnimated
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.container,
        {
          borderColor: COLOR,
        },
        animatedContainerStyle,
      ]}
      {...rest}
    >
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        {title}
      </Animated.Text>
    </PressableAnimated>
  );
}
