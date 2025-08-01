// AddEmoji.jsx

import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const AddEmoji = ({ showPicker, setShowPicker,addEmoji }) => {
  

  

  return (
    <div className="flex items-center flex-col gap-2">
    
      <div className="relative top-5 ">

      {showPicker && <EmojiPicker onEmojiClick={(_, emojiData) => addEmoji(emojiData)} />}
      </div>
    </div>
  );
};

export default AddEmoji;
