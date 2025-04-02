
const Header = () => {
  return (
    <header className="w-full h-[65px] bg-black flex items-center justify-around">
      <div className="flex items-center gap-10 ">
        <button
          style={{ backgroundImage: "url('/icon1.svg')" }}
          className="w-10 h-10 bg-cover bg-center cursor-pointer"
        ></button>
        <div className="flex items-center justify-start gap-2">
          <button
            style={{ backgroundImage: "url('/icon4.svg')" }}
            className="w-10 h-10 bg-cover bg-center cursor-pointer"
          ></button>
          <input
            type="search"
            placeholder="Что хочешь Включить?"
            className="w-[400px] h-[40px] px-4 border border-gray-300 rounded-3xl bg-[#1f1f1f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700"
            style={{
              backgroundImage: "url('/icon5.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              backgroundSize: "20px",
              paddingLeft: "40px",
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-5">
        <button className="w-[220px] h-[40px] bg-white font-medium rounded-[30px] cursor-pointer">
          Узнать больше о Premium
        </button>
        <button className="w-[220px] h-[40px] bg-[#121212] text-white font-medium rounded-[30px] cursor-pointer">
          Узнать больше о Premium
        </button>
      </div>
      <div className="flex items-center justify-center gap-5">
        <button
          style={{ backgroundImage: "url('/icon2.svg')" }}
          className="w-6 h-6 bg-cover bg-center cursor-pointer"
        ></button>
        <div className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center font-medium text-xl">
          M
        </div>
      </div>
    </header>
  );
};

export default Header;