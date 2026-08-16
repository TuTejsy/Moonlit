export interface ProdPlanRowProps {
  detail: string;
  isSelected: boolean;
  name: string;
  onPress: () => void;
  price: string;
  priceUnit: string;
  badgeLabel?: string;
  testID?: string;
}
