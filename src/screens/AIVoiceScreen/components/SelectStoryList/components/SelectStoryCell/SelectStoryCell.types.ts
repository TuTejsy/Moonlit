export interface SelectStoryCellProps {
  isFree: boolean;
  isSelected: boolean;
  onPress: (storyId: number) => void;
  previewURL: string | undefined;
  storyId: number;
  title: string;
}
