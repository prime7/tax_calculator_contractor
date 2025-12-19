"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PROVINCES } from "@/lib/tax-data"

interface ProvinceSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ProvinceSelector({ value, onChange }: ProvinceSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="province" className="text-sm font-medium text-foreground">
        Province / Territory
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="province" className="w-full">
          <SelectValue placeholder="Select province" />
        </SelectTrigger>
        <SelectContent>
          {PROVINCES.map((province) => (
            <SelectItem key={province.code} value={province.code}>
              {province.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
