import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react';
import ErrorModalView from './ErrorModalView';

interface ErrorModalContextData {
  showError: (title: string, message: string) => void;
}

const ErrorModalContext = createContext<ErrorModalContextData>(
  {} as ErrorModalContextData
);

export function ErrorModalProvider({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const showError = useCallback((t: string, msg: string) => {
    setTitle(t);
    setMessage(msg);
    setVisible(true);
  }, []);

  const hide = useCallback(() => setVisible(false), []);

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <ErrorModalView
        visible={visible}
        title={title}
        message={message}
        onClose={hide}
      />
    </ErrorModalContext.Provider>
  );
}

export const useErrorModal = () => useContext(ErrorModalContext);
