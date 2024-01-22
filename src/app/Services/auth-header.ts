export default function authHeader() {
  return {
    headers: {
      Authorization: 'Bearer ',
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*"
    }
  };
} 