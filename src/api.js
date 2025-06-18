export async function fetchDescription(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text;
  } catch (error) {
    console.error(`Failed to fetch description from ${url}:`, error);
    return "Description is not available";
  }
}
