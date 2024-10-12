function App() {
  return (
    <>
  <div className="h-screen w-screen flex flex-col">
        <div className="bg-[#fae6e0] flex flex-col items-center p-40 grow">
          <div className="text-4xl text-[#222]">Split</div>
          <div className="text-lg text-[#222] mt-5">Start tracking payments</div>
          <input className="mt-28 h-16 w-[64rem] outline outline-1 bg-transparent text-[#5a3422] rounded-lg outline-[#5a3422] px-10 text-lg text-center underline" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
          <div className="self-start ml-32 mt-10">
          </div>
        </div>
        <div className="bg-[#222] h-20 flex items-center p-10">
          <div className="text-sm">split.io. Made with ❤️ by <span className="underline">inkitori</span> and <span className="underline">st3bie</span>.</div>
        </div>
      </div>
    </>
  )
}

export default App
