// To parse this data:
//
//   import { Convert, User } from "./file";
//
//   const user = Convert.toUser(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface User {
    id:         number;
    firstName:  string;
    lastName:   string;
    maidenName: string;
    age:        number;
    gender:     string;
    email:      string;
    phone:      string;
    username:   string;
    password:   string;
    birthDate:  string;
    image:      string;
    bloodGroup: string;
    height:     number;
    weight:     number;
    eyeColor:   string;
    hair:       Hair;
    ip:         string;
    address:    Address;
    macAddress: string;
    university: string;
    bank:       Bank;
    company:    Company;
    ein:        string;
    ssn:        string;
    userAgent:  string;
    crypto:     Crypto;
    role:       string;
}

export interface Address {
    address:     string;
    city:        string;
    state:       string;
    stateCode:   string;
    postalCode:  string;
    coordinates: Coordinates;
    country:     string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType:   string;
    currency:   string;
    iban:       string;
}

export interface Company {
    department: string;
    name:       string;
    title:      string;
    address:    Address;
}

export interface Crypto {
    coin:    string;
    wallet:  string;
    network: string;
}

export interface Hair {
    color: string;
    type:  string;
}

export const MOCK_USER: User = {
    id: 1,
    firstName: "Terry",
    lastName: "Medhurst",
    maidenName: "Smitham",
    age: 50,
    gender: "male",
    email: "atuny0@sohu.com",
    phone: "+63 791 675 8914",
    username: "atuny0",
    password: "password123",
    birthDate: "2000-12-25",
    image: "https://robohash.org/terrymedhurst.png",
    bloodGroup: "A-",
    height: 189,
    weight: 75.4,
    eyeColor: "Green",
    hair: {
        color: "Black",
        type: "Strands"
    },
    ip: "26.58.193.2",
    address: {
        address: "1745 T Street Southeast",
        city: "Washington",
        state: "DC",
        stateCode: "DC",
        postalCode: "20020",
        coordinates: {
            lat: 38.867033,
            lng: -76.979235
        },
        country: "United States"
    },
    macAddress: "01:23:45:67:89:AB",
    university: "Capitol University",
    bank: {
        cardExpire: "12/23",
        cardNumber: "1234567890123456",
        cardType: "visa",
        currency: "USD",
        iban: "US12345678901234567890"
    },
    company: {
        department: "Marketing",
        name: "Blanda-O'Keefe",
        title: "Help Desk Operator",
        address: {
            address: "123 Business Rd",
            city: "New York",
            state: "NY",
            stateCode: "NY",
            postalCode: "10001",
            coordinates: {
                lat: 40.7128,
                lng: -74.0060
            },
            country: "United States"
        }
    },
    ein: "12-3456789",
    ssn: "987-65-4321",
    userAgent: "Mozilla/5.0",
    crypto: {
        coin: "Bitcoin",
        wallet: "0x1234567890abcdef",
        network: "Ethereum"
    },
    role: "admin"
};