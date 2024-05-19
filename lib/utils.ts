import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextRequest, NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
