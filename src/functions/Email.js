export default async function email(data) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mail`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const responseJson = await response.json();
    // console.log(responseJson);
    if (response.status === 200 && response.ok) {
      return true;
    }
  } catch (error) {
    // console.log(error);
    return false;
  }
}
