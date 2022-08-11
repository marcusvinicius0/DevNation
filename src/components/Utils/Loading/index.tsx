import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingProps {
  color: string;
  size: number;
}

export function Loading({ color, size }: LoadingProps) {
  return <AiOutlineLoading3Quarters color={color} size={size} />;
}
