type UserType = {
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        badge: string;
}

export interface Influencer {
    id: string;
    user: UserType;
}


export interface InfluencerInput {
    courseId: string;
    userId: string;
}
