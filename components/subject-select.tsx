"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SubjectSelect() {
  return (
    <div className="space-y-2">
      <Label htmlFor="subject">Subject</Label>
      <Select>
        <SelectTrigger id="subject">
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technical">Technical Issue</SelectItem>
          <SelectItem value="billing">Billing Question</SelectItem>
          <SelectItem value="account">Account Management</SelectItem>
          <SelectItem value="feature">Feature Request</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
