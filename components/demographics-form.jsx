"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"

const spring = { type: "spring", stiffness: 400, damping: 30 }
const tap = { scale: 0.98 }

export default function DemographicsForm({ onComplete }) {
  const [demographics, setDemographics] = useState({
    age: "",
    gender: "",
    maritalStatus: "",
    educationLevel: "",
    employmentStatus: "",
    occupation: "",
    monthlyIncome: "",
    areaOfResidence: "",
    familySystem: "",
    numberOfDependents: "",
    historyOfDepression: "",
    familyHistoryOfMentalIllness: "",
    currentTreatment: "",
    durationOfDepression: "",
    therapyParticipation: "",
    socialSupportLevel: "",
    livingSituation: "",
    majorLifeStressors: "",
    socialMediaUsage: "",
    physicalActivityLevel: "",
    sleepPatterns: "",
    districtName: "",
  })

  const handleChange = useCallback((field, value) => {
    setDemographics((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    onComplete(demographics)
  }, [demographics, onComplete])

  const isComplete = Object.values(demographics).every((val) => val !== "")

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="rounded-2xl border bg-card p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold">Demographic Information</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Please provide the following information before starting the assessment.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Basic Information */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Age</label>
          <input
            type="number"
            value={demographics.age}
            onChange={(e) => handleChange("age", e.target.value)}
            placeholder="Enter your age"
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Gender</label>
          <select
            value={demographics.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Marital Status</label>
          <select
            value={demographics.maritalStatus}
            onChange={(e) => handleChange("maritalStatus", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Education Level</label>
          <select
            value={demographics.educationLevel}
            onChange={(e) => handleChange("educationLevel", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select level</option>
            <option value="High School">High School</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Employment Status</label>
          <select
            value={demographics.employmentStatus}
            onChange={(e) => handleChange("employmentStatus", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select status</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            <option value="Self-employed">Self-employed</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Occupation</label>
          <input
            type="text"
            value={demographics.occupation}
            onChange={(e) => handleChange("occupation", e.target.value)}
            placeholder="Your occupation"
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Monthly Income</label>
          <input
            type="text"
            value={demographics.monthlyIncome}
            onChange={(e) => handleChange("monthlyIncome", e.target.value)}
            placeholder="e.g., 30,000 - 50,000"
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Area of Residence</label>
          <select
            value={demographics.areaOfResidence}
            onChange={(e) => handleChange("areaOfResidence", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select area</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
            <option value="Semi-urban">Semi-urban</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Family System</label>
          <select
            value={demographics.familySystem}
            onChange={(e) => handleChange("familySystem", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select system</option>
            <option value="Joint">Joint</option>
            <option value="Nuclear">Nuclear</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Number of Dependents</label>
          <input
            type="number"
            value={demographics.numberOfDependents}
            onChange={(e) => handleChange("numberOfDependents", e.target.value)}
            placeholder="0"
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>

        {/* Health & Psychological History */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">History of Depression</label>
          <select
            value={demographics.historyOfDepression}
            onChange={(e) => handleChange("historyOfDepression", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Family History of Mental Illness</label>
          <select
            value={demographics.familyHistoryOfMentalIllness}
            onChange={(e) => handleChange("familyHistoryOfMentalIllness", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Current Treatment/Medication</label>
          <select
            value={demographics.currentTreatment}
            onChange={(e) => handleChange("currentTreatment", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Duration of Depression</label>
          <input
            type="text"
            value={demographics.durationOfDepression}
            onChange={(e) => handleChange("durationOfDepression", e.target.value)}
            placeholder="e.g., 6 months, 1 year"
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Therapy Participation</label>
          <select
            value={demographics.therapyParticipation}
            onChange={(e) => handleChange("therapyParticipation", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Social & Environmental Factors */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Social Support Level</label>
          <select
            value={demographics.socialSupportLevel}
            onChange={(e) => handleChange("socialSupportLevel", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select level</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
            <option value="None">None</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Living Situation</label>
          <select
            value={demographics.livingSituation}
            onChange={(e) => handleChange("livingSituation", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select situation</option>
            <option value="Alone">Alone</option>
            <option value="With family">With family</option>
            <option value="Hostel">Hostel</option>
            <option value="With roommates">With roommates</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Major Life Stressors in Past Year</label>
          <select
            value={demographics.majorLifeStressors}
            onChange={(e) => handleChange("majorLifeStressors", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Digital & Lifestyle Factors */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Social Media Usage</label>
          <select
            value={demographics.socialMediaUsage}
            onChange={(e) => handleChange("socialMediaUsage", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select usage</option>
            <option value="Heavy">Heavy (3+ hours/day)</option>
            <option value="Moderate">Moderate (1-3 hours/day)</option>
            <option value="Light">Light (Less than 1 hour/day)</option>
            <option value="None">None</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Physical Activity Level</label>
          <select
            value={demographics.physicalActivityLevel}
            onChange={(e) => handleChange("physicalActivityLevel", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select level</option>
            <option value="High">High (5+ days/week)</option>
            <option value="Moderate">Moderate (3-4 days/week)</option>
            <option value="Low">Low (1-2 days/week)</option>
            <option value="None">None</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Sleep Patterns</label>
          <select
            value={demographics.sleepPatterns}
            onChange={(e) => handleChange("sleepPatterns", e.target.value)}
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="">Select pattern</option>
            <option value="Regular">Regular (7-8 hours)</option>
            <option value="Irregular">Irregular</option>
            <option value="Insomnia">Insomnia</option>
            <option value="Oversleeping">Oversleeping</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">District Name</label>
          <input
            type="text"
            value={demographics.districtName}
            onChange={(e) => handleChange("districtName", e.target.value)}
            placeholder="Your district"
            className="h-10 rounded-lg border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <p className="text-xs text-muted-foreground">All fields are required</p>
        <motion.button
          whileTap={tap}
          onClick={handleSubmit}
          disabled={!isComplete}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Continue to Assessment
        </motion.button>
      </div>
    </motion.div>
  )
}
