import { writable } from 'svelte/store'

const skills = localStorage.getItem('selected')
const selected = typeof skills === 'string' ? JSON.parse(skills) : []

export const selectedSkills = writable<number[]>(selected)
selectedSkills.subscribe((value) => {
    localStorage.setItem('selected', JSON.stringify(value))
})
