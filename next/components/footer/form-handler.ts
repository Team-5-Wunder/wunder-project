async function handleSubmit(event) {
  event.preventDefault();
  const email = event.target.email.value;

  try {
    const jsonResponse = await fetch("./emailData.json");
    if (!jsonResponse.ok) {
      throw new Error("Failed to fetch JSON file");
    }
    const jsonData = await jsonResponse.json();

    // Prepare the data to be sent
    const formData = {
      email: email,
      jsonData: jsonData, // Include JSON data
    };

    // Send the data to the backend
    const response = await fetch("/api/send-email", {
      // Replace with your backend endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Failed to send email");
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
}

export default handleSubmit;
