import { z } from 'zod';

export const ColorSchema = z.object({
  light: z.object({
    background: z.string(),
    foreground: z.string(),
    card: z.string(),
    "card-foreground": z.string(),
    popover: z.string(),
    "popover-foreground": z.string(),
    primary: z.string(),
    "primary-foreground": z.string(),
    secondary: z.string(),
    "secondary-foreground": z.string(),
    muted: z.string(),
    "muted-foreground": z.string(),
    accent: z.string(),
    "accent-foreground": z.string(),
    destructive: z.string(),
    "destructive-foreground": z.string(),
    border: z.string(),
    input: z.string(),
    ring: z.string(),
  }),
  dark: z.object({
    background: z.string(),
    foreground: z.string(),
    card: z.string(),
    "card-foreground": z.string(),
    popover: z.string(),
    "popover-foreground": z.string(),
    primary: z.string(),
    "primary-foreground": z.string(),
    secondary: z.string(),
    "secondary-foreground": z.string(),
    muted: z.string(),
    "muted-foreground": z.string(),
    accent: z.string(),
    "accent-foreground": z.string(),
    destructive: z.string(),
    "destructive-foreground": z.string(),
    border: z.string(),
    input: z.string(),
    ring: z.string(),
  })
})

type IColor = z.infer<typeof ColorSchema>

const colors: IColor = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(224 71.4% 4.1%)",
    card: "hsl(0 0% 100%)",
    "card-foreground": "hsl(224 71.4% 4.1%)",
    popover: "hsl(0 0% 100%)",
    "popover-foreground": "hsl(224 71.4% 4.1%)",
    primary: "hsl(222 73.3% 37.8%)",
    "primary-foreground": "hsl(210 20% 98%)",
    secondary: "hsl(220 14.3% 95.9%)",
    "secondary-foreground": "hsl(220.9 39.3% 11%)",
    muted: "hsl(220 14.3% 95.9%)",
    "muted-foreground": "hsl(220 8.9% 46.1%)",
    accent: "hsl(220 14.3% 95.9%)",
    "accent-foreground": "hsl(220.9 39.3% 11%)",
    destructive: "hsl(0 84.2% 60.2%)",
    "destructive-foreground": "hsl(210 20% 98%)",
    border: "hsl(220 13% 91%)",
    input: "hsl(220 13% 91%)",
    ring: "hsl(222 73.3% 37.8%)",
  },
  dark: {
    background: "hsl(221 39% 11%)",
    foreground: "hsl(210 20% 98%)",
    card: "hsl(221 39% 11%)",
    "card-foreground": "hsl(210 20% 98%)",
    popover: "hsl(221 39% 11%)",
    "popover-foreground": "hsl(210 20% 98%)",
    primary: "hsl(222 73.3% 37.8%)",
    "primary-foreground": "hsl(210 20% 98%)",
    secondary: "hsl(215 27.9% 16.9%)",
    "secondary-foreground": "hsl(210 20% 98%)",
    muted: "hsl(215 27.9% 16.9%)",
    "muted-foreground": "hsl(217.9 10.6% 64.9%)",
    accent: "hsl(215 27.9% 16.9%)",
    "accent-foreground": "hsl(210 20% 98%)",
    destructive: "hsl(0 62.8% 30.6%)",
    "destructive-foreground": "hsl(210 20% 98%)",
    border: "hsl(215 27.9% 16.9%)",
    input: "hsl(215 27.9% 16.9%)",
    ring: "hsl(222 73.3% 37.8%)",
  }
}

export {
  colors
}
