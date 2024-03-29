import { z } from 'zod'
import { CustomForm, FormProps } from './components/CustomForm'

function App() {
  const fields: FormProps[] = [
    {
      title: 'Form 1',
      fields: [
        {
          label: 'Username',
          type: 'text',
          name: 'username',
          schema: z.string().min(3),
          placeholder: 'Enter your username',
        },
        {
          label: 'Password',
          type: 'password',
          name: 'password',
          schema: z.string().min(8),
          placeholder: 'Enter your password',
        },
      ],
      onSubmit: (data: any) => {
        console.log(data)
      }
    }
  ]

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      {
        fields.map((form) => (
          <CustomForm props={form} key={form.title} />
        ))
      }
    </div>
  )
}

export default App
