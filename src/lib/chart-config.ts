import type { ChartConfig } from "@/components/ui/chart"
import { CATEGORIES } from "./constants"

export const chartConfig = CATEGORIES.reduce((acc, category) => {
    acc[category.name] = {
        label: category.name,
        icon: category.icon
    }
    return acc;
}, {} as ChartConfig)
