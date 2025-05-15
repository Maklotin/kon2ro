import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


// fra et tidligere prosjekt jeg har jobba med: "Harmony Hub"
export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}