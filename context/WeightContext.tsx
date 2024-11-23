import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WeightContextType {
  weight: number;
  setWeight: (weight: number) => void;
}

const WeightContext = createContext<WeightContextType | undefined>(undefined);

export const WeightProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weight, setWeight] = useState(2); // Начальное значение

  return (
    <WeightContext.Provider value={{ weight, setWeight }}>
      {children}
    </WeightContext.Provider>
  );
};

export const useWeightContext = () => {
  const context = useContext(WeightContext);
  if (context === undefined) {
    throw new Error('useWeight must be used within a WeightProvider');
  }
  return context;
};
