import React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

import { useTheme } from '@/hooks/theme/useTheme';

export const GoBack = (props: SvgProps) => {
  const { colors } = useTheme();

  return (
    <Svg height={32} viewBox='0 0 32 32' width={32} {...props}>
      <Path
        d='M15.9996 31.0868C23.4594 31.0868 29.6604 24.8993 29.6604 17.4261C29.6604 10.8368 24.8389 5.25198 18.5844 4.01981V2.11804C18.5844 1.16718 17.9281 0.912666 17.1915 1.43501L12.9192 4.42164C12.3165 4.85021 12.3032 5.49307 12.9192 5.93501L17.1781 8.93501C17.9281 9.47032 18.5844 9.21627 18.5844 8.25198V6.33678C23.6469 7.48861 27.3701 12.002 27.3701 17.4261C27.3701 23.7475 22.3076 28.81 15.9996 28.81C9.67812 28.81 4.60224 23.7475 4.61561 17.4261C4.62898 13.6225 6.47321 10.2609 9.3299 8.22518C9.87904 7.81004 10.0531 7.18055 9.70492 6.61804C9.3835 6.06895 8.64687 5.92164 8.05755 6.37701C4.60224 8.88147 2.33887 12.9261 2.33887 17.4261C2.33887 24.8993 8.52635 31.0868 15.9996 31.0868Z'
        fill={colors.white}
      />
      <Path
        d='M10.8638 15.4V13.981H13.5148V22H11.9308V15.4H10.8638ZM20.4261 15.312H16.8621V17.193C17.0161 17.0023 17.2361 16.8483 17.5221 16.731C17.8081 16.6063 18.1125 16.544 18.4351 16.544C19.0218 16.544 19.5021 16.6323 19.8761 16.929C20.2501 17.1857 20.5215 17.5157 20.6901 17.919C20.8588 18.315 20.9431 18.7403 20.9431 19.195C20.9431 20.0383 20.7011 20.7167 20.2171 21.23C19.7405 21.7433 19.0585 22 18.1711 22C17.3351 22 16.6678 21.791 16.1691 21.373C15.6705 20.955 15.3881 20.4087 15.3221 19.734H16.8181C16.8841 20.0273 17.0308 20.262 17.2581 20.438C17.4928 20.614 17.7898 20.702 18.1491 20.702C18.5818 20.702 18.9081 20.5663 19.1281 20.295C19.3481 20.0237 19.4581 19.6643 19.4581 19.217C19.4581 18.7623 19.3445 18.4177 19.1171 18.183C18.8971 17.941 18.5708 17.82 18.1381 17.82C17.8301 17.82 17.5735 17.897 17.3681 18.051C17.1628 18.205 17.0161 18.4103 16.9281 18.667H15.4541V13.959H20.4261V15.312Z'
        fill={colors.white}
      />
    </Svg>
  );
};
