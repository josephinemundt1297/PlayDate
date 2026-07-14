import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { emptyFamilyProfile, type FamilyProfile } from '../domain/family'

const keyFor = (userId:string) => `playpal.family.${userId}`
export function readFamilyProfile(userId:string):FamilyProfile { const value=localStorage.getItem(keyFor(userId)); return value?JSON.parse(value):emptyFamilyProfile }
export function useFamilyProfile(){
  const {user}=useUser(); if(!user)throw new Error('Anmeldung erforderlich')
  const [profile,setProfile]=useState<FamilyProfile>(()=>readFamilyProfile(user.id))
  const save=(next:FamilyProfile)=>{setProfile(next);localStorage.setItem(keyFor(user.id),JSON.stringify(next))}
  return {profile,save}
}
