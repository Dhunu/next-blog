import { cookies } from "next/headers";
import React from "react";

export default async function User() {
    const accessToken = cookies().get("accessToken");
    const res = await fetch(`${process.env.ORIGIN}/api/get-current-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
    });

    const { user } = await res.json();

    return <div>{user.username}</div>;
}
