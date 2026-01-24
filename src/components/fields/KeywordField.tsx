"use client"

import { Button } from "components/ui/button"
import { FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import type React from "react"

import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"


import http from "services/api"

interface Skill {
  id: string
  title: string
}

interface IProps {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
}

export default function KeywordField({ placeholder, required, name, label }: IProps) {
  const { control, setValue, getValues } = useFormContext()
  const [keyword, setKeyword] = useState("")
  const [isObjectData, setIsObjectData] = useState(false)
  const [originalData, setOriginalData] = useState<Skill[] | string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])

  // Initialize data on component mount
  useEffect(() => {
    const formValues = getValues(name) || []
    setOriginalData(formValues)

    // Check if we're dealing with an array of objects or strings
    if (Array.isArray(formValues) && formValues.length > 0 && typeof formValues[0] === "object") {
      setIsObjectData(true)
      // Extract titles from objects for display
      const titles = formValues.map((value: Skill) => value.title)
      setKeywords(titles)
    } else {
      setIsObjectData(false)
      // If it's already an array of strings, use it directly
      setKeywords(formValues as string[])
    }
  }, [getValues, name])

  const handleAddKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      const updatedKeywords = [...keywords, keyword.trim()]
      setKeywords(updatedKeywords)

      // Update form value based on data type
      if (isObjectData) {
        // For object data, maintain the original structure for existing items
        // and add new items as objects with temporary IDs
        const updatedValues = [...(originalData as Skill[])]
        // Only add new keywords that don't exist in original data
        if (!updatedValues.some((item) => item.title === keyword.trim())) {
          updatedValues.push({
            id: `temp-${Date.now()}`, // Temporary ID for new items
            title: keyword.trim(),
          })
        }
        setValue(name, updatedValues)
      } else {
        // For string data, just use the array of strings
        setValue(name, updatedKeywords)
      }

      setKeyword("")
    }
  }

  const handleRemoveKeyword = async (removeKeyword: string) => {
    try {
      if (isObjectData) {
        // Find the item to remove
        const itemToRemove = (originalData as Skill[]).find((item) => item.title === removeKeyword)

        // Only call API if the item has a real ID (not a temporary one)
        if (itemToRemove && !itemToRemove.id.startsWith("temp-")) {
          try {
            await http.delete(`vacancy/skill/${itemToRemove.id}`)
          } catch (error) {
            alert("O'chirishda xatolik")
            return
          }
        }

        // Update the form value by filtering out the removed item
        const updatedValues = (originalData as Skill[]).filter((item) => item.title !== removeKeyword)
        setOriginalData(updatedValues)
        setValue(name, updatedValues)
      } else {
        // For string data, just filter out the removed keyword
        const updatedKeywords = keywords.filter((kw) => kw !== removeKeyword)
        setOriginalData(updatedKeywords)
        setValue(name, updatedKeywords)
      }

      // Update the displayed keywords
      const updatedKeywords = keywords.filter((kw) => kw !== removeKeyword)
      setKeywords(updatedKeywords)
    } catch (error) {
      console.error("Error removing keyword:", error)
      alert("Xatolik yuz berdi")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault() // Prevent form submission
      handleAddKeyword()
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <div className="flex gap-2">
            <Input
              value={keyword}
              placeholder={placeholder}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button type="button" onClick={handleAddKeyword}>
              Qo'shish
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {keywords.map((kw, index) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg flex items-center gap-2"
              >
                {kw}
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(kw)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

