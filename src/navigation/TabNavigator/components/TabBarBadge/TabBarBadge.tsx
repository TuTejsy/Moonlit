// import React from 'react';
// import { View } from 'react-native';

// import { useMakeStyles } from '@/hooks/theme/useMakeStyles';

// import { makeStyles } from './TabBarBadge.styles';

// import { TextView } from '@/components/Primitives/TextView/TextView';

// export interface TabBarBadgeProps {
//   value?: number;
// }

// export const TabBarBadge = ({ value = 0 }: TabBarBadgeProps) => {
//   const styles = useMakeStyles(makeStyles);

//   if (!value) {
//     return null;
//   }

//   const badgeValue = value < 100 ? value : '99+';

//   return (
//     <View style={styles.badge}>
//       <TextView bold style={styles.badgeValue}>
//         {badgeValue}
//       </TextView>
//     </View>
//   );
// };
