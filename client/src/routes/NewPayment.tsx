function NewPayment() {
  return (
    <>
      <div className="h-full text-center text-[#222] text-2xl">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5 pt-20">
            <div>
              <button className="text-[#444] py-2 border border-[#444] rounded-md w-1/2">
                Scan Receipt
              </button>
            </div>
            <div className="flex items-center px-10 my-10">
              <div className="flex-grow border-t border-[#444444]"></div>
              <span className="px-4 text-lg"> Or </span>
              <div className="flex-grow border-t border-[#222]"></div>
            </div>
            <div className="text-left px-10 flex flex-col gap-5">
              <input
                placeholder="Username"
                className="border-[#222] bg-[#fae6e0] pl-3 py-2 text-base outline rounded-md outline-[#9c9c9c] outline-1 placeholder:text-[#9c9c9c]"
              />
              <input
                placeholder="Amount"
                className="border-[#222] bg-[#fae6e0] pl-3 py-2 text-base outline rounded-md outline-[#9c9c9c] outline-1 placeholder:text-[#9c9c9c]"
              />
              <input
                placeholder="Message"
                className="border-[#222] bg-[#fae6e0] pl-3 py-2 text-base outline rounded-md outline-[#9c9c9c] outline-1 placeholder:text-[#9c9c9c]"
              />
            </div>
          </div>
          <div className="mb-40 border border-[#222] rounded-md w-96 py-5 self-center">
            Add Payment
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPayment;
