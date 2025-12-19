import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function Disclaimer() {
  return (
    <Alert variant="default" className="border-amber-200 bg-amber-50 py-2 sm:py-3">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800 text-sm sm:text-base">Important Disclaimer</AlertTitle>
      <AlertDescription className="text-amber-700 text-xs sm:text-sm">
        This calculator provides estimates only. Consult a licensed CPA before making incorporation decisions.
      </AlertDescription>
    </Alert>
  )
}
