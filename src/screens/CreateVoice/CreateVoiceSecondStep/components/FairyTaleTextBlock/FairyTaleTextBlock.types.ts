import Animated, { AnimatedRef } from 'react-native-reanimated';

export interface FairyTaleTextBlockProps {
  activeParagraphIndex: number;
  onParagraphLayout: (index: number, y: number) => void;
  paragraphs: string[];
  scrollRef: AnimatedRef<Animated.ScrollView>;
}
