import { Input } from "./ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useEffect } from "react"

function createSchema(fields: Field[]) {
  const schema: any = {}

  fields.forEach((field) => {
    schema[field.name] = field.schema
  })

  return schema
}

export function CustomForm({ props }: { props: FormProps }) {
  const schema = createSchema(props.fields)

  const form = useForm({
    resolver: zodResolver(z.object(schema)),
    shouldFocusError: false,
  })

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])


  return (
    <div className="flex items-center p-4 flex-col">
      <h1 className="font-bold text-xl">{props.title}</h1>
      <form className="flex flex-col w-1/2" onSubmit={form.handleSubmit(props.onSubmit)}>
        {props.fields.map((field) => (
          <div key={field.name}>
            <Input
              placeholder={field.placeholder}
              {...form.register(field.name)}
            />
            <p className="text-red-500">{form.formState.errors[field.name]?.message?.toString()}</p>
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Submit</button>
      </form>
    </div>
  )
}

export type FormProps = {
  title: string
  fields: Field[]
  onSubmit: (data: any) => void
}

export type Field = {
  label: string
  type: string
  name: string
  value: string
  schema: any
  options?: string[]
  placeholder?: string
}