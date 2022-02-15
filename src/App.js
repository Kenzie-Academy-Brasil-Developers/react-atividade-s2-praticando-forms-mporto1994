import logo from './logo.svg';
import './App.css';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

function App() {
  const [user, setUser]=useState()
  const [log, setLog] = useState(false)
  const formSchema = yup.object().shape({
    name:                     yup.string().required("Nome Obrigatório!").max(18),
    mail:                     yup.string().required("Email Obrigatório!").email(),
    freeTime:                 yup.string().required("Lazer Obrigatório!"),
    programingLanguage:       yup.string().required("Linguagem Preferida Obrigatório!"),
    programingLanguagetoLearn:yup.string().required("Linguage a aprender Obrigatório!"),
    password:                 yup.string().required("Senha Obrigatório!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "sua senha deve conter .."),
    passwordConfirmation:     yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!")
  })

  const {register, handleSubmit,formState: {errors}}=useForm({
    resolver: yupResolver(formSchema),
  })

  const onSubmitFunction = (data) => {
    setUser(data)
    setLog(true)
    console.log(data)
  }
  console.log(errors)
  return (
    <div className="App">
      <header className="App-header">
        {log==false?<form onSubmit={handleSubmit(onSubmitFunction)}>
          <input type="text" placeholder='Nome' {...register('name')}/>
          <input type="email" placeholder='Email' {...register('mail')}/>
          <input type="text" placeholder='Lazer' {...register('freeTime')}/>
          <input type="text" placeholder='Linguagem preferida' {...register('programingLanguage')}/>
          <input type="text" placeholder='Linguage que gostaria de aprender' {...register('programingLanguagetoLearn')}/>
          <input type="password" placeholder='Senha' {...register('password')}/>
          <input type="password" placeholder='Confirmação de senha' {...register('passwordConfirmation')}/>
          <button type="submit">Enviar</button>
        </form>
        :user&&<div>
            <p>{user.name}</p>
            <p>{user.mail}</p>
            <p>{user.freeTime}</p>
            <p>{user.programingLanguage}</p>
            <p>{user.programingLanguagetoLearn}</p>
            
          </div>}
      </header>
    </div>
  );
}

export default App;
