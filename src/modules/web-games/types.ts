
export interface WebGamesResponse {
    id: string;
    name: string;
    logo: string;
    description: string;
    link: string;
    isActive: boolean;
}

export interface WebGamesInput {
    name: string;
    logo: string;
    description: string;
    link: string;
    isActive: boolean;
}


export interface WebGamesBody {
    id: string;
    value: WebGamesInput;
}
