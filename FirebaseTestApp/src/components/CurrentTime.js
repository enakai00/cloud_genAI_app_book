import {useState, useEffect} from "react";

export default function CurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const hour = now.getHours().toString().padStart(2, "0");
      const min = now.getMinutes().toString().padStart(2, "0");
      const sec = now.getSeconds().toString().padStart(2, "0");
      setTime(hour + ":" + min + ":" + sec);
    }, 1000);
  }, []);

  const element = (
    <span>{time}</span>
  );

  return element;
}
