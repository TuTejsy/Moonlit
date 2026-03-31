import React from 'react';

import { render, screen } from '@testing-library/react-native';

import { MoonlitHeader } from '@/screens/HomeScreen/components/DefaultList/components/MoonlitHeader/MoonlitHeader';

describe('MoonlitHeader', () => {
  it('renders correctly', () => {
    render(<MoonlitHeader />);

    expect(screen.getByText('common.moonlit')).toBeTruthy();
    expect(screen.getByText('common.moonlitFairytaleAtmosphere')).toBeTruthy();
  });
});
