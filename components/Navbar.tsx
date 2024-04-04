"use client"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet"
import { ReactNode } from "react"

type className = string
const inputStyle: className = "text-lg font-semibold"

const Navbar = () => {
	return (
		<header className="flex items-center w-full px-10 sm:px-16 py-5">
			<div className="flex items-center">
				<p className="text-3xl font-extrabold">MNK</p>
			</div>
			<div className="sm:hidden flex gap-5 items-center justify-end w-full">
				<NavbarInSide>
					<Icon icon={"mdi:menu"} className="text-black text-2xl" />
				</NavbarInSide>
			</div>
			<div className="hidden sm:flex gap-5 items-center justify-end w-full">
				<Link
					href={"/"}
					className={inputStyle}
				>
					HOME
				</Link>
				<Link
					href={"/works"}
					className={inputStyle}
				>
					WORKS
				</Link>
				<Link
					href={"/about"}
					className={inputStyle}
				>
					ABOUT
				</Link>
				<Link
					href={"/contact"}
					className={inputStyle}
				>
					CONTACT
				</Link>
			</div>
		</header>
	)
}

const NavbarInSide = ({ children }: { children: ReactNode }) => {
	return (
		<Sheet>
			<SheetTrigger>
				{children}
			</SheetTrigger>
			<SheetContent side={"left"} className="flex flex-col gap-5 bg-white">
				<div className="flex items-center">
					<p className="text-3xl font-extrabold">MNK</p>
				</div>
				<div className="flex flex-col gap-5 items-center justify-end w-full">
					<Link
						href={"/"}
						className={inputStyle}
					>
						HOME
					</Link>
					<Link
						href={"/works"}
						className={inputStyle}
					>
						WORKS
					</Link>
					<Link
						href={"/about"}
						className={inputStyle}
					>
						ABOUT
					</Link>
					<Link
						href={"/contact"}
						className={inputStyle}
					>
						CONTACT
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Navbar
