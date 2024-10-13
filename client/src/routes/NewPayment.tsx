import { useState } from "react";
import Dropzone from "react-dropzone";
import { addPayment, parseReceipt } from "../services/Server/serverApi";

function NewPayment() {
  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleParseReceipt = async (receiptFile: File) => {
    setAmount(await parseReceipt(receiptFile));
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    await addPayment(username, amount * 100, message);
  };

  return (
    <>
      <div className="h-full text-center text-[#222] text-2xl">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5 pt-20">
            <div className="self-center text-[#444] py-2 border border-[#444] rounded-md w-1/2 cursor-pointer">
              <Dropzone
                onDrop={(acceptedFiles) => handleParseReceipt(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Scan Receipt</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="flex items-center px-10 my-10">
              <div className="flex-grow border-t border-[#444444]"></div>
              <span className="px-4 text-lg"> Or </span>
              <div className="flex-grow border-t border-[#222]"></div>
            </div>
            <div className="text-left px-10 flex flex-col gap-5">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border-[#222] bg-[#fae6e0] pl-3 py-2 text-base outline rounded-md outline-[#9c9c9c] outline-1 placeholder:text-[#9c9c9c]"
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="border-[#222] bg-[#fae6e0] pl-3 py-2 text-base outline rounded-md outline-[#9c9c9c] outline-1 placeholder:text-[#9c9c9c]"
              />
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="border-[#222] bg-[#fae6e0] pl-3 py-2 text-base outline rounded-md outline-[#9c9c9c] outline-1 placeholder:text-[#9c9c9c]"
              />
            </div>
          </div>
          <button
            className="mb-40 border border-[#222] rounded-md w-96 py-5 self-center"
            onClick={handleAddPayment}
          >
            Add Payment
          </button>
        </div>
      </div>
    </>
  );
}

export default NewPayment;
