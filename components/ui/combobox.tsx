"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  list: {value:string, label:string}[], 
  category: string,
  onValueChange?: (value: string) => void, // Optional callback
  defaultValue?: string // Optional default value
}

export function Combobox({
  list, 
  category, 
  onValueChange, 
  defaultValue = ""
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)
  const [selectedLabel, setSelectedLabel] = React.useState(
    defaultValue ? list.find(item => item.value === defaultValue)?.label || "" : ""
  )

  const handleSelect = (selectedItem: {value: string, label: string}) => {
    setValue(selectedItem.value)
    setSelectedLabel(selectedItem.label)
    setOpen(false)
    
    // Call the onValueChange callback if provided
    if (onValueChange) {
      onValueChange(selectedItem.value)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLabel || `Select ${category}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${category}...`} />
          <CommandList>
            <CommandEmpty>No {category} found.</CommandEmpty>
            <CommandGroup>
              {list.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => handleSelect(item)}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedLabel === item.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}