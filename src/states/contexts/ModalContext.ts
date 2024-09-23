import {ICompany} from '@/interfaces/domain/ICompany';
import {createContext} from 'react';

export interface IIsModalOpen {
  isModalOpen: boolean;
  setIsModalOpen: (isModulOpen: boolean) => void;
}

export const ModalContext = createContext<IIsModalOpen | null>(null);
