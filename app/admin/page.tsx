import { redirect } from "next/navigation"

export default function AdminPage() {
  // In a real app, you'd check authentication here
  redirect("/admin/login")
}
