import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";

const AddEmoji = (emojiData) => {
    const [s] = useState(false);
  setMessage((prev) => prev + emojiData.emoji);
};
return(
    <div className="flex items-center gap-2">
  <button onClick={() => setShowPicker((prev) => !prev)} className="text-2xl">😊</button>
  {showPicker && <EmojiPicker onEmojiClick={addEmoji} />}
</div>

)

export default  AddEmoji;
