"use client"
import { redirect } from "next/navigation"
import { ReactNode, useEffect } from "react"

const Layout = ({ children }: { children: ReactNode }) => {

	useEffect(() => {
		if (!localStorage.getItem("token"))
			redirect("/login")
	}, [])

	return (
		<div className="h-full w-full">
			{children}
		</div>
	)
}

export default Layout
