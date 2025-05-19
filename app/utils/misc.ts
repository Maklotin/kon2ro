import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


// fra et tidligere prosjekt jeg har jobba med: "Harmony Hub" og hos kunden
export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}