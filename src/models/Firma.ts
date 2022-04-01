// External dependencies

import { ObjectId } from "mongodb";

// Class Implementation

export interface Firma {
    name: string,
    street: string,
    city: string,
    state: string,
    postalCode: number,
    country: string,
    telefon: number,
    eMail: string,
    umsatzsteuerId: string,
    id?: ObjectId
}