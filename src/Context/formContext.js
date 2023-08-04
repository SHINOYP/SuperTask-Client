import { useState, useContext, createContext, useEffect } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [form, setForm] = useState(false);

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};

//custom hook
const useFormUpdate = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
export { useFormUpdate, FormProvider };
