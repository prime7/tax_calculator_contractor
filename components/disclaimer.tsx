import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function Disclaimer() {
  return (
    <Alert variant="default" className="border-amber-200 bg-amber-50 py-2 sm:py-3">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800 text-sm sm:text-base">Important Disclaimer</AlertTitle>
      <AlertDescription className="text-amber-700 text-xs sm:text-sm space-y-1">
        <p>
          This calculator provides <strong>estimates only</strong> based on 2024 Canadian tax rates.
          Results do not account for incorporation costs ($3,000-$5,000/year), passive income rules,
          income splitting, or TOSI regulations.
        </p>
        <p className="hidden sm:block">
          <strong>Always consult a licensed CPA or tax professional</strong> before making incorporation
          decisions or implementing tax strategies. Individual circumstances vary significantly.
        </p>
      </AlertDescription>
    </Alert>
  )
}
