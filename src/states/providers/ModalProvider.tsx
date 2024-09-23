import {ModalContext} from '@/states/contexts/ModalContext';
import {useState} from 'react';

export default function ModalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
      {children}
    </ModalContext.Provider>
  );
}
