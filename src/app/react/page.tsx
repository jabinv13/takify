"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const FormSchema = z.object({
  schema: z.string({
    required_error: "Please select an email to display.",
  }),
});

const Page = () => {
  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
  ];
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data.schema);
    const selectedSchemaValue = {
      label: data.schema,
      value: data.schema,
    };
    const selectedSchema = availableSchemas.find(
      (option) => option.value === selectedSchemaValue.value
    );
    setSelectedSchemas([...selectedSchemas, selectedSchema]);
    setAvailableSchemas(
      availableSchemas.filter(
        (option) => option.value !== selectedSchemaValue.value
      )
    );
  }

  console.log(selectedSchemas);

  const handleSchemaSelection = (schema) => {
    const a = availableSchemas.filter((s) => s.value === schema);
    console.log(a);

    if (!selectedSchemas.includes(schema)) {
      setSelectedSchemas([...selectedSchemas, a[0]]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== a)
      );
    }

    // setSelectedSchemas([...selectedSchemas, a[0]]);
    // setAvailableSchemas(
    //   availableSchemas.filter((option) => option.value !== selectedSchema.value)
    // );

    // setSelectedSchemas((prev) => [...prev, ...a]);

    // setAvailableSchemas(
    //   availableSchemas.filter((option) => option.value !== selectedSchema.value)
    // );
  };

  const handleSchemaRemoval = (removedSchema) => {
    setSelectedSchemas((prev) =>
      prev.filter((schema) => schema !== removedSchema)
    );

    setAvailableSchemas([...availableSchemas, removedSchema]);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="schema"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schema here" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableSchemas.map((schema) => {
                      return (
                        <SelectItem key={schema.value} value={schema.value}>
                          {schema.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {selectedSchemas.map((schema, index) => (
        <Select
          value={schema.value}
          onValueChange={(e) => {
            handleSchemaRemoval(schema);
            handleSchemaSelection(e);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select schema here" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={schema.value}>{schema.label}</SelectItem>
            {availableSchemas
              //   .concat(selectedSchemas.filter((s) => s.value === schema.value))
              .map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
};

export default Page;
