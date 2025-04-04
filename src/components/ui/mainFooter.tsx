const Footer = () => {
    return (<>

    <footer className=" text-gray-400 text-sm py-4 px-8 flex flex-wrap justify-between items-center">
    <hr  className="w-[95%] mr-auto ml-auto pb-[20px]"/>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-white">Юридическая информация</a>
          <a href="#" className="hover:text-white">Центр безопасности и конфиденциальности</a>
          <a href="#" className="hover:text-white">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white">Файлы cookie</a>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-white">О рекламе</a>
          <a href="#" className="hover:text-white">Специальные возможности</a>
        </div>
        <div className="text-gray-500 mt-2 sm:mt-0">© 2025 Spotify AB</div>
      </footer>
    
    </>
      
    );
  };
  
  export default Footer;