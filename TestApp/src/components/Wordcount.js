import { useState } from "react";
import { auth } from "lib/firebase";

export default function Wordcount() {

  const [text, setText] = useState("");
  const [count, setCount] = useState({words: 0, chars: 0});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const getCount = async () => {
    const callBackend = async () => {
      const apiEndpoint = "/api/wordcount";

      const token = await auth.currentUser.getIdToken();
      const request = {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          text: text,
        })
      };

      const response = await fetch(apiEndpoint, request);
      const data = await response.json();
      return data;
    };

    setButtonDisabled(true);
    const data = await callBackend();
    setCount({words: data.words, chars: data.chars});
    setButtonDisabled(false);
  }

  const element = (
    <>
      <h2>Word Count</h2>
      <textarea
        style={{fontSize: "1.1rem", width: "600px", height: "200px"}}
        value={text}
        onChange={(event) => setText(event.target.value)} />
      <br/>
      <button disabled={buttonDisabled} onClick={getCount}>
        Submit
      </button>
      <div>
        Words: {count.words}
        <br/>
        Chars: {count.chars}
      </div>
    </>
  );

  return element;
}
