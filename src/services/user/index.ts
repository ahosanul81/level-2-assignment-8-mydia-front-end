"use server";
export const userFromDB = async (userData: { email: string; role: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const result = await res.json();
  return result;
};
