"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import { performTOSIAnalysis } from "@/lib/tosi-rules"
import type { FamilyMember } from "@/lib/enhanced-types"

export function TOSIComplianceChecker() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [primaryIncome, setPrimaryIncome] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const [newMember, setNewMember] = useState({
    name: "",
    age: 0,
    relationship: "spouse" as const,
    income: 0,
    canReceiveDividends: true,
    tosIExempt: false
  })

  const addFamilyMember = () => {
    if (newMember.name && newMember.age > 0) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        ...newMember
      }
      setFamilyMembers(prev => [...prev, member])
      setNewMember({
        name: "",
        age: 0,
        relationship: "spouse",
        income: 0,
        canReceiveDividends: true,
        tosIExempt: false
      })
      setShowAddForm(false)
    }
  }

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id))
  }

  const runAnalysis = () => {
    if (familyMembers.length > 0) {
      const result = performTOSIAnalysis(familyMembers, primaryIncome)
      setAnalysis(result)
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low": return "bg-green-100 text-green-800 border-green-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getComplianceIcon = (isCompliant: boolean) => {
    return isCompliant ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    )
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          TOSI (Tax on Split Income) Compliance Checker
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Check compliance with TOSI rules for family income splitting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
        {/* Primary Income Input */}
        <div className="space-y-2">
          <Label htmlFor="primary-income">Primary Income (Your Business Income)</Label>
          <Input
            id="primary-income"
            type="number"
            value={primaryIncome}
            onChange={(e) => setPrimaryIncome(parseFloat(e.target.value) || 0)}
            placeholder="Enter your annual business income"
          />
        </div>

        {/* Family Members List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Family Members</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Member
            </Button>
          </div>

          {showAddForm && (
            <Card className="border-dashed">
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="member-name">Name</Label>
                    <Input
                      id="member-name"
                      value={newMember.name}
                      onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Family member name"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="member-age">Age</Label>
                    <Input
                      id="member-age"
                      type="number"
                      value={newMember.age}
                      onChange={(e) => setNewMember(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                      placeholder="Age"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="member-relationship">Relationship</Label>
                    <select
                      id="member-relationship"
                      value={newMember.relationship}
                      onChange={(e) => setNewMember(prev => ({ 
                        ...prev, 
                        relationship: e.target.value as any 
                      }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="parent">Parent</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="member-income">Annual Income</Label>
                    <Input
                      id="member-income"
                      type="number"
                      value={newMember.income}
                      onChange={(e) => setNewMember(prev => ({ ...prev, income: parseFloat(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={addFamilyMember}>
                    Add Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Family Members Display */}
          {familyMembers.length > 0 && (
            <div className="space-y-2">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      <Badge variant="outline">{member.relationship}</Badge>
                      <Badge variant="secondary">Age {member.age}</Badge>
                      {member.age < 25 && (
                        <Badge variant="destructive">TOSI Risk</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Income: ${member.income.toLocaleString()}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFamilyMember(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analyze Button */}
        <Button
          onClick={runAnalysis}
          disabled={familyMembers.length === 0}
          className="w-full"
        >
          Analyze TOSI Compliance
        </Button>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-4">
            {/* Overall Risk Level */}
            <Alert className={getRiskLevelColor(analysis.riskLevel)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    TOSI Risk Level: {analysis.riskLevel.toUpperCase()}
                  </span>
                  <span className="text-sm">
                    Family Income: ${analysis.totalFamilyIncome.toLocaleString()}
                  </span>
                </div>
              </AlertDescription>
            </Alert>

            {/* Individual Member Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Individual Member Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.checks.map((check: any, index: number) => {
                    const member = familyMembers.find(m => m.id === check.appliesToFamilyMember)
                    return (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getComplianceIcon(check.isCompliant)}
                            <span className="font-medium">{member?.name}</span>
                            <Badge variant="outline">Age {member?.age}</Badge>
                          </div>
                          {!check.isCompliant && (
                            <Badge variant="destructive">Non-Compliant</Badge>
                          )}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <strong>Reason:</strong> {check.reason}
                        </div>
                        
                        {check.safeIncomeThreshold > 0 && (
                          <div className="text-sm">
                            <strong>Safe Income Threshold:</strong> ${check.safeIncomeThreshold.toLocaleString()}
                          </div>
                        )}
                        
                        {check.recommendations.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-sm font-medium">Recommendations:</div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {check.recommendations.map((rec: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Mitigation Strategies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">General Mitigation Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.mitigationStrategies.map((strategy: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Compliance Summary */}
            <Alert>
              {analysis.isFullyCompliant ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Fully Compliant:</strong> All family members are TOSI compliant. 
                    Your income splitting strategy does not trigger TOSI rules.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Non-Compliant:</strong> Some family members may be subject to TOSI. 
                    Review the recommendations above and consider professional tax planning advice.
                  </AlertDescription>
                </>
              )}
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  )
}