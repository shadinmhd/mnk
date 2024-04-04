import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import cn from "@/lib/cn";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Nazal",
	description: "muhammed nasal kk, portfolio",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, "overflow-hidden")}>
				<Toaster richColors />
				{children}
			</body>
		</html>
	);
}
