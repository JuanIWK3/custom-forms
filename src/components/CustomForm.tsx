import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from "./ui/input"
import { Button } from "./ui/button"

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

  return (
    <div className="flex items-center p-8 flex-col shadow-xl rounded-lg bg-white">
      <h1 className="font-bold text-xl mb-4">{props.title}</h1>
      <form className="flex flex-col" onSubmit={form.handleSubmit(props.onSubmit)}>
        {props.fields.map((field) => (
          <div key={field.name}>
            <label className="font-bold mb-4">{field.label}</label>
            <Input
              className=""
              placeholder={field.placeholder}
              {...form.register(field.name)}
            />
            <p className="text-red-500 mb-4">{form.formState.errors[field.name]?.message?.toString()}</p>
          </div>
        ))}
        <Button variant={"default"} type="submit">Submit</Button>
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
  schema: any
  placeholder?: string
}