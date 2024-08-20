import * as z from "zod"
import { zfd } from "zod-form-data";
import { UserRole } from "@prisma/client"

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  image: z.optional(z.string())
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

export const ProfilesSchema = z.object({
  section: z.string(),
  title: z.string(),
  subtitle: z.string(),
  body: z.string(),
  image: z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"})
  .optional()
})

export const TeacherSchema = z.object({
  name: z.string(),
  education: z.string(),
  subjects: z.string(),
  position: z.string(),
  whatsapp: z.string(),
  image: z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"})
  .optional()
})

export const PostsSchema = z.object({
  category: z.string(),
  title: z.string(),
  body: z.string(),
  image: z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"})
  .optional()
})

export const ElearningSchema = z.object({
  teacherId: z.string(),
  classroom: z.string(),
  subject: z.string().toUpperCase(),
  body: z.string(),
  image: z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"})
  .optional()
})

export const PPDBSchema = z.object({
  fullname                    : z.string().toUpperCase(),
  nickname                    : z.string().toUpperCase(),
  numberbirthcertificate      : z.string(),
  nik                         : z.string(),
  gender                      : z.string(),
  childnumber                 : z.string(),
  siblings                    : z.string(),
  placeofbirth                : z.string(),
  address                     : z.string(),
  livewith                    : z.string(),
  childstatus                 : z.string(),
  nisn                        : z.string(),
  kindergarten                : z.string(),
  kindergartenaddress         : z.string(),
  fathersname                 : z.string().toUpperCase(),
  fathersnumber               : z.string(),
  fathersplaceofbirth         : z.string(),
  fathersjob                  : z.string(),
  fathersnameoftheagency      : z.optional(z.string()),
  fathersaddressoftheagency   : z.optional(z.string()),
  fatherslasteducation        : z.string(),
  fathersincome               : z.string(),
  mothersname                 : z.string().toUpperCase(),
  mothersnumber               : z.string(),
  mothersplaceofbirth         : z.string(),
  mothersjob                  : z.string(),
  mothersnameoftheagency      : z.optional(z.string()),
  mothersaddressoftheagency   : z.optional(z.string()),
  motherslasteducation        : z.string(),
  mothersincome               : z.optional(z.string()),
  filesfamilycard             : z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"}),
  filesbirthcertificate       : z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"}),
  filescertificate            : z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"}),
  filesphotos                 : z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"}),
  filespayment                : z.instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {message: "File format must be either jpg, jpeg or png.",})
  .refine((file) => file.size < 3000000, {message: "Image must less than 3MB"}),
})