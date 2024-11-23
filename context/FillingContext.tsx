import { FillingService } from '@/api/FillingService';
import { Filling } from '@/types/Filling';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FillingContextProps {
  fillings: Filling[];
  activeSlideId: number | null;
  setActiveSlideId: (id: number) => void;
}

const FillingContext = createContext<FillingContextProps | undefined>(undefined);

export const FillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fillings, setFillings] = useState<Filling[]>([]);
  const [activeSlideId, setActiveSlideId] = useState<number | null>(null);

  useEffect(() => {
    const loadFillings = async () => {
      const fetchedFillings = await FillingService.fetchAllFillings();
      setFillings(fetchedFillings);
    };

    loadFillings();
  }, []);

  return (
    <FillingContext.Provider value={{ fillings, activeSlideId, setActiveSlideId }}>
      {children}
    </FillingContext.Provider>
  );
};

export const useFillingContext = (): FillingContextProps => {
  const context = useContext(FillingContext);
  if (!context) {
    throw new Error('useFillingContext must be used within a FillingProvider');
  }
  return context;
};
