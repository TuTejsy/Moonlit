export interface ProdTrialCardProps {
  dueTodayText: string;
  enabled: boolean;
  onToggle: () => void;
  trialDays: number | undefined;
}
