declare type SignInParams = {
    email: string;
    password: string;
}

declare type SignUpParams = {
    email: string;
    password: string;
    name: string;
}

declare type CreateUserParams = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    imagePreviewUrl: string;
}