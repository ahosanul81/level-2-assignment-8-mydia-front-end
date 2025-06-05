/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllIdea = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/ideas`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};
