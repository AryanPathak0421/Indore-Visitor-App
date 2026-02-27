import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

const interestOptions = [
  "Heritage",
  "Food",
  "Nature",
  "Shopping",
  "Spiritual"
]

const placeMap: any = {
  Heritage: ["Rajwada Palace", "Lal Bagh Palace", "Krishnapura Chhatri"],
  Food: ["Sarafa Bazaar", "Chhappan Dukan", "Poha Jalebi"],
  Nature: ["Regional Park", "Patalpani Waterfall", "Ralamandal"],
  Shopping: ["Treasure Island Mall", "MT Cloth Market"],
  Spiritual: ["Khajrana Ganesh Mandir", "Annapurna Temple"]
}

export default function Planner() {
  const [days, setDays] = useState(2)
  const [budget, setBudget] = useState(5000)
  const [interests, setInterests] = useState<string[]>([])
  const [plan, setPlan] = useState<string[][]>([])

  const toggleInterest = (i: string) => {
    setInterests(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const generatePlan = () => {
    let pool: string[] = []

    interests.forEach(i => {
      pool = pool.concat(placeMap[i] || [])
    })

    if (pool.length === 0) return

    const result: string[][] = []
    let index = 0

    for (let d = 0; d < days; d++) {
      const dayPlan: string[] = []
      for (let i = 0; i < 3; i++) {
        if (pool[index]) dayPlan.push(pool[index])
        index = (index + 1) % pool.length
      }
      result.push(dayPlan)
    }

    setPlan(result)
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">

      <div>
        <h1 className="text-2xl font-bold">Trip Planner</h1>
        <p className="text-muted-foreground">
          Build your perfect Indore itinerary
        </p>
      </div>

      {/* DAYS */}
      <div className="space-y-2">
        <div className="font-semibold">Duration</div>
        <Slider
          min={1}
          max={7}
          step={1}
          value={[days]}
          onValueChange={(v) => setDays(v[0])}
        />
        <div className="text-sm">{days} days</div>
      </div>

      {/* BUDGET */}
      <div className="space-y-2">
        <div className="font-semibold">Daily Budget</div>
        <Slider
          min={1000}
          max={20000}
          step={500}
          value={[budget]}
          onValueChange={(v) => setBudget(v[0])}
        />
        <div className="text-sm">₹{budget} per day</div>
      </div>

      {/* INTERESTS */}
      <div className="space-y-2">
        <div className="font-semibold">Interests</div>
        <div className="flex gap-2 flex-wrap">
          {interestOptions.map(i => (
            <Badge
              key={i}
              onClick={() => toggleInterest(i)}
              className={`cursor-pointer px-4 py-2 text-sm ${
                interests.includes(i)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {i}
            </Badge>
          ))}
        </div>
      </div>

      <Button onClick={generatePlan} className="w-full">
        Generate My Itinerary
      </Button>

      {/* RESULT */}
      {plan.length > 0 && (
        <div className="space-y-4">
          {plan.map((day, idx) => (
            <div key={idx} className="border rounded-xl p-4">
              <h3 className="font-semibold mb-2">Day {idx + 1}</h3>
              <ul className="list-disc ml-6 text-sm space-y-1">
                {day.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
