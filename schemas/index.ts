import * as z from "zod"
import { UserRole } from "@prisma/client"

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6))
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false
    }
    return true
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false
    }
    return true
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const LoginSchema = z.object({
  email: z.string().email({
    message:"Email is required."
  }),
  password: z.string().min(1,{
    message:"Password is required."
  }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message:"Email is required."
  }),
  password: z.string().min(6,{
    message:"Minimum 6 character required."
  }),
  name: z.string().min(1,{
    message: "Name is required."
  })
})

export const ResetSchema = z.object({
  email: z.string().email({
    message:"Email is required."
  }),
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6,{
    message:"Minimum 6 character required."
  }),
})

export const BuyerSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().min(11),
  address: z.string().min(6),
  notes: z.string()
})

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string().min(4),
  stock: z.string(),
})

export const OrderSchema = z.object({
  buyer: z.string(),
  phoneNumber: z.string(),
  notes: z.string(),
  delivery: z.boolean(),
  payment: z.boolean(),
  orderedAt: z.date(),
})

export const SpendSchema = z.object({
  category: z.string(),
  name: z.string(),
  price: z.string().min(3),
  quantity: z.string().min(1),
  issuedAt: z.date(),
})

export const PurchaseSchema = z.object({
  name: z.string(),
  price: z.string().min(3),
  quantity: z.string().min(1),
  purchasedAt: z.date(),
})

export const IngredientSchema = z.object({
  name: z.string(),
  price: z.string().min(1),
  stock: z.string(),
})

export const PackagingSchema = z.object({
  employee: z.string(),
  product: z.string(),
  quantity: z.string().min(1),
  packedAt: z.date(),
})

export const EmployeeSchema = z.object({
  name: z.string(),
  position: z.string(),
  image: z.string(),
})