export interface Subscription {
    id: number;
    user_id: number;
    username: string;
    avatar: string;
    introduction: string;
}

export interface SubscriptionState {
    followingList: Subscription[];
    followerList: Subscription[];
    followingIdList: Array<number>;
    friendIdList: Array<number>;
    loading: boolean;
    errors: any;
}

export const initialState: SubscriptionState = {
    followingList: [],
    followerList: [],
    followingIdList:[],
    friendIdList: [],
    loading: false,
    errors: null
}