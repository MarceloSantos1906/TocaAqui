export interface Professor {
    name: string;
    rating: number;
    reviews: number;
    price: string;
    duration: string;
    students: string;
    image: string;
    experience: string;
    methodology: string;
    highlights: string;
    matter: string;
}

export interface Review {
    name: string;
    text: string;
    rating: number;
}

export interface OtherProfessor {
    id: number;
    name: string;
    rating: number;
    reviews: number;
    price: string;
    image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
