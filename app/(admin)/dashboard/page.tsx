"use client"

import { redirect } from "next/navigation"

import { useEffectOnce } from "~/hooks/common"

export default function RedirectPage() {
    useEffectOnce(() => {
        redirect("/dashboard/analysis")
    })
}
